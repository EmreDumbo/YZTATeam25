'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Message = { role: 'user' | 'assistant'; content: string };

interface User {
  firstName: string;
  lastName?: string;
  email?: string;
}

// Speech Synthesis types (sadece sesli okuma için)
interface SpeechSynthesisUtterance extends EventTarget {
  text: string;
  lang: string;
  rate: number;
  pitch: number;
  onend: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
  onerror: ((this: SpeechSynthesisUtterance, ev: Event) => any) | null;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isArcBrowser, setIsArcBrowser] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/');
      return;
    }
    
    setUser(JSON.parse(userData));

    // Detect Arc browser
    const userAgent = navigator.userAgent;
    const isChrome = userAgent.includes('Chrome');
    const isArc = userAgent.includes('Arc') || userAgent.includes('Company') || 
                  (isChrome && !userAgent.includes('Safari/') && !userAgent.includes('Edge'));
    setIsArcBrowser(isArc);
  }, [router]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Sesli giriş fonksiyonu - Basitleştirilmiş versiyon
  const startListening = () => {
    // Sesli giriş şu anda kullanılamıyor, kullanıcıya bilgi ver
    alert('Sesli giriş özelliği şu anda kullanılamıyor. Lütfen yazı ile sorunuzu sorun. Sesli okuma özelliği aktif.');
  };

  // File upload fonksiyonu
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya türü kontrolü
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      alert('Sadece resim, PDF ve metin dosyaları yükleyebilirsiniz.');
      return;
    }

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }

    setUploading(true);
    setUploadedFile(file);

    try {
      // Dosya içeriğini oku
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        // Dosya bilgilerini AI'ya gönder (base64 içeriği gizli)
        const fileMessage = `Dosya yüklendi: ${file.name} (${(file.size / 1024).toFixed(1)}KB)\n\nDosya türü: ${file.type}\n\nBu dosyayı analiz eder misin?`;
        setInput(fileMessage);
        
        // Dosya içeriğini ayrı bir değişkende sakla ve AI'ya gönder
        const fullMessage = `Dosya yüklendi: ${file.name} (${(file.size / 1024).toFixed(1)}KB)\n\nDosya içeriği:\n${content}`;
        
        // Otomatik olarak mesajı gönder
        setTimeout(() => {
          // Dosya içeriğini gizli olarak gönder
          sendMessageWithFile(fullMessage);
        }, 500);
      };
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('Dosya yükleme hatası oluştu.');
    } finally {
      setUploading(false);
      // Input'u temizle
      event.target.value = '';
    }
  };

  // Sesli okuma fonksiyonu
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setIsSpeaking(false);
          console.log('Sesli okuma tamamlandı.');
        };
        
        utterance.onerror = (event) => {
          console.error('Sesli okuma hatası:', event);
          setIsSpeaking(false);
          alert('Sesli okuma hatası oluştu. Lütfen tekrar deneyin.');
        };
        
        speechSynthesis.speak(utterance);
        console.log('Sesli okuma başlatıldı...');
      } catch (error) {
        console.error('Sesli okuma başlatma hatası:', error);
        setIsSpeaking(false);
        alert('Sesli okuma başlatılamadı. Lütfen tekrar deneyin.');
      }
    } else {
      alert('Sesli okuma bu tarayıcıda desteklenmiyor.');
    }
  };

  // Sesli okumayı durdurma fonksiyonu
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log('Sesli okuma durduruldu.');
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (!isStarted) setIsStarted(true);
    
    const userMsg = { role: 'user' as const, content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          message: input.trim(),
          context: JSON.stringify(messages.slice(-5)) // Son 5 mesajı context olarak gönder
        })
      });
      
      if (!res.ok) {
        throw new Error('API request failed');
      }
      
      const data = await res.json();
      const assistantMsg = { role: 'assistant' as const, content: data.response };
      setMessages(msgs => [...msgs, assistantMsg]);
      
      // AI yanıtını sesli oku
      speakText(data.response);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Dosya ile mesaj gönderme fonksiyonu
  const sendMessageWithFile = async (fileContent: string) => {
    if (!isStarted) setIsStarted(true);
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          message: fileContent,
          context: JSON.stringify(messages.slice(-5)) // Son 5 mesajı context olarak gönder
        })
      });
      
      if (!res.ok) {
        throw new Error('API request failed');
      }
      
      const data = await res.json();
      const assistantMsg = { role: 'assistant' as const, content: data.response };
      setMessages(msgs => [...msgs, assistantMsg]);
      
      // AI yanıtını sesli oku
      speakText(data.response);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: '🔍', text: 'İlaç Etkileşimi', query: 'Parol ile Nurofen\'i birlikte kullanabilir miyim?' },
    { icon: '📊', text: 'Dozaj Hesaplayıcı', query: 'Kilo ve boyuma göre dozaj önerisi verir misin?' },
    { icon: '💊', text: 'İlaç Bilgisi', query: 'Arveles\'in yan etkileri nelerdir?' },
    { icon: '📋', text: 'Güvenlik Kuralları', query: 'Astımım var, hangi ilaçları kullanmamalıyım?' },
    { icon: '🩺', text: 'Klinik Kullanım', query: 'Augmentin antibiyotiği nasıl kullanılır?' },
    { icon: '💊', text: 'İlaç Karşılaştırması', query: 'Ventolin ile diğer astım ilaçları arasındaki fark nedir?' }
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20">
      <div className="pill1 opacity-30"></div>
      <div className="pill2 opacity-20"></div>
      <div className="pill3 opacity-25"></div>
      <div className="pill4 opacity-30"></div>
      <div className="pill5 opacity-20"></div>
      <div className="pill6 opacity-25"></div>
      <div className="pill7 opacity-20"></div>
      <div className="pill8 opacity-30"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        {!isStarted ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 pb-40">
            {/* Header with Profile Button */}
            <div className="absolute top-6 right-6 flex items-center space-x-3">
              {user && (
                <span className="text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200">
                  Hoş geldin, {user.firstName}!
                </span>
              )}
              <button
                onClick={() => router.push('/faq')}
                className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-purple-50 text-purple-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-purple-200/50"
                title="Sık Sorulan Sorular"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
                className={`group p-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border ${
                  uploading
                    ? 'bg-yellow-50 text-yellow-600 border-yellow-200/50 cursor-not-allowed'
                    : 'bg-white/80 backdrop-blur-sm hover:bg-green-50 text-green-600 border-green-200/50'
                }`}
                title="Dosya Yükle"
              >
                {uploading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => router.push('/profile')}
                className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-blue-50 text-blue-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-blue-200/50"
                title="Profil"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/');
                }}
                className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-red-50 text-red-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-red-200/50"
                title="Çıkış Yap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 hover:shadow-3xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300">
                <span className="text-3xl">🔬</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-3xl blur opacity-30 animate-pulse"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                PharmAI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Türkiye'nin en kapsamlı eczane asistanı. <span className="font-bold text-emerald-600">100+ ilaç</span> hakkında anında bilgi alın. İlaç etkileşimleri, dozajlar ve klinik rehberler.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-3xl hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300">
                <div className="text-sm text-emerald-800">
                  <div className="font-semibold mb-2">🗄️ Kapsamlı Veritabanı İçerir:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>• Ağrı Kesiciler</div>
                    <div>• Antibiyotikler</div>
                    <div>• Kalp İlaçları</div>
                    <div>• Diyabet İlaçları</div>
                    <div>• Ruh Sağlığı</div>
                    <div>• Solunum</div>
                    <div>• Hormonlar</div>
                    <div>• Ve Daha Fazlası!</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-4xl">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(action.query);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="hover-lift group p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 hover:scale-105"
                >
                  <div className="text-2xl mb-3 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {action.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Belirli ilaçlar hakkında soru sorun:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Parol', 'Arveles', 'Augmentin', 'Ventolin', 'Nurofen', 'Omeprazol'].map((drug) => (
                  <button
                    key={drug}
                    onClick={() => setInput(`${drug} hakkında bilgi ver - dozaj, kullanım ve yan etkiler`)}
                    className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full text-xs transition-all duration-200 hover:scale-110 hover:shadow-md"
                  >
                    {drug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) :
          <div className="space-y-6 pt-8 pb-32">
            <div className="flex justify-between items-center mb-8">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200/50 hover:bg-white/80 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">🔬</span>
                </div>
                <span className="text-emerald-700 font-medium">PharmAI Asistan</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full hover:bg-emerald-200 transition-colors duration-200">100+ İlaç</span>
              </div>

              <div className="flex items-center space-x-3">
                {user && (
                  <span className="text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200">
                    Hoş geldin, {user.firstName}!
                  </span>
                )}
                <button
                  onClick={() => router.push('/faq')}
                  className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-purple-50 text-purple-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-purple-200/50"
                  title="Sık Sorulan Sorular"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={uploading}
                  className={`group p-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border ${
                    uploading
                      ? 'bg-yellow-50 text-yellow-600 border-yellow-200/50 cursor-not-allowed'
                      : 'bg-white/80 backdrop-blur-sm hover:bg-green-50 text-green-600 border-green-200/50'
                  }`}
                  title="Dosya Yükle"
                >
                  {uploading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => router.push('/profile')}
                  className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-blue-50 text-blue-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-blue-200/50"
                  title="Profil"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/');
                  }}
                  className="group p-2 bg-white/80 backdrop-blur-sm hover:bg-red-50 text-red-600 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 border border-red-200/50"
                  title="Çıkış Yap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl ${m.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                    <div className={`px-6 py-4 rounded-3xl ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50 shadow-lg shadow-gray-500/10'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {m.content.split('\n').map((line, idx) => (
                          <p key={idx} className={`${idx === 0 ? '' : 'mt-2'} ${m.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                            {line}
                          </p>
                        ))}
                      </div>
                      
                      {/* Sesli Okuma Butonu - Sadece AI yanıtları için */}
                      {m.role === 'assistant' && (
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={isSpeaking ? stopSpeaking : () => speakText(m.content)}
                            className={`group p-2 rounded-xl transition-all duration-200 ${
                              isSpeaking
                                ? 'speaking bg-red-500 text-white animate-pulse hover:bg-red-600'
                                : 'bg-white/80 backdrop-blur-sm hover:bg-emerald-50 text-emerald-600 hover:scale-110 hover:shadow-md border border-emerald-200/50'
                            }`}
                            title={isSpeaking ? "Sesli okumayı durdur" : "Sesli oku"}
                          >
                            {isSpeaking ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-xs text-gray-500 mt-2 px-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl mr-12">
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl px-6 py-4 shadow-lg shadow-gray-500/10">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-600">PharmAI kapsamlı veritabanını analiz ediyor...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={endRef} />
            </div>
          </div>
        }

        {/* Hidden file input */}
        <input
          id="file-upload"
          type="file"
          accept="image/*,.pdf,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Fixed positioned chat bar that's always visible */}
        <div className={isArcBrowser ? "arc-chat-fix" : "fixed-chat-bar"}>
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-200/50 p-4">
                          <div className="relative">
                <div className="flex items-end space-x-4 bg-white rounded-3xl shadow-xl shadow-gray-500/10 border border-gray-200/50 p-2 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 chat-input-container">
                  <div className="flex-1 min-h-[52px] max-h-32">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="100+ ilaç hakkında soru sorun: dozajlar, etkileşimler, yan etkiler, klinik rehberler..."
                      className="w-full h-full px-4 py-3 bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-500"
                      disabled={loading}
                      rows={1}
                      style={{
                        height: 'auto',
                        minHeight: '52px',
                        maxHeight: '128px'
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                      }}
                    />
                  </div>
                  
                  {/* Sesli Giriş Butonu - Basitleştirilmiş */}
                  <button
                    onClick={startListening}
                    disabled={loading}
                    className="group p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200/50"
                    title="Sesli giriş (şu anda kullanılamıyor)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className={`group p-3 rounded-xl transition-all duration-300 transform ${
                      loading || !input.trim()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-110 hover:-translate-y-1'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              
              {isStarted && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickActions.slice(0, 4).map((action, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(action.query)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs rounded-full transition-all duration-200 border border-emerald-200 hover:border-emerald-300 hover:scale-105 hover:shadow-md"
                    >
                      <span>{action.icon}</span>
                      <span>{action.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
