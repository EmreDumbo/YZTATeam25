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

## Task Tracking
![WhatsApp Image 2025-07-06 at 23 00 35 (1)](https://github.com/user-attachments/assets/ff0be2bd-96a2-41c2-830d-6d33a04d97b7)

![WhatsApp Image 2025-07-06 at 23 01 02 (1)](https://github.com/user-attachments/assets/89735b5c-5549-4003-b74c-3e7b98f6fbdf)

# Sprint 1 Burndown Chart
![PharmAI Sprint 1 Burndown Chart_ (1)](https://github.com/user-attachments/assets/abeb731b-2fbb-4e60-a6d0-14c35e67d62e)

# Sprint 1 Raporu

## 1. Sprint Notları

Her günkü Daily Scrum’dan kısa notlar (kim ne yaptı, ne engel var, ne planlandı)

| Tarih       | Kim           | Yapılan                                                                                                      | Plan (Bugün)                                            | Bloklayıcılar                                             |
|-------------|---------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| 26.06.2025  | Beyzanur (PO) | - Proje vizyon cümlesini Miro’ya ekledi<br>- Persona kartlarını güncelledi                                     | - Login & Dashboard wireframe eskizlerine başlayacak    | Figma “Wireframe Library” izni bekliyor                   |
| 26.06.2025  | Emre (DEV)     | - Backlog/In-Progress/Done sütunlarını açtı<br>- User story’lere puan ve öncelik atadı                         | - Wireframe açıklamalarını sticky-note olarak ekleyecek | Wireframe eskizleri gelinceye kadar bekliyor              |
| 26.06.2025  | Hatice (AI)   | - DrugBank, SIDER, DailyMed veri notlarını ekledi<br>- AI mimarisi taslağını hazırladı                         | - Gemini vs. GPT prompt örneklerini karşılaştıracak     | GPT API anahtarı hâlâ gelmedi                             |
| 27.06.2025  | Beyzanur (PO) | - Wireframe eskizlerini tamamladı<br>- Kullanıcı akışlarını Miro’ya işledi                                    | - Dashboard mockup’u Figma’ya yükleyecek                | Figma plugin izni hâlâ bekleniyor                         |
| 27.06.2025  | Emre (DEV)     | - Sprint board’u gözden geçirdi<br>- Story point dağılımını güncelledi                                         | - Sprint Review sunum taslağını oluşturacak             | API anahtarı alınana kadar test yapılamıyor               |
| 27.06.2025  | Hatice (AI)   | - Prompt mühendisliği üzerinde çalıştı<br>- JSON çıktı örneklerini test etti                                  | - Etkileşim kontrol kural setini hazırlayacak            | DailyMed erişiminde kimlik doğrulama sorunu var           |
| 28.06.2025  | Beyzanur (PO) | - Dashboard wireframe’ini gözden geçirdi<br>- Persona geri bildirimlerini topladı                              | - Prospektüs özetleme akışını tanımlayacak              | Takım üyelerinden retroları almak için zaman ayıracak     |
| 28.06.2025  | Emre (DEV)     | - Daily Scrum süresini 15 dakikaya düşürdü<br>- Burndown chart’ı güncelledi                                   | - Sprint Retrospective notlarını hazırlayacak           | Bazı kullanıcı akışları hâlâ net değil                    |
| 28.06.2025  | Hatice (AI)   | - Kural tabanlı etkileşim kontrolünü kodlamaya başladı<br>- İlk testleri yaptırdı                             | - İlk test sonuçlarına göre prompt ayarlamalarını yapacak | Gemini API kota limiti yaklaşıyor                         |

---

## 2. Tahmin Edilen Tamamlanacak Puan & Tahmin Mantığı

🏷️ **Toplam Hedef: 100 Story Point**

| User Story No | Açıklama                                            | Puan |
|---------------|-----------------------------------------------------|-----:|
| 1             | Proje konsepti ve vizyon netleştirme                |   10 |
| 2             | Persona çalışması & kullanıcı akışları              |   15 |
| 3             | Veri kaynaklarının belirlenmesi                     |   15 |
| 4             | AI & teknik mimarinin tasarımı                      |   20 |
| 5             | Proje yönetimi & wireframe başlatma                 |   40 |
| **Toplam**    |                                                     | **100** |

### Tahmin Mantığı

1. **Story Point Dağılımı**  
   – Her bir user story, karmaşıklığına ve iş yüküne göre 5–40 arası puanla değerlendirildi.  
2. **Ekip Kapasitesi**  
   – Önceki deneme sprintlerimizde (pilot sprint) ortalama **80 puan** tamamladık.  
   – Bu kez ekstra prototipleme işimiz de olduğu için %25 ek kapasite (80×1.25≈100) planladık.  
3. **Risk & Buffer**  
   – Döviz, API anahtarı vb. dış faktörlerden kaynaklı gecikmelere karşı **%10** yedek (“spike”) puan ayırdık.  
4. **Sonuç**  
   – 100 puanlık toplam hedef, sprint süresine ve kaynaklarımıza uygun ve gerçekçi.  


# Sprint Daily Scrum 

## Daily Scrum – 26.06.2025

*Time:* 09:30  
*Attendees:*  
- Beyzanur (PO)  
- Emre Dumbo (DEV)  
- Hatice (AI/Backend)

---

### Önceki Gün 
- *Beyzanur (PO):*  
  - Proje vizyon cümlesini Miro’ya ekledim  
  - Persona kartlarının başlık ve ihtiyaçlarını tanımladım  
- *Emre Dumbo (DEV):*  
  - Miro’da Backlog/In Progress/Done çerçevelerini oluşturdum  
  - İşlere puan ve öncelik atadım  
- *Hatice (AI/Backend):*  
  - DrugBank, SIDER, DailyMed erişim notlarını ekledim  
  - AI mimarisi sticky note’larını hazırladım  

### 2. Bugün
- *Beyzanur (PO):* Login & Dashboard wireframe eskizlerini çizmeye başlayacağım  
- *Emre Dumbo (DEV):* Wireframe’lere “ne iş yapıyor” açıklamalarını sticky note olarak ekleyeceğim  
- *Hatice (AI/Backend):* Gemini vs. GPT prompt örneklerini karşılaştırmalı olarak hazırlayacağım  

### 3. Blockers  
- *Beyzanur (PO):* Figma’da “Wireframe Library” plugin izni bekliyorum  
- *Emre Dumbo (DEV):* Beyzanur’dan wireframe eskizleri gelinceye kadar ilerleyemiyorum  
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
