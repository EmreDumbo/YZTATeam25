"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center relative">
     
      <div className="pill1"></div>
      <div className="pill2"></div>
      <div className="pill3"></div>
      <div className="pill4"></div>
      <div className="pill5"></div>
      <div className="pill6"></div>
      <div className="pill7"></div>
      <div className="pill8"></div>
      
      <form
        className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-emerald-100 relative z-10"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("login stub", {email, password});
          router.push("/dashboard");
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">PharmAI</h1>
          <p className="text-emerald-600 text-sm">Eczane Yönetim Sistemi</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Adresi
            </label>
            <input 
              type="email"
              placeholder="ornek@email.com"
              className="w-full border-2 border-emerald-200 p-3 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-2 border-emerald-200 p-3 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Giriş Yap
        </button>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 PharmAI - Tüm hakları saklıdır
          </p>
        </div>
      </form>
    </div>
  )
}