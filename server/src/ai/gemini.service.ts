import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // API key'i environment variable'dan al
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set');
      return;
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    // Region'u us-west1 olarak ayarla (Türkiye'de free tier sorunu var)
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      if (!this.model) {
        return 'AI servisi henüz yapılandırılmamış. Lütfen GEMINI_API_KEY environment variable\'ını ayarlayın.';
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Region hatası varsa daha detaylı mesaj ver
      if (error.message && error.message.includes('free tier is not available')) {
        return 'Gemini API Türkiye\'de ücretsiz kullanım için mevcut değil. Lütfen Google AI Studio\'da billing\'i aktif edin veya farklı bir region kullanın.';
      }
      
      return 'Üzgünüm, şu anda AI servisine erişim sağlayamıyorum. Lütfen daha sonra tekrar deneyin.';
    }
  }

  async createPharmacyAssistantPrompt(
    userMessage: string,
    userProfile: any,
    previousMessages: any[],
    drugDatabase: any
  ): Promise<string> {
    let prompt = `Sen Türkiye'de çalışan deneyimli bir eczacısın. PharmAI adlı bir eczane asistanı uygulamasında görev yapıyorsun.

GÖREVİN:
- Kullanıcıların ilaç sorularını yanıtla
- İlaç etkileşimlerini kontrol et
- Dozaj önerileri ver
- Yan etkiler hakkında bilgi ver
- Güvenlik uyarıları yap
- Türkçe yanıt ver

KULLANICI PROFİLİ:
`;

    if (userProfile) {
      prompt += `- İsim: ${userProfile.firstName || 'Belirtilmemiş'} ${userProfile.lastName || 'Belirtilmemiş'}\n`;
      prompt += `- Yaş: ${userProfile.dateOfBirth ? this.calculateAge(userProfile.dateOfBirth) : 'Belirtilmemiş'}\n`;
      prompt += `- Kilo: ${userProfile.weight || 'Belirtilmemiş'} kg\n`;
      prompt += `- Boy: ${userProfile.height || 'Belirtilmemiş'} cm\n`;
      prompt += `- Kullandığı İlaçlar: ${userProfile.currentMedications || 'Belirtilmemiş'}\n`;
      prompt += `- Alerjiler: ${userProfile.allergies || 'Belirtilmemiş'}\n`;
      prompt += `- Kronik Hastalıklar: ${userProfile.chronicDiseases || 'Belirtilmemiş'}\n`;
      prompt += `- Kan Grubu: ${userProfile.bloodType || 'Belirtilmemiş'}\n\n`;
    }

    // İlaç veritabanı bilgilerini ekle
    prompt += `TÜRKİYE'DE YAYGIN İLAÇLAR:
- Arveles (Dexketoprofen): NSAİİ ağrı kesici
- Parol (Parasetamol): Ateş düşürücü ve ağrı kesici
- Augmentin (Amoksisilin + Klavulanik Asit): Antibiyotik
- Ventolin (Salbutamol): Astım ilacı
- Nurofen (İbuprofen): Ağrı ve ateş kesici

ÖNEMLİ İLAÇ ETKİLEŞİMLERİ:
- Parasetamol + Warfarin: Kanama riski
- İbuprofen + ACE inhibitörleri: Böbrek problemi
- NSAİİ + Warfarin: Ciddi kanama riski
- Antibiyotikler + Doğum kontrol hapları: Etkinlik azalması

`;

    if (previousMessages.length > 0) {
      prompt += `ÖNCEKİ KONUŞMA GEÇMİŞİ:\n`;
      previousMessages.reverse().forEach((msg, index) => {
        prompt += `${index + 1}. Kullanıcı: ${msg.message}\n`;
        prompt += `   Asistan: ${msg.response}\n`;
      });
      prompt += `\n`;
    }

    prompt += `KULLANICININ SORUSU: ${userMessage}

YANIT KURALLARI:
1. Her zaman Türkçe yanıt ver
2. Kullanıcının sağlık bilgilerini dikkate al
3. İlaç etkileşimi riski varsa mutlaka belirt
4. Alerjileri ve mevcut ilaçları kontrol et
5. Dozaj önerilerinde yaş ve kilo faktörlerini göz önünde bulundur
6. Yan etkiler hakkında uyarı yap
7. Ciddi durumlarda mutlaka doktora gitmesini öner
8. Yanıtın anlaşılır ve güvenilir olmasına dikkat et
9. İlaç isimlerini Türkçe ticari isimleriyle kullan
10. Reçetesiz ilaçlar için bile doktor onayı öner

Lütfen bu kurallara uygun olarak kullanıcının sorusunu yanıtla.`;

    return prompt;
  }

  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
} 