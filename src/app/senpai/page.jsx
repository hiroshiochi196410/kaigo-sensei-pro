'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LANGS = [
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'id', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'vi', flag: '🇻🇳', name: 'Việt Nam' },
  { code: 'tl', flag: '🇵🇭', name: 'Filipino' },
  { code: 'my', flag: '🇲🇲', name: 'မြန်မာ' },
  { code: 'bn', flag: '🇧🇩', name: 'বাংলা' },
  { code: 'ne', flag: '🇳🇵', name: 'नेपाली' },
  { code: 'km', flag: '🇰🇭', name: 'ខ្មែរ' },
];

const T = {
  ja: {
    title: '先輩たちのメッセージ',
    subtitle: 'あなたより先に、この道を歩んだ仲間がいます',
    follow: 'フォローする',
    watch: 'リールを見る',
    message_label: 'メッセージ',
    country: '出身国',
    qualification: '資格',
    join: 'あなたも先輩として紹介されませんか？',
    join_btn: '紹介を申し込む',
    back: 'トップへ戻る',
    thearin_msg: 'カンボジアから日本に来て、言葉も文化も全然違って、最初はとても不安でした。でも、介護の仕事を通じて、人の温かさをたくさん知ることができました。今度はみなさんの番です。一緒に頑張りましょう！',
    thearin_role: '介護福祉士 / SNSクリエイター',
    feature1: '日本語と介護についてSNSで発信中',
    feature2: 'フォロワー5,400人超の頼れる先輩',
    feature3: '「介護と日本語 With Thearin」',
  },
  id: {
    title: 'Pesan dari Para Senior',
    subtitle: 'Ada teman yang sudah berjalan di jalan ini sebelum kamu',
    follow: 'Ikuti',
    watch: 'Lihat Reel',
    message_label: 'Pesan',
    country: 'Negara asal',
    qualification: 'Kualifikasi',
    join: 'Mau diperkenalkan sebagai senior?',
    join_btn: 'Daftar',
    back: 'Kembali ke beranda',
    thearin_msg: 'Saya datang dari Kamboja ke Jepang, bahasa dan budayanya sangat berbeda, awalnya saya sangat khawatir. Tapi melalui pekerjaan perawatan, saya bisa mengenal kehangatan manusia. Sekarang giliran kalian. Ayo berjuang bersama!',
    thearin_role: 'Perawat Sosial / Kreator SNS',
    feature1: 'Aktif di SNS tentang bahasa Jepang dan perawatan',
    feature2: 'Senior terpercaya dengan 5.400+ pengikut',
    feature3: '"Perawatan dan Bahasa Jepang With Thearin"',
  },
  vi: {
    title: 'Lời Nhắn Từ Các Đàn Anh Chị',
    subtitle: 'Có người đã đi con đường này trước bạn',
    follow: 'Theo dõi',
    watch: 'Xem Reel',
    message_label: 'Lời nhắn',
    country: 'Quê hương',
    qualification: 'Bằng cấp',
    join: 'Bạn có muốn được giới thiệu là đàn anh chị?',
    join_btn: 'Đăng ký',
    back: 'Quay về trang chủ',
    thearin_msg: 'Tôi đến Nhật Bản từ Campuchia, ngôn ngữ và văn hóa rất khác nhau, lúc đầu tôi rất lo lắng. Nhưng qua công việc chăm sóc, tôi đã biết được sự ấm áp của con người. Bây giờ đến lượt các bạn. Hãy cùng cố gắng!',
    thearin_role: 'Nhân viên phúc lợi xã hội / Người sáng tạo nội dung',
    feature1: 'Chia sẻ về tiếng Nhật và nghề chăm sóc trên SNS',
    feature2: 'Đàn chị đáng tin với hơn 5.400 người theo dõi',
    feature3: '"Chăm sóc và Tiếng Nhật With Thearin"',
  },
  tl: {
    title: 'Mensahe mula sa mga Nauna',
    subtitle: 'May mga kasamahan na naglakad sa landas na ito bago ka',
    follow: 'I-follow',
    watch: 'Panoorin ang Reel',
    message_label: 'Mensahe',
    country: 'Bansang pinanggalingan',
    qualification: 'Kwalipikasyon',
    join: 'Gusto mo bang makilala bilang isang senior?',
    join_btn: 'Mag-apply',
    back: 'Bumalik sa homepage',
    thearin_msg: 'Nanggaling ako sa Cambodia patungong Japan, napaka-iba ng wika at kultura, noong una ay takot na takot ako. Ngunit sa pamamagitan ng trabahong pang-alaga, natutunan ko ang init ng puso ng tao. Ngayon ay ikaw na. Sama-sama tayong magsikap!',
    thearin_role: 'Karero sa Welfare / SNS Creator',
    feature1: 'Nagpo-post sa SNS tungkol sa Japanese at pangangalaga',
    feature2: 'Mapagkakatiwalaang senior na may 5,400+ followers',
    feature3: '"Pangangalaga at Japanese With Thearin"',
  },
  km: {
    title: 'សារពីរបស់បងៗ',
    subtitle: 'មានមិត្តភ័ក្ដិដែលបានដើរនៅលើផ្លូវនេះមុនអ្នក',
    follow: 'តាមដាន',
    watch: 'មើល Reel',
    message_label: 'សារ',
    country: 'ប្រទេសកំណើត',
    qualification: 'គុណវុឌ្ឍិ',
    join: 'តើអ្នកចង់ត្រូវបានណែនាំជាបងចាស់ទេ?',
    join_btn: 'ដាក់ពាក្យ',
    back: 'ត្រឡប់ទៅទំព័រដើម',
    thearin_msg: 'ខ្ញុំបានមកប្រទេសជប៉ុនពីប្រទេសកម្ពុជា ភាសា និងវប្បធម៌ខុសគ្នាខ្លាំងណាស់ ដំបូងខ្ញុំភ័យខ្លាំងណាស់។ ប៉ុន្តែតាមរយៈការងារថែទាំ ខ្ញុំបានដឹងពីភាពកក់ក្ដៅរបស់មនុស្ស។ ឥឡូវជាវេនអ្នក។ តោះព្យាយាមជាមួយគ្នា!',
    thearin_role: 'អ្នកថែទាំសង្គម / អ្នកបង្កើតមាតិកា SNS',
    feature1: 'ចែករំលែកនៅ SNS អំពីភាសាជប៉ុននិងការថែទាំ',
    feature2: 'បងស្រីដ៏ជឿទុកចិត្តបានជាង 5,400 អ្នកតាម',
    feature3: '"ការថែទាំ និងភាសាជប៉ុន With Thearin"',
  },
  my: {
    title: 'အကြီးများ၏ မက်ဆေ့ချ်',
    subtitle: 'ဤလမ်းကို သင်မတိုင်မီ လျှောက်ခဲ့သော မိတ်ဆွေများ ရှိသည်',
    follow: 'ဖောလိုလုပ်',
    watch: 'Reel ကြည့်',
    message_label: 'မက်ဆေ့ချ်',
    country: 'မွေးဖွားသောနိုင်ငံ',
    qualification: 'အရည်အချင်း',
    join: 'အကြီးအဖြစ် မိတ်ဆက်ပေးစေလိုသလား?',
    join_btn: 'လျှောက်ထားမည်',
    back: 'ပင်မစာမျက်နှာ',
    thearin_msg: 'ကမ္ဘောဒီးယားမှ ဂျပန်သို့လာခဲ့ပြီး ဘာသာစကားနှင့် ယဉ်ကျေးမှုများ ကွာခြားသည်ကြောင့် အစပိုင်းတွင် ပူပင်သောကများ ရှိခဲ့သည်။ သို့သော် ပြုစုစောင့်ရှောက်မှု အလုပ်မှတစ်ဆင့် လူသားတို့၏ 温暖ကို သိနိုင်ခဲ့သည်။ ယခု သင်တို့အလှည့်ဖြစ်သည်။ အတူတကွ ကြိုးစားကြစို့!',
    thearin_role: 'လူမှုဖူလုံရေး / SNS ဖန်တီးသူ',
    feature1: 'ဂျပန်ဘာသာနှင့် ပြုစုစောင့်ရှောက်မှုအကြောင်း SNS တွင်မျှဝေ',
    feature2: 'ယုံကြည်ရသောအကြီး ၅,၄၀၀+ followers',
    feature3: '"ပြုစုစောင့်ရှောက်မှုနှင့်ဂျပန်ဘာသာ With Thearin"',
  },
  bn: {
    title: 'সিনিয়রদের বার্তা',
    subtitle: 'আপনার আগে এই পথে হেঁটেছেন এমন বন্ধু আছে',
    follow: 'ফলো করুন',
    watch: 'রিল দেখুন',
    message_label: 'বার্তা',
    country: 'জন্মভূমি',
    qualification: 'যোগ্যতা',
    join: 'আপনিও সিনিয়র হিসেবে পরিচিত হতে চান?',
    join_btn: 'আবেদন করুন',
    back: 'হোমে ফিরুন',
    thearin_msg: 'আমি কম্বোডিয়া থেকে জাপানে এসেছি, ভাষা এবং সংস্কৃতি অনেক আলাদা, শুরুতে খুব ভয় পেয়েছিলাম। কিন্তু যত্নের কাজের মাধ্যমে মানুষের উষ্ণতা জানতে পেরেছি। এখন আপনাদের পালা। একসাথে চেষ্টা করি!',
    thearin_role: 'সমাজকল্যাণ কর্মী / SNS ক্রিয়েটর',
    feature1: 'SNS-এ জাপানি ভাষা ও যত্ন সম্পর্কে শেয়ার করেন',
    feature2: '৫,৪০০+ ফলোয়ারের বিশ্বস্ত সিনিয়র',
    feature3: '"যত্ন ও জাপানি ভাষা With Thearin"',
  },
  ne: {
    title: 'सिनियरहरूको सन्देश',
    subtitle: 'यो बाटोमा तपाईंभन्दा पहिले हिँडेका साथीहरू छन्',
    follow: 'फलो गर्नुस्',
    watch: 'रिल हेर्नुस्',
    message_label: 'सन्देश',
    country: 'जन्मभूमि',
    qualification: 'योग्यता',
    join: 'तपाईं पनि सिनियरको रूपमा परिचित हुन चाहनुहुन्छ?',
    join_btn: 'आवेदन गर्नुस्',
    back: 'होमपेजमा फर्कनुस्',
    thearin_msg: 'म कम्बोडियाबाट जापान आएँ, भाषा र संस्कृति धेरै फरक थियो, सुरुमा धेरै डर लाग्यो। तर हेरचाहको काम मार्फत मानिसहरूको न्यानो महसुस गर्न पाएँ। अब तपाईंहरूको पालो छ। सँगै कोसिस गरौं!',
    thearin_role: 'समाजकल्याण कार्यकर्ता / SNS सिर्जनाकर्ता',
    feature1: 'SNS मा जापानी भाषा र हेरचाहबारे साझा गर्नुहुन्छ',
    feature2: '५,४०० भन्दा बढी फलोअर भएका भरपर्दो सिनियर',
    feature3: '"हेरचाह र जापानी भाषा With Thearin"',
  },
};

