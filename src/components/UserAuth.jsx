'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useLang } from '@/lib/LangContext';

// 有効な施設コード（将来はDBに移行）
const FACILITY_CODES = {
  'KAIGO2025':   { name: 'デモ施設',         type: 'demo',     plan: 'pro' },
  'FACEBOOK100': { name: 'Facebookキャンペーン', type: 'campaign', plan: 'pro' },
  'PARTNER01':   { name: 'パートナー施設',     type: 'facility', plan: 'pro' },
  'FACILITY01':  { name: '施設Aコード',        type: 'facility', plan: 'standard' },
  'SENDOUT01':   { name: '送り出し機関A',      type: 'sendout',  plan: 'unlimited' },
};

const STORAGE_KEY_USER = 'kaigo_user_profile';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoaded(true);
  }, []);

  const loginWithCode = (code) => {
    const facility = FACILITY_CODES[code.toUpperCase()];
    if (!facility) return false;
    const profile = {
      facilityCode: code.toUpperCase(),
      facilityName: facility.name,
      plan: facility.plan,
      type: facility.type,
      loginAt: new Date().toISOString(),
      id: 'user_' + Math.random().toString(36).slice(2, 9),
    };
    setUser(profile);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <UserContext.Provider value={{ user, loginWithCode, logout, loaded }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    // UserProviderの外で呼ばれた場合、localStorageから直接読む
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kaigo_user_profile');
        const user = saved ? JSON.parse(saved) : null;
        return { user, loginWithCode: () => false, logout: () => {}, loaded: true };
      } catch {
        return { user: null, loginWithCode: () => false, logout: () => {}, loaded: true };
      }
    }
    return { user: null, loginWithCode: () => false, logout: () => {}, loaded: true };
  }
  return ctx;
}

// 施設コード入力ポップアップ
const POPUP_TEXT = {
  ja: { title: '施設コードでログイン', desc: '施設・送り出し機関から発行されたコードを入力すると、無制限でご利用いただけます。', placeholder: '例：FACILITY01', btn: 'コードを入力して始める', skip: '無料プランで続ける', invalid: 'コードが正しくありません', success: 'ログイン成功！', hint: 'コードは施設の担当者にお問い合わせください' },
  id: { title: 'Login dengan Kode Fasilitas', desc: 'Masukkan kode dari fasilitas atau lembaga pengirim untuk penggunaan tak terbatas.', placeholder: 'Contoh: FACILITY01', btn: 'Masukkan kode', skip: 'Lanjutkan dengan paket gratis', invalid: 'Kode tidak valid', success: 'Login berhasil!', hint: 'Hubungi penanggung jawab fasilitas untuk kodenya' },
  vi: { title: 'Đăng nhập bằng Mã Cơ sở', desc: 'Nhập mã từ cơ sở hoặc tổ chức phái cử để sử dụng không giới hạn.', placeholder: 'Ví dụ: FACILITY01', btn: 'Nhập mã', skip: 'Tiếp tục với gói miễn phí', invalid: 'Mã không hợp lệ', success: 'Đăng nhập thành công!', hint: 'Liên hệ người phụ trách cơ sở để lấy mã' },
  tl: { title: 'Mag-login gamit ang Facility Code', desc: 'Ilagay ang code mula sa pasilidad o sending organization para sa walang limitasyong paggamit.', placeholder: 'Halimbawa: FACILITY01', btn: 'Ilagay ang code', skip: 'Magpatuloy sa libreng plano', invalid: 'Hindi valid ang code', success: 'Matagumpay na nag-login!', hint: 'Makipag-ugnayan sa staff ng pasilidad para sa code' },
  my: { title: 'အဆောက်အဦးကုဒ်ဖြင့် ဝင်ရောက်ရန်', desc: 'အဆောက်အဦး သို့မဟုတ် sending organization မှ ပေးသောကုဒ်ကို ထည့်ပါ။', placeholder: 'ဥပမာ: FACILITY01', btn: 'ကုဒ် ထည့်ရန်', skip: 'အခမဲ့ plan ဖြင့် ဆက်လုပ်ရန်', invalid: 'ကုဒ် မမှန်ကန်ပါ', success: 'ဝင်ရောက်မှု အောင်မြင်!', hint: 'ကုဒ်အတွက် အဆောက်အဦး တာဝန်ခံကို ဆက်သွယ်ပါ' },
  bn: { title: 'ফ্যাসিলিটি কোড দিয়ে লগইন', desc: 'সীমাহীন ব্যবহারের জন্য সুবিধা বা প্রেরণ সংস্থা থেকে পাওয়া কোড লিখুন।', placeholder: 'উদাহরণ: FACILITY01', btn: 'কোড লিখুন', skip: 'বিনামূল্যে প্ল্যানে চালিয়ে যান', invalid: 'কোডটি সঠিক নয়', success: 'লগইন সফল!', hint: 'কোডের জন্য সুবিধার দায়িত্বপ্রাপ্ত ব্যক্তির সাথে যোগাযোগ করুন' },
  ne: { title: 'सुविधा कोडले लगइन गर्नुहोस्', desc: 'असीमित प्रयोगको लागि सुविधा वा पठाउने संस्थाको कोड राख्नुहोस्।', placeholder: 'उदाहरण: FACILITY01', btn: 'कोड राख्नुहोस्', skip: 'निःशुल्क प्लानमा जारी राख्नुहोस्', invalid: 'कोड सही छैन', success: 'लगइन सफल!', hint: 'कोडको लागि सुविधाको जिम्मेवार व्यक्तिलाई सम्पर्क गर्नुहोस्' },
  km: { title: 'ចូលជាមួយកូដមណ្ឌល', desc: 'បញ្ចូលកូដពីមណ្ឌល ឬអង្គការបញ្ជូន ដើម្បីប្រើប្រាស់គ្មានដែនកំណត់។', placeholder: 'ឧទាហរណ៍: FACILITY01', btn: 'បញ្ចូលកូដ', skip: 'បន្តជាមួយផែនការឥតគិតថ្លៃ', invalid: 'កូដមិនត្រឹមត្រូវ', success: 'ចូលបានជោគជ័យ!', hint: 'ទាក់ទងអ្នកទទួលខុសត្រូវមណ្ឌលសម្រាប់កូដ' },
};

