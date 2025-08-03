'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  weight?: number;
  height?: number;
  currentMedications?: string;
  allergies?: string;
  chronicDiseases?: string;
  bloodType?: string;
  emergencyContact?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Profil yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-200/50 p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👤</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Profil Bilgileri
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-sm transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                🏠 Ana Sayfa
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                {isEditing ? '❌ İptal' : '✏️ Düzenle'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Temel Kimlik Bilgileri */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-200/50 p-6">
            <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-200 pb-2 mb-6 flex items-center">
              <span className="text-2xl mr-2">👤</span>
              Temel Bilgiler
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.firstName || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.lastName || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.phoneNumber || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cinsiyet</label>
                {isEditing ? (
                  <select
                    value={formData.gender || ''}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    <option value="">Seçiniz</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.gender || 'Belirtilmemiş'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sağlık Bilgileri */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-500/20 border border-emerald-200/50 p-6">
            <h2 className="text-xl font-semibold text-emerald-800 border-b border-emerald-200 pb-2 mb-6 flex items-center">
              <span className="text-2xl mr-2">🏥</span>
              Sağlık Bilgileri
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kilo (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.weight ? `${profile.weight} kg` : 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Boy (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.height ? `${profile.height} cm` : 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kan Grubu</label>
                {isEditing ? (
                  <select
                    value={formData.bloodType || ''}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  >
                    <option value="">Seçiniz</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.bloodType || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kullandığı İlaçlar</label>
                {isEditing ? (
                  <textarea
                    value={formData.currentMedications || ''}
                    onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm resize-none"
                    placeholder="Kullandığınız ilaçları yazın..."
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.currentMedications || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alerjiler</label>
                {isEditing ? (
                  <textarea
                    value={formData.allergies || ''}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm resize-none"
                    placeholder="Alerjilerinizi yazın..."
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.allergies || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kronik Hastalıklar</label>
                {isEditing ? (
                  <textarea
                    value={formData.chronicDiseases || ''}
                    onChange={(e) => handleInputChange('chronicDiseases', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm resize-none"
                    placeholder="Kronik hastalıklarınızı yazın..."
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.chronicDiseases || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Acil Durum İletişim</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.emergencyContact || ''}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                    placeholder="Acil durumda aranacak kişi"
                  />
                ) : (
                  <p className="text-gray-900 bg-emerald-50 px-3 py-2 rounded-2xl">{profile?.emergencyContact || 'Belirtilmemiş'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
            >
              ❌ İptal
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:scale-105"
            >
              {saving ? '💾 Kaydediliyor...' : '💾 Kaydet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 