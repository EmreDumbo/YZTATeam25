'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "PharmAI nasıl çalışır?",
    answer: "PharmAI, yapay zeka teknolojisi kullanarak ilaç bilgilerini analiz eder. Kullanıcıların sorularını anlar ve kapsamlı veritabanından doğru bilgileri sunar. İlaç etkileşimleri, dozaj önerileri ve güvenlik uyarıları sağlar.",
    category: "Genel",
    icon: "🔬"
  },
  {
    id: 2,
    question: "Hangi ilaçlar hakkında bilgi alabilirim?",
    answer: "100+ ilaç hakkında bilgi alabilirsiniz. Ağrı kesiciler, antibiyotikler, kalp ilaçları, diyabet ilaçları, ruh sağlığı ilaçları, solunum ilaçları ve daha fazlası. Türkiye'de yaygın kullanılan tüm ilaçlar dahildir.",
    category: "İlaç Bilgisi",
    icon: "💊"
  },
  {
    id: 3,
    question: "İlaç etkileşimlerini nasıl kontrol edebilirim?",
    answer: "Kullandığınız ilaçları belirtin, PharmAI otomatik olarak etkileşim risklerini analiz eder. Örneğin: 'Parol ile Nurofen'i birlikte kullanabilir miyim?' şeklinde sorabilirsiniz.",
    category: "Güvenlik",
    icon: "⚠️"
  },
  {
    id: 4,
    question: "Dozaj önerileri güvenilir mi?",
    answer: "PharmAI dozaj önerileri eğitim amaçlıdır. Yaş, kilo ve sağlık durumunuza göre genel bilgi verir. Kesin dozaj için mutlaka doktorunuza danışın.",
    category: "Dozaj",
    icon: "📊"
  },
  {
    id: 5,
    question: "Yan etkiler hakkında bilgi alabilir miyim?",
    answer: "Evet, her ilacın yan etkileri hakkında detaylı bilgi alabilirsiniz. Hafif yan etkilerden ciddi reaksiyonlara kadar tüm bilgiler mevcuttur.",
    category: "Yan Etkiler",
    icon: "🩺"
  },
  {
    id: 6,
    question: "Alerjilerimi nasıl belirtebilirim?",
    answer: "Profil sayfanızdan alerjilerinizi ekleyebilirsiniz. PharmAI bu bilgileri dikkate alarak güvenli öneriler sunar.",
    category: "Profil",
    icon: "👤"
  },
  {
    id: 7,
    question: "Reçeteli ilaçlar hakkında bilgi alabilir miyim?",
    answer: "Evet, reçeteli ilaçlar hakkında da bilgi alabilirsiniz. Ancak bu bilgiler eğitim amaçlıdır. Reçeteli ilaçları doktor kontrolünde kullanmalısınız.",
    category: "Reçeteli İlaçlar",
    icon: "📋"
  },
  {
    id: 8,
    question: "Verilerim güvenli mi?",
    answer: "Tüm verileriniz şifrelenerek saklanır. Kişisel sağlık bilgileriniz güvenli ve gizli tutulur. Üçüncü taraflarla paylaşılmaz.",
    category: "Güvenlik",
    icon: "🔒"
  },
  {
    id: 9,
    question: "Sesli asistan özelliği var mı?",
    answer: "Evet, sesli giriş ve okuma özelliği mevcuttur. Mikrofon butonuna tıklayarak sesli soru sorabilir, AI yanıtlarını da sesli dinleyebilirsiniz.",
    category: "Sesli Asistan",
    icon: "🎤"
  },
  {
    id: 10,
    question: "Hangi tarayıcılarda çalışır?",
    answer: "Tüm modern tarayıcılarda çalışır: Chrome, Firefox, Safari, Edge. Mobil cihazlarda da tam uyumludur.",
    category: "Teknik",
    icon: "🌐"
  }
];

const categories = ["Tümü", "Genel", "İlaç Bilgisi", "Güvenlik", "Dozaj", "Yan Etkiler", "Profil", "Reçeteli İlaçlar", "Sesli Asistan", "Teknik"];

export default function FAQPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "Tümü" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 relative">
      {/* Background Pills */}
      <div className="pill1 opacity-20"></div>
      <div className="pill2 opacity-15"></div>
      <div className="pill3 opacity-25"></div>
      <div className="pill4 opacity-20"></div>
      <div className="pill5 opacity-15"></div>
      <div className="pill6 opacity-25"></div>
      <div className="pill7 opacity-20"></div>
      <div className="pill8 opacity-15"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
              ← Geri
            </button>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Sık Sorulan Sorular
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PharmAI hakkında merak ettiğiniz her şey. İlaç güvenliği, kullanım ve teknik destek.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Sorularınızı arayın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 shadow-lg shadow-emerald-500/10"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-emerald-500 text-xl">🔍</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-emerald-50/50 transition-colors duration-200 rounded-2xl"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{faq.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-emerald-700 transition-colors">
                      {faq.question}
                    </h3>
                    <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  openItems.includes(faq.id) ? 'rotate-180' : ''
                }`}>
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`faq-content overflow-hidden transition-all duration-300 ${
                openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-4">
                  <div className="border-t border-emerald-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/25">
            <h2 className="text-2xl font-bold mb-4">Başka sorunuz mu var?</h2>
            <p className="text-emerald-100 mb-6">
              PharmAI ekibi size yardımcı olmaya hazır. Chat asistanımızla iletişime geçin.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Chat'e Git →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 