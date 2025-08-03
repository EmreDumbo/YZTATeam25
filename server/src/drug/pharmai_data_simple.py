import pandas as pd
import sqlite3
import requests
import os
import re
import json
import sys

# 1. Data klasörü yolu - relative path from server directory
SIDER_PATH = "../../PharmAI-data/PharmAI/"
DB_PATH = "../../PharmAI-data/sider_full.db"

# Yan etki verileri
se = pd.read_csv(SIDER_PATH + "meddra_all_se.tsv.gz", sep="\t", compression="gzip", header=None)
se.columns = ["stitch_compound_id", "umls_id", "side_effect_name", "frequency", "method", "concept_name"]
se = se[["stitch_compound_id", "umls_id", "side_effect_name", "frequency"]]

# İlaç isimleri
drug_names = pd.read_csv(SIDER_PATH + "drug_names.tsv", sep="\t", header=None)
drug_names.columns = ["stitch_compound_id", "drug_name"]

# Endikasyonlar
indications = pd.read_csv(SIDER_PATH + "meddra_all_indications.tsv.gz", sep="\t", compression="gzip", header=None)
indications.columns = [
    "stitch_compound_id", "umls_id", "indication_name", "indication_source", "method", "concept_name", "score"
]
indications = indications[["stitch_compound_id", "indication_name"]]

# ATC kodları
drug_atc = pd.read_csv(SIDER_PATH + "drug_atc.tsv", sep="\t", header=None)
drug_atc.columns = ["stitch_compound_id", "atc_code"]

# MedDRA sözlüğü
meddra = pd.read_csv(SIDER_PATH + "meddra.tsv.gz", sep="\t", compression="gzip", header=None)
meddra.columns = ["umls_id", "concept_name", "concept_type", "source"]
umls_to_name = dict(zip(meddra["umls_id"], meddra["concept_name"]))

# Veritabanına yaz (ilk çalıştırmada lazım)
conn = sqlite3.connect(DB_PATH)
se.merge(drug_names, on="stitch_compound_id").to_sql("side_effects", conn, if_exists="replace", index=False)
indications.merge(drug_names, on="stitch_compound_id").to_sql("indications", conn, if_exists="replace", index=False)
drug_atc.merge(drug_names, on="stitch_compound_id").to_sql("atc", conn, if_exists="replace", index=False)
conn.commit()
conn.close()

# Fonksiyonlar
def get_sider_atc(drug_name):
    conn = sqlite3.connect(DB_PATH)
    query = "SELECT DISTINCT atc_code FROM atc WHERE LOWER(drug_name)=LOWER(?)"
    try:
        result = [row[0] for row in conn.execute(query, (drug_name.lower(),)).fetchall()]
    except Exception as e:
        print(f"ATC kodu sorgulanırken hata oluştu: {e}")
        result = []
    conn.close()
    return result

def safe_json_request(url):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200 and r.text.strip():
            return r.json()
        return {}
    except Exception as e:
        print(f"API hatası: {e}")
        return {}

def get_rxcui(drug_name):
    candidates = [drug_name]
    if not drug_name.lower().endswith(" acid"):
        candidates.append(drug_name + " acid")
    for name in candidates:
        url = f"https://rxnav.nlm.nih.gov/REST/rxcui.json?name={name}"
        data = safe_json_request(url)
        rxids = data.get("idGroup", {}).get("rxnormId", [])
        if rxids:
            return rxids[0]
    return None

def get_rxnorm_properties(rxcui):
    if not rxcui:
        return {
            "name": None, "synonym": None, "tty": None,
            "suppress": None, "umlscui": None
        }
    url = f"https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/properties.json"
    data = safe_json_request(url)
    props = data.get("properties", {})
    return {
        "name": props.get("name"),
        "synonym": props.get("synonym"),
        "tty": props.get("tty"),
        "suppress": props.get("suppress"),
        "umlscui": props.get("umlscui"),
        "rxnormId": props.get("rxcui")
    }

