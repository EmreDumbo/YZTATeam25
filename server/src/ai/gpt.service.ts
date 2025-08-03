import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai: OpenAI;
  private model: string = 'gpt-3.5-turbo';

  constructor() {
    // API key'i environment variable'dan al
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('OPENAI_API_KEY environment variable is not set');
      return;
    }

    // Initialize OpenAI with API key
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      if (!this.openai) {
        return 'AI servisi henüz yapılandırılmamış. Lütfen OPENAI_API_KEY environment variable\'ını ayarlayın.';
      }

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Yanıt alınamadı.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // API key hatası varsa daha detaylı mesaj ver
      if (error.message && error.message.includes('invalid api key')) {
        return 'OpenAI API anahtarı geçersiz. Lütfen geçerli bir API anahtarı ayarlayın.';
      }
      
      // Rate limit hatası
      if (error.message && (error.message.includes('rate limit') || error.message.includes('quota'))) {
        return this.getFallbackResponse(prompt);
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
    let prompt = `Sen *PharmAI* adında profesyonel bir eczacılık ve ilaç danışmanı asistansın.
Kullanıcıya ilaç ve kişisel sağlık bilgilerini birleştirerek *kişiselleştirilmiş, güvenli ve anlaşılır* bilgi sunacaksın.


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
10.Reçeteli veya reçetesiz her türlü ilaç için doktor onayı öner; her yanıtın sonunda mutlaka şu ifadeyi ekle: "Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız."
11. *Asla teşhis koyma, reçete yazma, doktor önerisi sunmadan tedavi önermeye çalışma!*
12. Kullanıcı *yaş, kilo* veya *mevcut ilaçlar* bilgisini vermediyse,
- Yanıtı kes ve eksik olanları özel olarak belirtip rica et:
  > "Kişiselleştirilmiş doz için lütfen yaşınızı, kilonuzu ve kullandığınız ilaçları paylaşın."

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

  private getFallbackResponse(prompt: string): string {
    // Basit keyword-based responses
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('parol') || lowerPrompt.includes('parasetamol')) {
      return 'Parol (Parasetamol) ateş düşürücü ve ağrı kesici bir ilaçtır. Yetişkinler için günde 3-4 kez 500-1000mg alınabilir. Mide bulantısı ve karaciğer problemleri yapabilir. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
    }
    
    if (lowerPrompt.includes('arveles') || lowerPrompt.includes('dexketoprofen')) {
      return 'Arveles (Dexketoprofen) NSAİİ grubu ağrı kesici bir ilaçtır. Yemeklerle birlikte alınmalıdır. Mide problemleri yapabilir. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
    }
    
    if (lowerPrompt.includes('nurofen') || lowerPrompt.includes('ibuprofen')) {
      return 'Nurofen (İbuprofen) ağrı ve ateş kesici bir ilaçtır. Yetişkinler için günde 3-4 kez 400-600mg alınabilir. Mide problemleri yapabilir. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
    }
    
    if (lowerPrompt.includes('augmentin') || lowerPrompt.includes('antibiyotik')) {
      return 'Augmentin (Amoksisilin + Klavulanik Asit) antibiyotik bir ilaçtır. Doktor reçetesi ile kullanılmalıdır. Mide bulantısı ve ishal yapabilir. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
    }
    
    if (lowerPrompt.includes('ventolin') || lowerPrompt.includes('astım')) {
      return 'Ventolin (Salbutamol) astım ilacıdır. Solunum yolu ile kullanılır. Kalp çarpıntısı yapabilir. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
    }
    
    // Genel response
    return 'Üzgünüm, şu anda AI servisine erişim sağlayamıyorum. Lütfen daha sonra tekrar deneyin veya doktorunuza danışın. Bu bilgiler eğitim amaçlıdır. Kesin doz ve tedavi planı için doktorunuza danışınız.';
  }
} 