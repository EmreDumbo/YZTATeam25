# 🧠 YZTA Bootcamp – Takım 25


## 🧑‍💻 Takım Üyeleri

| İsim             | Rol             | GitHub |
|------------------|------------------|--------|
| Beyzanur Eker    | Product Owner    | [@Beyzanurekerr](https://github.com/Beyzanurekerr) |
| Hatice Kandemir  | Developer        | [@HaticeKandemir](https://github.com/HaticeKandemir) |
| Ayşe Dündar      | Developer        | [@Ayse-D](https://github.com/Ayse-D) |
| Emre Dumbo       | Developer        | [@EmreDumbo](https://github.com/EmreDumbo) |
| Sefa Duman       | Scrum Master     | [@sefadumann](https://github.com/sefadumann) |

# Ürün İle İlgili Bilgiler

## Ürün İsmi 
PharmAI: Yapay Zeka Destekli İlaç Etkileşimi ve Yan Etki Kontrol Sistemi

## Ürün Hakkında

**İlaç Etkileşimi ve Yan Etki Kontrol Sistemi**, hastaların ve sağlık profesyonellerinin kullandıkları birden fazla ilaç arasında olası tehlikeli etkileşimleri, yaygın yan etkileri ve kullanım önerilerini hızla öğrenmelerini sağlayan yapay zeka destekli bir karar destek platformudur.

Proje, **ilaç prospektüslerindeki uzun, karmaşık metinleri herkesin anlayabileceği şekilde özetler** ve hastaların semptomlarına uygun, ilaç dışı pratik sağlık önerileri sunar. Böylece bilinçsiz ilaç kullanımından kaynaklanan sağlık risklerini azaltmayı hedefler.

**Temel Vizyonumuz,**

> *“Sağlık okuryazarlığını artırarak, ilaç kullanımını güvenli ve bilinçli hâle getiren, yapay zekâ destekli interaktif bir sağlık asistanı oluşturmak.”*


## 🎯 Hedef Kitle  
- **Hastalar:** Kullandıkları ilaçlar arasında etkileşim olup olmadığını öğrenmek, yan etkileri anlamak ve güvenli kullanım için bilgi almak isteyen bireyler.
- **Doktorlar:** Hastalarına reçete yazarken ilaç etkileşimlerini hızlı kontrol etmek isteyen hekimler.
- **Eczacılar:** Reçete edilen ilaç kombinasyonlarının risklerini gözden geçirmek isteyen sağlık profesyonelleri.r

## Product Backlog URL: https://miro.com/app/board/uXjVIhUYa5M=/



<details>
  <summary><h1> 📂 Sprint 1 </h1></summary>


> **Sprint Tarihleri:** 20 Haziran 2025 – 6 Temmuz 2025  
> **Toplam Puan:** 100

 Sprint 1 Hedefleri
✅ Proje vizyonu netleştirimesi

✅ Persona ve kullanıcı akışları hazırlanması

✅ Kullanılacak veri kaynakları belirlenmesi

✅ AI mimarisi ve teknik mimari tasarlanması

✅ Proje yönetimi ve wireframe başlatılması

# Sprint 1 Burndown Chart
![PharmAI Sprint 1 Burndown Chart_ (1)](https://github.com/user-attachments/assets/abeb731b-2fbb-4e60-a6d0-14c35e67d62e)

#Sprint Daily Scrum 

## Daily Scrum – 26.06.2025

*Time:* 09:30  
*Attendees:*  
- Beyzanur (PO)  
- Emre Dumbo (SM)  
- Hatice (AI/Backend)

---

### Önceki Gün 
- *Beyzanur (PO):*  
  - Proje vizyon cümlesini Miro’ya ekledim  
  - Persona kartlarının başlık ve ihtiyaçlarını tanımladım  
- *Emre Dumbo (SM):*  
  - Miro’da Backlog/In Progress/Done çerçevelerini oluşturdum  
  - İşlere puan ve öncelik atadım  
- *Hatice (AI/Backend):*  
  - DrugBank, SIDER, DailyMed erişim notlarını ekledim  
  - AI mimarisi sticky note’larını hazırladım  

### 2. Bugün
- *Beyzanur (PO):* Login & Dashboard wireframe eskizlerini çizmeye başlayacağım  
- *Emre Dumbo (SM):* Wireframe’lere “ne iş yapıyor” açıklamalarını sticky note olarak ekleyeceğim  
- *Hatice (AI/Backend):* Gemini vs. GPT prompt örneklerini karşılaştırmalı olarak hazırlayacağım  

### 3. Blockers  
- *Beyzanur (PO):* Figma’da “Wireframe Library” plugin izni bekliyorum  
- *Emre Dumbo (SM):* Beyzanur’dan wireframe eskizleri gelinceye kadar ilerleyemiyorum  
- *Hatice (AI/Backend):* GPT API anahtarı gelene kadar örnek deneme yapamıyorum


## Sprint 1 User Stories

### USER STORY 1 – Proje Konsepti ve Vizyonunun Netleştirilmesi (10 puan)

PharmAI, hastaların ve sağlık profesyonellerinin kullandığı ilaçlar arasında olası tehlikeli etkileşimleri ve yan etkileri kontrol eden, yapay zeka destekli bir karar destek sistemidir. Prospektüs özetleme ve semptom bazlı öneriler sunarak sağlık okuryazarlığını artırmayı hedefler.

**Vizyon:**
> “Sağlık okuryazarlığını artırarak, ilaç kullanımını güvenli ve bilinçli hâle getiren, yapay zekâ destekli interaktif bir sağlık asistanı oluşturmak.”
>

### USER STORY 2 – Persona Çalışması ve Kullanıcı Akışlarının Hazırlanması (15 puan)

**Personalar:**

- **Hasta:** Kronik ilaç kullanıyor, prospektüsleri anlamakta zorlanıyor.
- **Doktor:** Hızlı ilaç etkileşim kontrolü yapmak istiyor.
- **Eczacı:** Hastaya güvenli bilgi vermek istiyor.
![WhatsApp Görsel 2025-07-06 saat 00 45 16_06d468e2](https://github.com/user-attachments/assets/a633f867-475f-4960-8f0f-cb9afc5ffa64)

![WhatsApp Görsel 2025-07-06 saat 00 45 14_806203f2](https://github.com/user-attachments/assets/cf26529b-2f35-4511-a19c-c129bdfb093f)





**Kullanıcı Akışları:**

- Giriş → İlaç isimlerini gir → Etkileşim sorgula → Yan etkileri görüntüle → Prospektüs özetini oku → Semptom bazlı öneri al → Rapor indirD

![WhatsApp Görsel 2025-07-06 saat 00 47 57_bdc40fdd](https://github.com/user-attachments/assets/aae6ff77-3bbc-49d4-bcd7-481424a6f1be)

### USER STORY 4 – AI Mimarisi ve Teknik Mimari Tasarımı (20 puan)

- LLM olarak **Gemini** kullanılacak.
- Prospektüs özetleme:
    - Prompt mühendisliğiyle JSON çıktısı alınacak.
- Etkileşim kontrol algoritması:
    - Rule-based → etkileşimi bulur.
    - Gemini → hasta dostu dilde açıklar.
- Semptom bazlı öneriler:
    - AI tarafından basit dilde öneriler üretilecek.

---

### USER STORY 5 – Proje Yönetimi ve Wireframe Başlatma (40 puan)

- GitHub reposu açıldı.
- Sprint board (Miro) oluşturuldu.
- Miro’da wireframe taslakları hazırlanıyor
    - Login ekranı
    - Dashboard
    - İlaç sorgulama sayfası


 ## Sprint Review

- Proje vizyonu netleşti.
- Persona ve akışlar tamamlandı.
- Veri kaynakları belirlendi ve dokümante edildi.
- AI promptları hazırlandı.
- Wireframe taslakları başlatıldı.
- Sprint 1 sonunda toplam **100 puanlık iş tamamlandı.**

## ✅ Sprint Retrospective

### İyi Gidenler:
- Vizyon netleşti.
- Ekip Miro üzerinden çok iyi iş birliği yaptı.
- Veri kaynakları açıkça belirlendi.
### Geliştirilecek Alanlar:
- Türkçe çeviri süreci Sprint 2’ye bırakıldı.
- Miro board üzerinde iş dağılımı daha net olacak.
- Daily Scrum süreleri kısaltılacak.
### Aksiyonlar:
- Türkçe terim sözlüğü hazırlanacak.
- Sprint 2 için wireframe görev dağılımı yapılacak.

## 📌 Notlar

- Bu ürün MVP niteliğindedir (Minimum Viable Product).  
- Nihai hedef: kullanıcıya hızlı, açık ve doğru uyarılar sunan basit bir karar destek aracı geliştirmek.


## 📜 Lisans & Etik  
Kullanılan tüm veri setleri kamuya açık kaynaklardan alınmıştır.  
Sistem tanı koymaz, sadece bilgilendirici analiz sunar.
