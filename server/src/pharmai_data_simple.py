import requests
import json
import sys

def safe_json_request(url):
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200 and r.text.strip():
            return r.json()
        return {}
    except Exception as e:
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
    "DIZZINESS": "Baş dönmesi", "COUGH": "Öksürük", "BACK PAIN": "Sırt ağrısı",
    "CHEST PAIN": "Göğüs ağrısı", "INSOMNIA": "Uykusuzluk", "ANXIETY": "Anksiyete",
    "DEPRESSION": "Depresyon", "HYPERTENSION": "Hipertansiyon", "DIABETES": "Diyabet",
    "ASTHMA": "Astım", "EPILEPSY": "Epilepsi", "CANCER": "Kanser",
    "HEART ATTACK": "Kalp krizi", "STROKE": "İnme", "KIDNEY FAILURE": "Böbrek yetmezliği",
    "LIVER FAILURE": "Karaciğer yetmezliği", "ALLERGIC REACTION": "Alerjik reaksiyon",
    "SWELLING": "Şişlik", "ITCHING": "Kaşıntı", "REDNESS": "Kızarıklık",
    "BLEEDING": "Kanama", "BRUISING": "Morarma", "INFECTION": "Enfeksiyon",
    "FEVER": "Ateş", "CHILLS": "Titreme", "SWEATING": "Terleme",
    "LOSS OF APPETITE": "İştahsızlık", "WEIGHT LOSS": "Kilo kaybı", "WEIGHT GAIN": "Kilo alımı",
    "THIRST": "Susuzluk", "FREQUENT URINATION": "Sık idrara çıkma", "DRY MOUTH": "Ağız kuruluğu",
    "BLURRED VISION": "Bulanık görme", "RINGING IN EARS": "Kulak çınlaması", "TREMOR": "Titreme",
    "MUSCLE WEAKNESS": "Kas güçsüzlüğü", "JOINT PAIN": "Eklem ağrısı", "BONE PAIN": "Kemik ağrısı",
    "SKIN RASH": "Cilt döküntüsü", "HAIR LOSS": "Saç dökülmesi", "NAIL CHANGES": "Tırnak değişiklikleri",
    "MOOD CHANGES": "Ruh hali değişiklikleri", "MEMORY PROBLEMS": "Hafıza problemleri",
    "CONCENTRATION PROBLEMS": "Konsantrasyon problemleri", "SEXUAL PROBLEMS": "Cinsel problemler",
    "MENSTRUAL PROBLEMS": "Adet problemleri", "PREGNANCY PROBLEMS": "Gebelik problemleri",
    "BIRTH DEFECTS": "Doğum kusurları", "DEVELOPMENTAL PROBLEMS": "Gelişim problemleri",
    "AGING PROBLEMS": "Yaşlanma problemleri", "DEATH": "Ölüm"
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
    return translated, missing

# Kullanım alanı için çok temel örnek çeviri fonksiyonu
def translate_usage_paragraph(usage_text):
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

    return {
        "ilaç_adi": drug_name,
        "rxcui": rxcui,
        "etken_madde": active_ingredient,
        "yan_etkiler": side_effects,
        "yan_etkiler_tr": side_effects_tr,
        "mapping_olmayan_yan_etkiler": mapping_missing,
        "kullanım_alanları": uses_text_en,
        "kullanım_alanları_tr": uses_text_tr,
        "atc_sınıfı": []  # Basit versiyonda boş bırakıyoruz
    }

if __name__ == "__main__":
    # Command line argument'tan ilaç ismini al
    if len(sys.argv) > 1:
        drug_name = sys.argv[1]
        result = get_full_drug_info_with_openfda(drug_name)
        json_output = json.dumps(result, indent=2, ensure_ascii=False)
        print(json_output, end='')
        sys.stdout.flush()
    else:
        error_output = json.dumps({"error": "İlaç ismi belirtilmedi"}, ensure_ascii=False)
        print(error_output, end='')
        sys.stdout.flush() 