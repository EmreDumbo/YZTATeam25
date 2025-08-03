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
  <h1> PharmAI: Yapay Zeka Destekli İlaç Etkileşimi ve Yan Etki Kontrol Sistemi 
 <img width="1024" height="576" alt="PharmAI_Logo" src="https://github.com/user-attachments/assets/fc763ac9-3bcc-4159-9a69-fced16a1930d" /></h1>

## Ürün Hakkında

**İlaç Etkileşimi ve Yan Etki Kontrol Sistemi**, hastaların ve sağlık profesyonellerinin kullandıkları birden fazla ilaç arasında olası tehlikeli etkileşimleri, yaygın yan etkileri ve kullanım önerilerini hızla öğrenmelerini sağlayan yapay zeka destekli bir karar destek platformudur.

Proje, **ilaç prospektüslerindeki uzun, karmaşık metinleri herkesin anlayabileceği şekilde özetler** ve hastaların semptomlarına uygun, ilaç dışı pratik sağlık önerileri sunar. Böylece bilinçsiz ilaç kullanımından kaynaklanan sağlık risklerini azaltmayı hedefler.

**Temel Vizyonumuz,**

> *“Sağlık okuryazarlığını artırarak, ilaç kullanımını güvenli ve bilinçli hâle getiren, yapay zekâ destekli interaktif bir sağlık asistanı oluşturmak.”*

## Ürün Tanıtım Videosu: https://youtu.be/GasaaWlgYCE?si=MRmwm4tSnnqkbAgh


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

## Task Tracking

<img width="1167" height="1338" alt="image" src="https://github.com/user-attachments/assets/b126b6c3-8f30-4aba-87fe-5a321a7271d5" />


**20 Temmuz 2025 -  Sprint 2 için Task Tracking Son Hali**

<img width="1028" height="1519" alt="image" src="https://github.com/user-attachments/assets/a0a1189d-8e92-4d56-8a07-a1525729ca3e" />


 ### Tahmin Edilen Tamamlanacak Puan & Tahmin Mantığı

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

### Gerçekleştirilen Daily Scrum’dan kısa notlar (kim ne yaptı, ne engel var, ne planlandı) aşağıdaki excel dosyasında bulunmaktadır.

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

<details>
  <summary><h1> 📂 Sprint 3 </h1></summary>
  
  > **Sprint Tarihleri:** 21 Temmuz 2025 – 3 Ağustos 2025
> 
  > **Toplam Puan:** 100
> 
  > **Sprint 1-2-3 Hedeflenen Toplam Puan:** 300

## Task Tracking 
<img width="1200" height="1302" alt="image" src="https://github.com/user-attachments/assets/ce65267a-3bd9-4cad-b68f-31d93c17faa9" />

#### *3  Ağustos 2025 -  Sprint 3 için Task Tracking Son Hali*

 ### Tahmin Edilen Tamamlanacak Puan & Tahmin Mantığı

| Görev Başlığı | Puan |
| --- | --- |
| Kullanıcı Profil & Sağlık Bilgileri Yönetimi | 15 |
| Firestore/Supabase ile Kullanıcı DB ve Geçmiş | 15 |
| LLM/Chatbot Context Memory & Prompt Gelişimi | 20 |
| Sık Sorulan Sorular (FAQ) & Hata Yönetimi | 10 |
| Veri Pipeline Sonlandırma & Türkçe Sözlük | 15 |
| Son Test, Demo, Teslimat ve Video | 25 |
| **Toplam** | 100 |

### **Sprint 3 Story Point Dağılımı**
- **Her bir user story**, karmaşıklığı ve iş yükü göz önünde bulundurularak **10-25 puan aralığında** değerlendirilmiştir.
- Sprint 3 için de ekip kapasitesi **100 puan** olarak sabit tutulmuştur.

## Sprint 3 Burndown Chart
<img width="2375" height="1380" alt="output (3)" src="https://github.com/user-attachments/assets/4ed83f20-acbe-4ec3-8a34-eeef5b224ad3" />

Sprint 3 Burndown Chart'ına göre:

→ Başlangıçta ilerleme orta tempolu ilerlemiş, ilk birkaç gün (21–25 Temmuz) toplam puanın yaklaşık %25’i tamamlandı.

→ Orta fazda (26 Temmuz–31 Temmuz) işlerin hızlandığı ve birden fazla ana modülün peş peşe tamamlandı.

→Sprint sonunda ise, Firestore veritabanı entegrasyonu zamanında bitirilemediği için burndown çizgisi sıfıra kadar inmedi; sprintin sonunda 15 puanlık iş eksik kaldı.

Genel olarak, Sprint 3’te işler planlı şekilde ilerlemiş; ancak son aşamada bazı teknik engeller ve zaman yönetimi kaynaklı tamamlanamayan işler kalmış, bu da grafikte kalan puanın sıfıra inmemesine sebep olmuştur.

 ### Sprint Notları 

→ Profil ve sağlık bilgisi modülü geliştirildi.

→ Chatbot, kişiselleştirilmiş ve context-aware şekilde çalışıyor.

→ Yan etki, etkileşim ve dozaj pipeline’ı finalize edildi; Mini Türkçe sözlük oluşturuldu.

→ Hata yönetimi ve kullanıcı deneyimi geliştirmeleri yapıldı.

→ Demo/test ve son teslim dosyaları hazırlandı.

### → Gerçekleştirilen Daily Scrum’dan kısa notlar (kim ne yaptı, ne engel var, ne planlandı) aşağıdaki excel dosyasında bulunmaktadır.