const SENPAI = [
  {
    id: 'thearin',
    name: 'Oen Thearin',
    nameJa: 'テーリン先輩',
    country: '🇰🇭 カンボジア',
    countryCode: 'km',
    qualification: '介護福祉士',
    year: '2020年取得',
    avatar: '👩',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)',
    facebook: 'https://www.facebook.com/oenthearin',
    instagram: 'https://www.instagram.com/oenthearin',
    features_key: ['feature1', 'feature2', 'feature3'],
    msg_key: 'thearin_msg',
    role_key: 'thearin_role',
    verified: true,
  },
];

export default function SenpaiPage() {
  const router = useRouter();
  const [lang, setLang] = useState('ja');
  const t = T[lang] || T.ja;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #fdf4ff 0%, #eef2ff 40%, #f0fdf4 100%)' }} className="pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">

        {/* 戻るボタン */}
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-500 mb-5 transition-colors">
          ← {t.back}
        </button>

        {/* 言語切替 */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={lang === l.code ? { background: '#6366f1', color: 'white', borderColor: '#6366f1' } : {}}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-600 transition-all">
              {l.flag} {l.name}
            </button>
          ))}
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌸</div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h1>
          <p className="text-sm text-indigo-500">{t.subtitle}</p>
        </div>

        {/* テーリンカード */}
        {SENPAI.map(s => (
          <div key={s.id} className="mb-6 rounded-3xl overflow-hidden shadow-lg border border-white"
            style={{ background: s.bg }}>

            {/* ヘッダー部分 */}
            <div className="p-5 pb-3">
              <div className="flex items-start gap-4">
                {/* アバター */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}44)`, border: `2px solid ${s.color}44` }}>
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-gray-800 text-base">{s.name}</h2>
                    {s.verified && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold"
                        style={{ background: s.color }}>✓ 認証済み</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{t[s.role_key]}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs bg-white rounded-full px-2 py-0.5 text-gray-600 border border-gray-100">{s.country}</span>
                    <span className="text-xs bg-white rounded-full px-2 py-0.5 text-gray-600 border border-gray-100">🏅 {s.qualification}</span>
                    <span className="text-xs bg-white rounded-full px-2 py-0.5 text-gray-600 border border-gray-100">📅 {s.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 特徴タグ */}
            <div className="px-5 pb-3 flex flex-col gap-1">
              {s.features_key.map((k, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs">{'⭐✨🎯'[i]}</span>
                  <span className="text-xs text-gray-600">{t[k]}</span>
                </div>
              ))}
            </div>

            {/* メッセージ */}
            <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm border border-white">
              <p className="text-xs font-bold mb-2" style={{ color: s.color }}>💌 {t.message_label}</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">「{t[s.msg_key]}」</p>
            </div>

            {/* ボタン */}
            <div className="px-4 pb-5 flex gap-2">
              <a href={s.facebook} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}bb)` }}>
                📘 {t.follow}
              </a>
              {s.instagram && (
                <a href={s.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #e1306c, #f77737)' }}>
                  📸 {t.watch}
                </a>
              )}
            </div>
          </div>
        ))}

        {/* 仲間募集セクション */}
        <div className="rounded-3xl p-5 text-center border-2 border-dashed border-indigo-200 bg-indigo-50">
          <div className="text-3xl mb-2">🙋</div>
          <p className="text-sm font-bold text-indigo-700 mb-1">{t.join}</p>
          <p className="text-xs text-indigo-400 mb-4">Coming soon...</p>
          <button className="bg-white border-2 border-indigo-200 text-indigo-600 font-bold text-sm px-6 py-2.5 rounded-2xl hover:bg-indigo-50 transition-colors opacity-60 cursor-not-allowed">
            {t.join_btn}
          </button>
        </div>

      </div>
    </div>
  );
}
