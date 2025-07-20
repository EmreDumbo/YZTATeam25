# 🧠 YZTA Bootcamp – Takım 25


## 🧑‍💻 Takım Üyeleri

| İsim             | Rol             | GitHub |
|------------------|------------------|--------|
| Beyzanur Eker    |   Developer      | [@Beyzanurekerr](https://github.com/Beyzanurekerr) |
| Hatice Kandemir  | Developer        | [@HaticeKandemir](https://github.com/HaticeKandemir) |
| Ayşe Dündar      | Product Owner    | [@Ayse-D](https://github.com/Ayse-D) |
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
</details>



<details>
  <summary><h1> 📂 Sprint 2 </h1></summary>

> **Sprint Tarihleri:** 07 Temmuz 2025 – 20 Temmuz 2025  
> **Toplam Puan:** 100

| Görev Başlığı | Puan |
| --- | --- |
| Kullanıcı Girişi ve Kullanıcı Database | 15 |
| Sprint 1’den Kalan Wireframe tamamlanması | 10 |
| Chatbot Arayüzü ve Sorgu Akışı | 15 |
| Kullanıcı Arayüz Tasarımı ve Fonksiyon Bağlantılar | 20 |
| RxNorm API Entegrasyonu ve Etken Madde Çıkarımı | 20 |
| Yan Etki, Dozaj ve Kullanım Bilgisi Hakkında Bilgi | 20 |
| **Toplam** | 100 |

1. **Story Point Dağılımı**  
   – Her bir user story, karmaşıklığına ve iş yükünü göz önüne alarak 10-25 puan aralığında değerlendirildi.  
2. **Ekip Kapasitesi**  
   – Birinci sprintte toplam 100 puan başarıyla tamamlandı. Aynı tempo ve katkının süreceği varsayılarak 100 puan sabit tutuldu.  
3. **Risk & Buffer**  
   – API kaynaklarındaki erişim problemleri, chatbot düzeyi gibi teknik engeller için ayrıca %10’luk buffer hesaplaması dikkate alındı.  
4. **Sonuç**  
   – 100 puanlık hedef bu sprint için de yeterli, dengeli ve uygulanabilir bulunmuştur.

   

## Sprint 2 Burndown Chart
<img width="1980" height="1180" alt="output (1)" src="https://github.com/user-attachments/assets/5c9b2e19-14c7-4fa3-b0b9-6876bc87f815" />
Sprint 2 Burndown Chart'ına göre:

Başlangıçta ilerleme yavaş olmuş (7–11 Temmuz arası), bu da ilk görevlerin daha uzun sürdüğünü veya başlamada gecikmeler yaşandı.

Orta kısımdan itibaren (12–17 Temmuz) işlerin hızlandığı, günlük daha fazla puanın tamamlandığı görülüyor.

Sprint sonunda kalan işler büyük ölçüde bitirilmiş, 20 Temmuz'da tüm iş tamamlanmış.


## Sprint Notları
→ Yeni Product Owner Ayşe Dündar olmuştur. Beyzanur Eker developer olarak devam edecektir.

→ Kullanıcı senaryoları ve prompt örnekleri oluşturulmuş, chatbot alt yapısı şekillendirilmeye başlanmıştır.

→ Veri ile çalışan yapay zeka bileşenleri için SIDER verisi incelenmiş, ayrıca RxNorm API bağlantıları kurulmuştur.

→API üzerinden ilaç ismi girilerek etken maddeye, oradan da etkileşim/yan etki analizine ulaşma süreci kurgulanmıştır.

→ Arayüz prototipi tamamlanmış, Next.js ile frontend geliştirme süreci başlamıştır.

→ RxNav ve [ilacprospektusu.com](http://ilacprospektusu.com/) gibi kaynaklar üzerinden scraping/API ile bilgi alma stratejileri araştırılmıştır.

### Her günkü Daily Scrum’dan kısa notlar (kim ne yaptı, ne engel var, ne planlandı) aşağıdaki excel dosyasında bulunmaktadır.

[Sprint2_Daily_Scrum.xlsx](https://github.com/user-attachments/files/21337422/Sprint2_Daily_Scrum.xlsx)


## SPRINT 2 User Stories

**USER STORY 1 – Kullanıcı Girişi ve Kısıtların Tanımlanması (15 puan)**


- Kullanıcı, uygulamaya kayıt olabilmeli ve giriş yapabilmelidir.
    ![WhatsApp Görsel 2025-07-20 saat 15 40 11_a470c9c4](https://github.com/user-attachments/assets/809d2cd2-c230-495f-b1e6-0cee34ec91ff)

    ![WhatsApp Görsel 2025-07-20 saat 15 40 11_6ff12a15](https://github.com/user-attachments/assets/0e2f3493-4573-4b46-801e-d357cc662646)

- Kullanıcı database kaydı tutulmalıdır.

**USER STORY 2 – Ana Sayfa Görsel Arayüz Tasarımı ve Fonksiyon Bağlantıları (20 puan)**

- Ana ekranda modül kartları oluşturulmalı: İlaç Bilgisi, Yan Etkiler, Dozaj, Etkileşim, Klinik Rehberlik.
    
    ![WhatsApp Görsel 2025-07-20 saat 16 03 01_0ea606e1](https://github.com/user-attachments/assets/4bfa7985-e008-4435-afd8-ef7e320b1e3f)

- İlaç sorgulama, dozaj hesaplama, ilaç bilgileri gibi temel modül kartları yerleştirilmeli.
- Her modül kartın ilgili sayfa ile bağlantısı sağlanmalı.

**USER STORY 3 – RxNorm API Entegrasyonu ve Etken Madde Çıkarımı (20 puan)**

- Kullanıcının yazdığı ticari ad üzerinden RxCUI kodu alınıp, etken maddeye ulaşılmalı.
    
   ![WhatsApp Görsel 2025-07-20 saat 19 04 54_b044a58d](https://github.com/user-attachments/assets/1c1dabaf-d16f-4d24-843d-7401e367fcb4)

- Etken maddeyle ilişkili etkileşim ve yan etki bilgileri alınabilmeli.
- İlk fazda 50 yaygın ilaca ait bilgiler manuel olarak farklı databaselerden çekildi.
  
**USER STORY 4 – Yan Etki, Dozaj ve Kullanım Bilgisi Sunumu (20 puan)**

- API ile gelen bilgilerin LLM tarafından eğitici özette sunumu sağlanmalı.
- Örnek: "Parol dozajı nedir?" sorusuna hem ölçekli hem dikkat uyarılı yanıtlar verilmeli.
    ![WhatsApp Görsel 2025-07-20 saat 15 40 11_7454b939](https://github.com/user-attachments/assets/96890c66-65d8-4a5b-b9cd-f32c64efd653)

**USER STORY 5 – Chatbot Arayüzü ve Sorgu Akışı (15 puan)**

- Kullanıcı, ekranda doğrudan sorgusunu yazabiliyor halde olmalı.

![WhatsApp Görsel 2025-07-20 saat 15 40 11_35463bc0](https://github.com/user-attachments/assets/2aa3f614-360c-452c-8c0f-013ed4de78f9)

- Prompt bazlı dozaj önerisi ve yan etki sorgularına karşı mantıklı cevap akışları tanımlanmalı.
- Şimdilik stub cevaplar, sonradan LLM entegrasyonu yapılacak.

**USER STORY 6 – Sprint 1'den Kalan Wireframe Tamamlanması (10 puan)**

### Sprint Review

- Ana ekran kullanıcıyı sade modüllerle karşılamakta ve yönlendirme kartları etkili çalışmaktadır.
- Chatbot ile yapılan sorgular, ilaç ismi ve temel bilgi sunumu açısından başarılı sonuçlar vermektedir.
- RxNorm API entegrasyonu ile etken madde ve etkileşim bilgileri alınabilir hale gelmiştir.
- Dozaj ve uyarı bilgileri, kullanıcıya basitleştirilmiş dilde sunulmaktadır.
- Tüm sayfalarda temel görsel bütünlük ve responsive tasarım sağlandı.

### Sprint Retrospective

- LLM entegrasyonunun sağlanması için veri tabanı daha efektif kullanılmalıdır.
- Chatbot cevaplarının hızını artırmak ve daha doğal karşılıklar için prompt iyileştirmesi gerekmekte ve türkçe dil desteği sorunlarının çözülmesi gerekmektedir.
- UI geçiş animasyonları eksik kalmış olup, bunların 3. sprintte tamamlanması planlandı.
- Kullanıcıyı yönlendiren “sık sorulan sorular” eklenecek.
- Olası durumlara karşı hata yönetimi için try-expect blokları geliştirilecek.
</details>

##  📌 Notlar

- Bu ürün MVP niteliğindedir (Minimum Viable Product).  
- Nihai hedef: kullanıcıya hızlı, açık ve doğru uyarılar sunan basit bir karar destek aracı geliştirmek.


## 📜 Lisans & Etik  
Kullanılan tüm veri setleri kamuya açık kaynaklardan alınmıştır.  
Sistem tanı koymaz, sadece bilgilendirici analiz sunar.