[Sprint3_Daily_Scrum_.xlsx](https://github.com/user-attachments/files/21567044/Sprint3_Daily_Scrum_.xlsx)


### **Sprint 3 USER STORY’LERİ**

**USER STORY 1 – Kullanıcı Profil & Sağlık Bilgileri (15 puan)**

- Kullanıcı temel bilgiler (isim, yaş, cinsiyet), kilo, mevcut ilaçlar, alerjiler ve kronik hastalıklar gibi sağlık bilgilerini arayüzde girebilmeli.
- Eksik veri varsa chatbot/arayüz kullanıcıya otomatik yönlendirme yapmalı.
  
  ![kullanıcı girdisi](https://github.com/user-attachments/assets/39d04a86-500e-4451-a864-0ec31ff9411d)


**USER STORY 2 – Firestore/Supabase ve Kullanıcı DB (15 puan)**

- Kayıt olan kullanıcılar, arama ve geçmiş sorguları Firestore/Supabase gibi bir veritabanında güvenli şekilde saklanmalı.
- Kullanıcıya ait tüm bilgiler, geçmiş ve raporlar panelden erişilebilir olmalı.

**USER STORY 3 – LLM/Chatbot Context Memory & Prompt Gelişimi (20 puan)**

- Chatbot için sesli giriş ve okuma yapılmalı.
- Context Memory ile önceki soruları ve kullanıcı bilgisini hatırlayabilmeli (minimum: son sorguyu hatırlama).
- LLM promptları, kullanıcının yaş, kilo, mevcut ilaç gibi verileriyle otomatik zenginleşmeli ve kişiselleşmiş cevaplar üretmeli.
- Yan etkilerde Türkçe sözlük desteği, SIDER/RxNorm pipeline ile veri birleştirme çalışmalı.
- ![deneme1](https://github.com/user-attachments/assets/54ab826d-a540-4128-b5ed-f5e142398f11)
- ![deneme 2](https://github.com/user-attachments/assets/f1118931-727f-45e7-9bb0-4f35d27997a8)


**USER STORY 4 – Sık Sorulan Sorular (FAQ) ve Hata Yönetimi (10 puan)**

- Sık sorulan sorular sayfası hazırlanmalı (opsiyonel ama önerilir).
- Chatbot ve arayüzde hata yönetimi (eksik veri, bulunamayan ilaç, API hatası vs.) için kullanıcı dostu açıklamalar ve retry seçenekleri eklenmeli.
  ![sıksorulansorular](https://github.com/user-attachments/assets/8289c20e-a2f8-4b90-a690-683dc6716716)


**USER STORY 5 – Veri Pipeline Finali & Türkçe Sözlük (15 puan)**

- SIDER ve RxNorm verileriyle entegre çalışan, çıkmayan yan etki/etkileşim hatalarını minimize eden pipeline tamamlanmalı.
- Türkçe sözlükte eksik kalan terimler güncellenmeli.

**USER STORY 6 – Son Test, Demo, Teslimat ve Video (25 puan)**

- Ürünün çalışan, deploy edilmiş versiyonu teslim edilmeli.
- Kod, dökümantasyon, demo videosu ve teslim formu eksiksiz tamamlanmalı.
- Github repoda tüm kaynaklar güncel olmalı, 1 dakikalık demo videosu ve canlı link/form eklenmeli.

## Sprint 3 Review 
#### Sprint 3’te ekip olarak planlanan ana hedeflerin büyük bölümünü başarıyla tamamladık:

- Kullanıcı profil ve sağlık bilgisi modülü geliştirildi.

- Chatbot, kişiselleştirilmiş ve context-aware olarak çalışıyor.

- Yan etki, etkileşim ve dozaj pipeline’ı finalize edildi, Türkçe sözlük güncellendi.

- Sık Sorulan Sorular (FAQ) sayfası ve hata yönetimi tamamlandı.

- Demo, test ve teslimat işlemleri eksiksiz gerçekleştirildi.

#### Eksik kalan tek önemli madde:

Firestore/Supabase ile bulut veritabanı entegrasyonu sprint sonuna kadar tamamlanamadı; kayıt işlemleri lokal veritabanı ile sınırlandı.

Sprint sonunda toplam 100 story point’in 85’i tamamlandı, 15 puanlık iş sonraki geliştirme planına bırakıldı.

## Sprint 3 Retrospective 
#### Neler iyi gitti?

-Ekip içi iletişim ve görev paylaşımı güçlüydü.

-Chatbot ve pipeline modülleri başarılı şekilde çalıştı.

-FAQ ve hata yönetimi ile kullanıcı deneyimi arttı.

-Teslimat ve demo süreci planlandığı gibi yürütüldü.

#### Neler geliştirilebilirdi?

-Bulut veritabanı entegrasyonunun zamanında tamamlanabilmesi için teknik engeller daha erken ele alınmalıydı.

-Teknik risklerin sprint başında daha net belirlenmesi, önceliklendirme için faydalı olabilirdi.

#### Kapanış Notu:
Genel olarak, ekip olarak güçlü bir iş birliği ve teknik kapasite sergilendi. Eksik kalan veritabanı entegrasyonu ise ileriki bakım fazına bırakıldı.





  </details>

##  📌 Notlar

- Bu ürün MVP niteliğindedir (Minimum Viable Product).  
- Nihai hedef: kullanıcıya hızlı, açık ve doğru uyarılar sunan basit bir karar destek aracı geliştirmek.


## 📜 Lisans & Etik  
Kullanılan tüm veri setleri kamuya açık kaynaklardan alınmıştır.  
Sistem tanı koymaz, sadece bilgilendirici analiz sunar.
