'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    follow: 'Facebookをフォロー',
    instagram: 'Instagramを見る',
    back: 'トップへ戻る',
    msg: 'カンボジアから日本に来て、言葉も文化も全然違って、最初はとても不安でした。でも、介護の仕事を通じて、人の温かさをたくさん知ることができました。今度はみなさんの番です。一緒に頑張りましょう！',
    role: '介護福祉士 / SNSクリエイター',
    f1: 'SNSで日本語と介護について毎日発信中',
    f2: 'フォロワー5,466人の頼れる先輩',
    f3: '「介護と日本語 With Thearin」',
    join: 'あなたも先輩として仲間を励ましませんか？',
    join_soon: '準備中',
    location: '神奈川県在住',
    from: 'カンボジア出身',
  },
  id: {
    title: 'Pesan dari Para Senior',
    subtitle: 'Ada teman yang sudah berjalan di jalan ini sebelum kamu',
    follow: 'Ikuti di Facebook',
    instagram: 'Lihat Instagram',
    back: 'Kembali ke beranda',
    msg: 'Saya datang dari Kamboja ke Jepang, bahasa dan budayanya sangat berbeda, awalnya sangat khawatir. Tapi melalui pekerjaan perawatan, saya mengenal kehangatan manusia. Sekarang giliran kalian. Ayo berjuang bersama!',
    role: 'Perawat Sosial / Kreator SNS',
    f1: 'Aktif posting di SNS tentang bahasa Jepang & perawatan',
    f2: '5.466 pengikut, senior yang bisa diandalkan',
    f3: '"Perawatan dan Bahasa Jepang With Thearin"',
    join: 'Mau jadi senior dan semangati teman-teman?',
    join_soon: 'Segera hadir',
    location: 'Tinggal di Kanagawa',
    from: 'Asal Kamboja',
  },
  vi: {
    title: 'Lời Nhắn Từ Các Đàn Anh Chị',
    subtitle: 'Có người đã đi con đường này trước bạn',
    follow: 'Follow trên Facebook',
    instagram: 'Xem Instagram',
    back: 'Quay về trang chủ',
    msg: 'Tôi đến Nhật từ Campuchia, ngôn ngữ và văn hóa rất khác, lúc đầu rất lo lắng. Nhưng qua công việc chăm sóc, tôi biết được sự ấm áp của con người. Bây giờ đến lượt các bạn. Hãy cùng cố gắng!',
    role: 'Nhân viên phúc lợi / Người sáng tạo nội dung',
    f1: 'Chia sẻ hàng ngày về tiếng Nhật & nghề chăm sóc',
    f2: '5.466 người theo dõi, đàn chị đáng tin cậy',
    f3: '"Chăm sóc và Tiếng Nhật With Thearin"',
    join: 'Bạn cũng muốn trở thành đàn chị/anh động viên mọi người?',
    join_soon: 'Sắp ra mắt',
    location: 'Sống tại Kanagawa',
    from: 'Quê hương Campuchia',
  },
  tl: {
    title: 'Mensahe mula sa mga Nauna',
    subtitle: 'May mga kasamahan na naglakad sa landas na ito bago ka',
    follow: 'I-follow sa Facebook',
    instagram: 'Tingnan ang Instagram',
    back: 'Bumalik sa homepage',
    msg: 'Nanggaling ako sa Cambodia patungong Japan, napaka-iba ng wika at kultura, noong una ay takot na takot ako. Ngunit sa pamamagitan ng trabahong pang-alaga, natutunan ko ang init ng puso ng tao. Ngayon ay ikaw na. Sama-sama tayong magsikap!',
    role: 'Karero sa Welfare / SNS Creator',
    f1: 'Nagpo-post araw-araw sa SNS tungkol sa Japanese at pangangalaga',
    f2: '5,466 followers, mapagkakatiwalaang senior',
    f3: '"Pangangalaga at Japanese With Thearin"',
    join: 'Gusto mo ring maging senior at bigyan ng lakas ang mga kaibigan?',
    join_soon: 'Paparating na',
    location: 'Nakatira sa Kanagawa',
    from: 'Taga-Cambodia',
  },
  km: {
    title: 'សារពីបងៗ',
    subtitle: 'មានមិត្តភ័ក្ដិដែលបានដើរនៅលើផ្លូវនេះមុនអ្នក',
    follow: 'តាមដាននៅ Facebook',
    instagram: 'មើល Instagram',
    back: 'ត្រឡប់ទៅទំព័រដើម',
    msg: 'ខ្ញុំបានមកប្រទេសជប៉ុនពីប្រទេសកម្ពុជា ភាសា និងវប្បធម៌ខុសគ្នា ដំបូងខ្ញុំភ័យខ្លាំងណាស់។ ប៉ុន្តែតាមរយៈការងារថែទាំ ខ្ញុំបានដឹងពីភាពកក់ក្ដៅ។ ឥឡូវជាវេនអ្នក។ តោះព្យាយាមជាមួយគ្នា!',
    role: 'អ្នកថែទាំសង្គម / អ្នកបង្កើតមាតិកា',
    f1: 'ប្រកាសប្រចាំថ្ងៃនៅ SNS អំពីភាសាជប៉ុននិងការថែទាំ',
    f2: 'អ្នកតាម 5,466 នាក់ បងស្រីដ៏ជឿទុកចិត្ត',
    f3: '"ការថែទាំ និងភាសាជប៉ុន With Thearin"',
    join: 'តើអ្នកចង់ក្លាយជាបងចាស់ និងជំរុញមិត្តភ័ក្ដិទេ?',
    join_soon: 'មកដល់ឆាប់ៗ',
    location: 'រស់នៅ Kanagawa',
    from: 'កំណើតនៅកម្ពុជា',
  },
  my: {
    title: 'အကြီးများ၏ မက်ဆေ့ချ်',
    subtitle: 'ဤလမ်းကို သင်မတိုင်မီ လျှောက်ခဲ့သော မိတ်ဆွေများ ရှိသည်',
    follow: 'Facebook တွင် Follow လုပ်',
    instagram: 'Instagram ကြည့်',
    back: 'ပင်မစာမျက်နှာ',
    msg: 'ကမ္ဘောဒီးယားမှ ဂျပန်သို့လာခဲ့ပြီး ဘာသာစကားနှင့် ယဉ်ကျေးမှု ကွာခြားသဖြင့် အစပိုင်းတွင် ပူပင်ခဲ့သည်။ သို့သော် ပြုစုစောင့်ရှောက်မှုအလုပ်မှတစ်ဆင့် လူသားတို့၏ နွေးထွေးမှုကို ခံစားနိုင်ခဲ့သည်။ ယခု သင်တို့အလှည့်ဖြစ်သည်။ အတူတကွ ကြိုးစားကြစို့!',
    role: 'လူမှုဖူလုံရေး / SNS ဖန်တီးသူ',
    f1: 'ဂျပန်ဘာသာနှင့် ပြုစုစောင့်ရှောက်မှုအကြောင်း နေ့တိုင်း SNS တွင် မျှဝေ',
    f2: 'Followers 5,466 ယုံကြည်ရသောအကြီး',
    f3: '"ပြုစုစောင့်ရှောက်မှုနှင့်ဂျပန်ဘာသာ With Thearin"',
    join: 'သင်လည်း အကြီးအဖြစ် မိတ်ဆွေများကို အားပေးချင်သလား?',
    join_soon: 'မကြာမီရောက်မည်',
    location: 'Kanagawa တွင်နေထိုင်',
    from: 'ကမ္ဘောဒီးယားမှ',
  },
  bn: {
    title: 'সিনিয়রদের বার্তা',
    subtitle: 'আপনার আগে এই পথে হেঁটেছেন এমন বন্ধু আছে',
    follow: 'Facebook-এ ফলো করুন',
    instagram: 'Instagram দেখুন',
    back: 'হোমে ফিরুন',
    msg: 'আমি কম্বোডিয়া থেকে জাপানে এসেছি, ভাষা ও সংস্কৃতি অনেক আলাদা, শুরুতে খুব ভয় পেয়েছিলাম। কিন্তু যত্নের কাজের মাধ্যমে মানুষের উষ্ণতা জানতে পেরেছি। এখন আপনাদের পালা। একসাথে চেষ্টা করি!',
    role: 'সমাজকল্যাণ কর্মী / SNS ক্রিয়েটর',
    f1: 'প্রতিদিন SNS-এ জাপানি ভাষা ও যত্ন নিয়ে পোস্ট করেন',
    f2: '৫,৪৬৬ ফলোয়ারের বিশ্বস্ত সিনিয়র',
    f3: '"যত্ন ও জাপানি ভাষা With Thearin"',
    join: 'আপনিও সিনিয়র হিসেবে বন্ধুদের অনুপ্রাণিত করতে চান?',
    join_soon: 'শীঘ্রই আসছে',
    location: 'কানাগাওয়ায় বসবাস',
    from: 'কম্বোডিয়া থেকে',
  },
  ne: {
    title: 'सिनियरहरूको सन्देश',
    subtitle: 'यो बाटोमा तपाईंभन्दा पहिले हिँडेका साथीहरू छन्',
    follow: 'Facebook मा फलो गर्नुस्',
    instagram: 'Instagram हेर्नुस्',
    back: 'होमपेजमा फर्कनुस्',
    msg: 'म कम्बोडियाबाट जापान आएँ, भाषा र संस्कृति धेरै फरक थियो, सुरुमा धेरै डर लाग्यो। तर हेरचाहको काम मार्फत मानिसहरूको न्यानो महसुस गर्न पाएँ। अब तपाईंहरूको पालो छ। सँगै कोसिस गरौं!',
    role: 'समाजकल्याण कार्यकर्ता / SNS सिर्जनाकर्ता',
    f1: 'प्रतिदिन SNS मा जापानी भाषा र हेरचाहबारे साझा गर्नुहुन्छ',
    f2: '५,४६६ फलोअर भएका भरपर्दो सिनियर',
    f3: '"हेरचाह र जापानी भाषा With Thearin"',
    join: 'तपाईं पनि सिनियर भएर साथीहरूलाई प्रोत्साहन दिन चाहनुहुन्छ?',
    join_soon: 'चाँडै आउँदैछ',
    location: 'Kanagawa मा बसोबास',
    from: 'कम्बोडियाबाट',
  },
};

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
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🌸</div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h1>
          <p className="text-sm text-indigo-500">{t.subtitle}</p>
        </div>

        {/* テーリンカード */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-white mb-6"
          style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fdf4ff 100%)' }}>

          {/* 写真ヘッダー */}
          <div className="relative h-36 overflow-hidden" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="absolute bottom-0 left-0 right-0 h-16"
              style={{ background: 'linear-gradient(to top, #eef2ff, transparent)' }} />
          </div>

          {/* プロフィール */}
          <div className="px-5 pb-2 -mt-12 relative">
            <div className="flex items-end gap-4 mb-3">
              {/* 写真 */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <Image
                  src="/thearin.png"
                  alt="Oen Thearin"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-gray-800 text-lg">Oen Thearin</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold bg-indigo-500">✓</span>
                </div>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>

            {/* タグ */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-xs bg-white rounded-full px-2.5 py-1 text-gray-600 border border-gray-100 shadow-sm">🇰🇭 {t.from}</span>
              <span className="text-xs bg-white rounded-full px-2.5 py-1 text-gray-600 border border-gray-100 shadow-sm">📍 {t.location}</span>
              <span className="text-xs bg-white rounded-full px-2.5 py-1 text-gray-600 border border-gray-100 shadow-sm">🏅 介護福祉士</span>
            </div>

            {/* 特徴 */}
            <div className="space-y-1.5 mb-4">
              {[t.f1, t.f2, t.f3].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{'⭐✨🎯'[i]}</span>
                  <span className="text-xs text-gray-600">{f}</span>
                </div>
              ))}
            </div>

            {/* メッセージ */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100 mb-4">
              <p className="text-xs font-bold text-indigo-600 mb-2">💌 メッセージ</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">「{t.msg}」</p>
            </div>

            {/* ボタン */}
            <div className="flex gap-2 pb-5">
              <a href="https://www.facebook.com/thearin.oenthearin" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #1877f2, #0d6efd)' }}>
                📘 {t.follow}
              </a>
              <a href="https://www.instagram.com/oenthearin" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #e1306c, #f77737)' }}>
                📸 {t.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* 仲間募集 */}
        <div className="rounded-3xl p-5 text-center border-2 border-dashed border-indigo-200 bg-indigo-50">
          <div className="text-3xl mb-2">🙋</div>
          <p className="text-sm font-bold text-indigo-700 mb-1">{t.join}</p>
          <p className="text-xs text-indigo-400">{t.join_soon}...</p>
        </div>

      </div>
    </div>
  );
}