def get_openfda_side_effects(drug_name):
    url = f"https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:{drug_name}&count=patient.reaction.reactionmeddrapt.exact"
    try:
        r = requests.get(url, timeout=10)
        if r.status_code == 200 and "results" in r.json():
            data = r.json()
            return [item["term"] for item in data["results"][:10]]
        else:
            return []
    except Exception as e:
        print(f"OpenFDA yan etki API hatası: {e}")
        return []

def get_openfda_uses_any(drug_name):
    url_generic = f"https://api.fda.gov/drug/label.json?search=openfda.generic_name:{drug_name}&limit=1"
    r = requests.get(url_generic)
    if r.status_code == 200 and "results" in r.json():
        results = r.json()["results"]
        if results and "indications_and_usage" in results[0]:
            return results[0]["indications_and_usage"][0]
    url_brand = f"https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=1"
    r = requests.get(url_brand)
    if r.status_code == 200 and "results" in r.json():
        results = r.json()["results"]
        if results and "indications_and_usage" in results[0]:
            return results[0]["indications_and_usage"][0]
    return None

# Türkçeleştirme sözlüğü
side_effects_tr_map = {
    "NAUSEA": "Bulantı", "HEADACHE": "Baş ağrısı", "RASH": "Döküntü",
    "VOMITING": "Kusma", "DIARRHOEA": "İshal", "PAIN": "Ağrı", "FATIGUE": "Yorgunluk",
    "DYSPNOEA": "Nefes darlığı", "ARTHRALGIA": "Eklem ağrısı", "DRUG INEFFECTIVE": "İlacın etkisizliği",
    "CONSTIPATION": "Kabızlık", "ANAEMIA": "Anemi", "ABDOMINAL PAIN": "Karın ağrısı", "PYREXIA": "Ateş",
    "DEATH": "Ölüm", "PNEUMONIA": "Pnömoni", "FEBRILE NEUTROPENIA": "Febril nötropeni",
    "DECREASED APPETITE": "İştah azalması", "TUMOUR LYSIS SYNDROME": "Tümör lizis sendromu",
    "THROMBOCYTOPENIA": "Trombositopeni"
}

def translate_side_effects_and_log(side_effects):
    missing = []
    translated = []
    for item in side_effects:
        turkce = side_effects_tr_map.get(item.upper())
        if turkce:
            translated.append(turkce)
        else:
            translated.append(f"Bilinmeyen: {item}")
            missing.append(item)
    if missing:
        print("Mapping olmayan İngilizce yan etkiler:", missing)
    return translated, missing

# Kullanım alanı için çok temel örnek çeviri fonksiyonu (geliştirebilirsin)
def translate_usage_paragraph(usage_text):
    # Bu fonksiyonu istediğin gibi zenginleştirebilirsin!
    return usage_text

def get_full_drug_info_with_openfda(drug_name):
    rxcui = get_rxcui(drug_name)
    properties = get_rxnorm_properties(rxcui) if rxcui else {}
    active_ingredient = properties.get("name", drug_name)

    side_effects = get_openfda_side_effects(drug_name)
    side_effects_tr, mapping_missing = translate_side_effects_and_log(side_effects)

    uses_text_en = get_openfda_uses_any(active_ingredient)
    if not uses_text_en or uses_text_en == "Kullanım alanı bulunamadı.":
        uses_text_tr = "Kullanım alanı bulunamadı."
    else:
        uses_text_tr = translate_usage_paragraph(uses_text_en)

    atc_codes = get_sider_atc(drug_name)

    return {
        "ilaç_adi": drug_name,
        "rxcui": rxcui,
        "etken_madde": active_ingredient,
        "yan_etkiler": side_effects,
        "yan_etkiler_tr": side_effects_tr,
        "mapping_olmayan_yan_etkiler": mapping_missing,
        "kullanım_alanları": uses_text_en,
        "kullanım_alanları_tr": uses_text_tr,
        "atc_sınıfı": atc_codes
    }

if __name__ == "__main__":
    # Command line argument'tan ilaç ismini al
    if len(sys.argv) > 1:
        drug_name = sys.argv[1]
    else:
        drug_name = input("İlaç ismini giriniz: ")
    
    result = get_full_drug_info_with_openfda(drug_name)
    print(json.dumps(result, indent=2, ensure_ascii=False)) 