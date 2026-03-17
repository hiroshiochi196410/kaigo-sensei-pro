'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LANGS = [
  { code: 'ja', flag: '🇯🇵' },
  { code: 'id', flag: '🇮🇩' },
  { code: 'vi', flag: '🇻🇳' },
  { code: 'tl', flag: '🇵🇭' },
  { code: 'my', flag: '🇲🇲' },
  { code: 'bn', flag: '🇧🇩' },
  { code: 'ne', flag: '🇳🇵' },
  { code: 'km', flag: '🇰🇭' },
];

const T = {
  ja: {
    title: '今月の感想を教えてください',
    subtitle: '感想を送ると、来月の割引クーポンをプレゼント！🎁',
    name: 'お名前',
    email: 'メールアドレス（クーポン送付先）',
    good: '良かった点・役に立った機能は？',
    improve: '改善してほしい点・あったら嬉しい機能は？',
    score: '総合満足度',
    nextGoal: '来月の目標（例：試験まであと3ヶ月！）',
    submit: '感想を送ってクーポンをもらう 🎁',
    sending: '送信中...',
    success: 'ありがとうございます！クーポンをメールで送りました 🎉',
    error: '送信に失敗しました。もう一度お試しください。',
    required: '必須',
    back: 'トップへ戻る',
    scores: ['1 - 改善が必要', '2 - もう少し', '3 - 普通', '4 - 良い', '5 - 最高！'],
  },
  id: {
    title: 'Bagikan kesan bulan ini',
    subtitle: 'Kirim kesan dan dapatkan kupon diskon bulan depan! 🎁',
    name: 'Nama',
    email: 'Alamat email (untuk pengiriman kupon)',
    good: 'Apa yang bagus / fitur yang berguna?',
    improve: 'Apa yang perlu diperbaiki / fitur yang diinginkan?',
    score: 'Kepuasan keseluruhan',
    nextGoal: 'Target bulan depan',
    submit: 'Kirim kesan & dapatkan kupon 🎁',
    sending: 'Mengirim...',
    success: 'Terima kasih! Kupon telah dikirim ke email Anda 🎉',
    error: 'Gagal mengirim. Silakan coba lagi.',
    required: 'Wajib',
    back: 'Ke halaman utama',
    scores: ['1 - Perlu perbaikan', '2 - Kurang', '3 - Biasa', '4 - Bagus', '5 - Sempurna!'],
  },
  km: {
    title: 'សូមចែករំលែកការចាប់អារម្មណ៍ប្រចាំខែ',
    subtitle: 'ផ្ញើការចាប់អារម្មណ៍ ហើយទទួលបានគូប៉ុងបញ្ចុះតម្លៃខែក្រោយ! 🎁',
    name: 'ឈ្មោះ',
    email: 'អាសយដ្ឋានអ៊ីមែល (សម្រាប់ផ្ញើគូប៉ុង)',
    good: 'អ្វីដែលល្អ / មុខងារដែលមានប្រយោជន៍?',
    improve: 'អ្វីដែលត្រូវកែលម្អ / មុខងារដែលចង់បាន?',
    score: 'ការពេញចិត្តសរុប',
    nextGoal: 'គោលដៅខែក្រោយ',
    submit: 'ផ្ញើការចាប់អារម្មណ៍ & ទទួលគូប៉ុង 🎁',
    sending: 'កំពុងផ្ញើ...',
    success: 'អរគុណ! គូប៉ុងត្រូវបានផ្ញើទៅអ៊ីមែលរបស់អ្នក 🎉',
    error: 'ការផ្ញើបានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។',
    required: 'តម្រូវ',
    back: 'ទៅទំព័រដើម',
    scores: ['1 - ត្រូវការកែលម្អ', '2 - មិនសូវ', '3 - ធម្មតា', '4 - ល្អ', '5 - ល្អបំផុត!'],
  },
};

export default function FeedbackPage() {
  const router = useRouter();
  const [lang, setLang] = useState('ja');
  const [form, setForm] = useState({ name: '', email: '', good: '', improve: '', score: '', nextGoal: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');

  const t = T[lang] || T.ja;

  const handleSubmit = async () => {
    if (!form.email || !form.good || !form.score) return;
    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setCoupon(data.coupon);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #fdf4ff 100%)' }} className="pb-20">
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* 戻るボタン */}
        <button onClick={() => router.push('/')} className="text-sm text-gray-400 hover:text-green-600 mb-5 flex items-center gap-1">
          ← {t.back}
        </button>

        {/* 言語切替 */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={lang === l.code ? { background: '#16a34a', color: 'white' } : {}}
              className="w-9 h-9 rounded-full text-lg border border-gray-200 bg-white transition-all hover:scale-110">
              {l.flag}
            </button>
          ))}
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">💌</div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h1>
          <p className="text-sm text-green-600 font-medium">{t.subtitle}</p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-lg font-bold text-green-700 mb-4">{t.success}</p>
            {coupon && (
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-5 mb-6">
                <p className="text-xs text-yellow-700 mb-2">🎁 あなたのクーポンコード</p>
                <p className="text-2xl font-black text-yellow-600 tracking-widest">{coupon}</p>
                <p className="text-xs text-yellow-600 mt-2">メールにも送りました！</p>
              </div>
            )}
            <button onClick={() => router.push('/')}
              className="bg-green-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-green-700 transition-colors">
              🚀 学習を続ける
            </button>
          </div>
        ) : (
          <div className="space-y-4">

            {/* お名前 */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">{t.name}</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
            </div>

            {/* メール */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                {t.email} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
            </div>

            {/* 満足度 */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                {t.score} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setForm({ ...form, score: String(n) })}
                    style={form.score === String(n) ? { background: '#16a34a', color: 'white', borderColor: '#16a34a' } : {}}
                    className="flex-1 py-3 rounded-2xl border-2 border-gray-200 bg-white font-bold text-lg transition-all hover:border-green-300">
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* 良かった点 */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                {t.good} <span className="text-red-500 text-xs">{t.required}</span>
              </label>
              <textarea value={form.good} onChange={e => setForm({ ...form, good: e.target.value })}
                rows={3} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white resize-none" />
            </div>

            {/* 改善点 */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">{t.improve}</label>
              <textarea value={form.improve} onChange={e => setForm({ ...form, improve: e.target.value })}
                rows={3} className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white resize-none" />
            </div>

            {/* 来月の目標 */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">{t.nextGoal}</label>
              <input type="text" value={form.nextGoal} onChange={e => setForm({ ...form, nextGoal: e.target.value })}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white" />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">{t.error}</p>
            )}

            <button onClick={handleSubmit}
              disabled={loading || !form.email || !form.good || !form.score}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={(!loading && form.email && form.good && form.score) ? { background: 'linear-gradient(135deg, #16a34a, #059669)', boxShadow: '0 4px 14px rgba(22,163,74,0.4)' } : {}}>
              {loading ? t.sending : t.submit}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
