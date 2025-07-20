'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (!isStarted) setIsStarted(true);
    
    const userMsg = { role: 'user' as const, content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ messages: history })
      });
      const { reply } = await res.json();
      setMessages(msgs => [...msgs, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'I encountered an issue processing your request. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { icon: '🔍', text: 'Drug Interaction Check', query: 'Check drug interactions between warfarin and aspirin - critical bleeding risk' },
    { icon: '📊', text: 'Dosage Calculator', query: 'What is the correct dosage for metformin in diabetic patients?' },
    { icon: '⚗️', text: 'Drug Information', query: 'Tell me about sertraline - uses, side effects, and warnings' },
    { icon: '📋', text: 'Safety Guidelines', query: 'What are the safety guidelines for tramadol and controlled substances?' },
    { icon: '🩺', text: 'Clinical Usage', query: 'How should amlodipine be used for hypertension management?' },
    { icon: '💊', text: 'Medication Review', query: 'Compare different blood pressure medications - ACE inhibitors vs ARBs' }
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        {!isStarted ? (
          <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                <span className="text-3xl">🔬</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-3xl blur opacity-30 animate-pulse"></div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                PharmAI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Your comprehensive pharmacy assistant with access to <span className="font-bold text-emerald-600">100+ medications</span> from FDA databases. Get instant answers on drug interactions, dosages, and clinical guidelines.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-3xl">
                <div className="text-sm text-emerald-800">
                  <div className="font-semibold mb-2">🗄️ Comprehensive Database Includes:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>• Pain Relievers</div>
                    <div>• Antibiotics</div>
                    <div>• Heart Medications</div>
                    <div>• Diabetes Drugs</div>
                    <div>• Mental Health</div>
                    <div>• Respiratory</div>
                    <div>• Hormones</div>
                    <div>• And Many More!</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 w-full max-w-4xl">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(action.query);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {action.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="text-sm text-gray-500 mb-2">Try asking about specific medications:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Metformin', 'Lisinopril', 'Atorvastatin', 'Sertraline', 'Albuterol', 'Omeprazole'].map((drug) => (
                  <button
                    key={drug}
                    onClick={() => setInput(`Tell me about ${drug} - dosage, uses, and side effects`)}
                    className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full text-xs transition-colors"
                  >
                    {drug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔬</span>
                </div>
                <span className="text-emerald-700 font-medium">PharmAI Assistant</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">100+ Drugs</span>
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
                        <span className="text-sm text-gray-600">PharmAI is analyzing comprehensive database...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={endRef} />
            </div>
          </div>
        )}

        <div className={`${isStarted ? 'fixed' : 'relative'} ${isStarted ? 'bottom-0 left-0 right-0' : ''} bg-white/80 backdrop-blur-md border-t border-gray-200/50 p-4`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="flex items-end space-x-4 bg-white rounded-3xl shadow-xl shadow-gray-500/10 border border-gray-200/50 p-2">
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
                    placeholder="Ask about any of 100+ medications: dosages, interactions, side effects, clinical guidelines..."
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
                
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className={`p-3 rounded-2xl transition-all duration-200 ${
                    loading || !input.trim()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40'
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
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs rounded-full transition-colors duration-200 border border-emerald-200"
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