export function FacilityCodePopup({ onClose }) {
  const { lang } = useLang();
  const { loginWithCode } = useUser();
  const tx = POPUP_TEXT[lang] || POPUP_TEXT['ja'];
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const handleSubmit = () => {
    if (!code.trim()) return;
    const ok = loginWithCode(code.trim());
    if (ok) {
      setStatus('success');
      setTimeout(() => onClose(), 1200);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔑</div>
          <h2 className="text-xl font-extrabold text-gray-800 mb-2">{tx.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{tx.desc}</p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setStatus(null); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder={tx.placeholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-green-400 uppercase"
          />
          {status === 'error' && (
            <p className="text-red-500 text-sm text-center mt-2">❌ {tx.invalid}</p>
          )}
          {status === 'success' && (
            <p className="text-green-600 text-sm text-center mt-2">✅ {tx.success}</p>
          )}
          <p className="text-xs text-gray-400 text-center mt-2">💡 {tx.hint}</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!code.trim()}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-extrabold py-4 rounded-2xl text-lg transition-colors mb-3"
        >
          🔑 {tx.btn}
        </button>
        <button
          onClick={onClose}
          className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors"
        >
          {tx.skip}
        </button>
      </div>
    </div>
  );
}

// ナビバー用ユーザーバッジ
const BADGE_TEXT = {
  ja: { free: '無料', pro: 'プロ', unlimited: '無制限', logout: 'ログアウト', login: '施設コードでログイン' },
  id: { free: 'Gratis', pro: 'Pro', unlimited: 'Tak Terbatas', logout: 'Keluar', login: 'Login dengan Kode' },
  vi: { free: 'Miễn phí', pro: 'Pro', unlimited: 'Không giới hạn', logout: 'Đăng xuất', login: 'Đăng nhập bằng Mã' },
  tl: { free: 'Libre', pro: 'Pro', unlimited: 'Walang Limitasyon', logout: 'Mag-logout', login: 'Login gamit ang Code' },
  my: { free: 'အခမဲ့', pro: 'Pro', unlimited: 'အကန့်အသတ်မရှိ', logout: 'ထွက်ရန်', login: 'ကုဒ်ဖြင့် ဝင်ရောက်' },
  bn: { free: 'বিনামূল্যে', pro: 'প্রো', unlimited: 'সীমাহীন', logout: 'লগআউট', login: 'কোড দিয়ে লগইন' },
  ne: { free: 'निःशुल्क', pro: 'प्रो', unlimited: 'असीमित', logout: 'लगआउट', login: 'कोडले लगइन' },
  km: { free: 'ឥតគិតថ្លៃ', pro: 'Pro', unlimited: 'គ្មានដែនកំណត់', logout: 'ចាកចេញ', login: 'ចូលជាមួយកូដ' },
};

export function UserBadge() {
  const { lang } = useLang();
  const { user, logout } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const bt = BADGE_TEXT[lang] || BADGE_TEXT['ja'];

  if (user) {
    const planLabel = user.plan === 'unlimited' ? bt.unlimited : user.plan === 'pro' ? bt.pro : bt.pro;
    return (
      <>
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>🏢</span>
            <span className="hidden sm:inline">{user.facilityName}</span>
            <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">{planLabel}</span>
          </div>
          <button onClick={logout} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            {bt.logout}
          </button>
        </div>
        {showPopup && <FacilityCodePopup onClose={() => setShowPopup(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="text-xs text-green-700 border border-green-300 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full font-bold transition-colors flex items-center gap-1"
      >
        🔑 <span className="hidden sm:inline">{bt.login}</span>
      </button>
      {showPopup && <FacilityCodePopup onClose={() => setShowPopup(false)} />}
    </>
  );
}
