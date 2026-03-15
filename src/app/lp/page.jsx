'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const LP = {
  ja: {
    catch: '言葉の壁を越えて、\n介護の夢を叶えよう',
    catchSub: '日本で働く外国人介護士のための AI学習アプリ',
    cta: '無料で始める',
    ctaSub: 'クレジットカード不要・今すぐ使える',
    pain1: '専門の漢字が読めない…',
    pain2: '日本語が速くてわからない…',
    pain3: '介護記録が書けない…',
    painTitle: 'こんな悩みはありませんか？',
    solveTitle: '介護先生Proで全部解決！',
    s1title: 'AI介護記録アシスト',
    s1desc: '母国語で状況を入力するだけで、正しい日本語の介護記録文を自動生成。漢字の読み方も一緒に学べます。',
    s2title: '国家試験対策',
    s2desc: '介護福祉士試験の練習問題を母国語の解説付きで学習。ふりがな付きで漢字も安心。',
    s3title: 'AI会話ロールプレイ',
    s3desc: '介護現場のシチュエーションをAIと日本語で練習。マイクで話して音声でAIが答えます。',
    s4title: '8言語対応',
    s4desc: '日本語・インドネシア語・ベトナム語・フィリピン語・ミャンマー語・ベンガル語・ネパール語・クメール語に対応。',
    planTitle: 'シンプルな料金プラン',
    free: '無料プラン',
    freePrice: '¥0',
    freePeriod: '',
    freeFeatures: ['AI記録アシスト（1日10回）', '試験対策（1日5問）', '8言語対応'],
    pro: 'プロプラン',
    proPrice: '¥500',
    proPeriod: '/ 月',
    proFeatures: ['AI記録アシスト（無制限）', '試験対策（全問題）', 'ロールプレイ（全シナリオ）', '学習進捗保存'],
    couponTitle: '送り出し機関・介護施設の方へ',
    couponDesc: 'クーポンコードで無料開放できます。職員・研修生に配布してください。',
    couponBtn: 'お問い合わせ',
    missionTitle: '2%の約束',
    missionDesc: '売上の2%をアジアの子どもたちの教育支援に還元します。あなたが学ぶことが、故郷の次世代につながります。',
    missionLink: '理念を読む →',
    finalCta: '今すぐ無料で始める',
    finalCtaSub: '登録不要・すぐに使えます',
    lang8: '対応8言語',
    appName: '介護先生Pro',
  },
  id: {
    catch: 'Lampaui Hambatan Bahasa,\nWujudkan Impian Perawatan',
    catchSub: 'Aplikasi belajar AI untuk perawat asing yang bekerja di Jepang',
    cta: 'Mulai Gratis',
    ctaSub: 'Tidak perlu kartu kredit・Bisa langsung digunakan',
    pain1: 'Tidak bisa membaca kanji...',
    pain2: 'Bahasa Jepang terlalu cepat...',
    pain3: 'Tidak bisa menulis catatan perawatan...',
    painTitle: 'Apakah kamu mengalami masalah ini?',
    solveTitle: 'Selesaikan semuanya dengan Kaigo Sensei Pro!',
    s1title: 'Asisten Catatan AI',
    s1desc: 'Cukup masukkan situasi dalam bahasa sendiri, catatan perawatan Jepang yang benar dibuat otomatis. Bisa belajar cara baca kanji sekaligus.',
    s2title: 'Latihan Ujian Nasional',
    s2desc: 'Belajar soal ujian Kaigo Fukushishi dengan penjelasan dalam bahasa sendiri. Tenang dengan furigana.',
    s3title: 'Role Play AI',
    s3desc: 'Berlatih situasi perawatan dengan AI dalam bahasa Jepang. Bicara dengan mikrofon dan AI menjawab dengan suara.',
    s4title: '8 Bahasa Didukung',
    s4desc: 'Mendukung Jepang, Indonesia, Vietnam, Filipina, Myanmar, Bangladesh, Nepal, Kamboja.',
    planTitle: 'Paket Harga Sederhana',
    free: 'Paket Gratis',
    freePrice: '¥0',
    freePeriod: '',
    freeFeatures: ['Asisten catatan AI (10x/hari)', 'Latihan ujian (5 soal/hari)', '8 bahasa didukung'],
    pro: 'Paket Pro',
    proPrice: '¥500',
    proPeriod: '/ bulan',
    proFeatures: ['Asisten catatan AI (tidak terbatas)', 'Latihan ujian (semua soal)', 'Role play (semua skenario)', 'Simpan progres belajar'],
    couponTitle: 'Untuk lembaga pengirim & fasilitas perawatan',
    couponDesc: 'Bisa dibuka gratis dengan kode kupon. Silakan bagikan ke karyawan dan peserta pelatihan.',
    couponBtn: 'Hubungi Kami',
    missionTitle: 'Janji 2%',
    missionDesc: '2% pendapatan dikembalikan untuk mendukung pendidikan anak-anak Asia. Belajar kamu terhubung ke generasi berikutnya di kampung halaman.',
    missionLink: 'Baca misi kami →',
    finalCta: 'Mulai Gratis Sekarang',
    finalCtaSub: 'Tidak perlu daftar・Langsung bisa digunakan',
    lang8: '8 Bahasa Didukung',
    appName: 'Kaigo Sensei Pro',
  },
  vi: {
    catch: 'Vượt qua rào cản ngôn ngữ,\nThực hiện ước mơ chăm sóc',
    catchSub: 'Ứng dụng học AI cho điều dưỡng viên nước ngoài làm việc tại Nhật Bản',
    cta: 'Bắt đầu miễn phí',
    ctaSub: 'Không cần thẻ tín dụng・Dùng ngay',
    pain1: 'Không đọc được chữ kanji...',
    pain2: 'Tiếng Nhật quá nhanh...',
    pain3: 'Không viết được nhật ký chăm sóc...',
    painTitle: 'Bạn có gặp những vấn đề này không?',
    solveTitle: 'Giải quyết tất cả với Kaigo Sensei Pro!',
    s1title: 'Trợ lý ghi chép AI',
    s1desc: 'Chỉ cần nhập tình huống bằng tiếng mẹ đẻ, tự động tạo ghi chép chăm sóc tiếng Nhật chính xác. Học cách đọc kanji cùng lúc.',
    s2title: 'Luyện thi Quốc gia',
    s2desc: 'Học câu hỏi thi Kaigo Fukushishi với giải thích bằng tiếng mẹ đẻ. Yên tâm với furigana.',
    s3title: 'Hội thoại Role Play AI',
    s3desc: 'Luyện tình huống chăm sóc với AI bằng tiếng Nhật. Nói bằng micro và AI trả lời bằng giọng nói.',
    s4title: 'Hỗ trợ 8 ngôn ngữ',
    s4desc: 'Hỗ trợ Nhật, Indonesia, Việt Nam, Philippines, Myanmar, Bangladesh, Nepal, Campuchia.',
    planTitle: 'Gói giá đơn giản',
    free: 'Gói Miễn phí',
    freePrice: '¥0',
    freePeriod: '',
    freeFeatures: ['Trợ lý ghi chép AI (10 lần/ngày)', 'Luyện thi (5 câu/ngày)', 'Hỗ trợ 8 ngôn ngữ'],
    pro: 'Gói Pro',
    proPrice: '¥500',
    proPeriod: '/ tháng',
    proFeatures: ['Trợ lý ghi chép AI (không giới hạn)', 'Luyện thi (tất cả câu hỏi)', 'Role play (tất cả tình huống)', 'Lưu tiến độ học'],
    couponTitle: 'Dành cho tổ chức phái cử & cơ sở chăm sóc',
    couponDesc: 'Có thể mở miễn phí bằng mã coupon. Vui lòng phân phát cho nhân viên và học viên.',
    couponBtn: 'Liên hệ',
    missionTitle: 'Cam kết 2%',
    missionDesc: '2% doanh thu được trả lại để hỗ trợ giáo dục trẻ em châu Á. Việc học của bạn kết nối với thế hệ tiếp theo ở quê hương.',
    missionLink: 'Đọc sứ mệnh của chúng tôi →',
    finalCta: 'Bắt đầu miễn phí ngay',
    finalCtaSub: 'Không cần đăng ký・Dùng ngay',
    lang8: 'Hỗ trợ 8 ngôn ngữ',
    appName: 'Kaigo Sensei Pro',
  },
  tl: { catch: 'Lampasan ang Hadlang sa Wika,\nTupakin ang Pangarap sa Pag-aalaga', catchSub: 'AI learning app para sa dayuhang tagapag-alaga na nagtatrabaho sa Hapon', cta: 'Magsimula nang Libre', ctaSub: 'Hindi kailangan ng credit card・Magagamit na ngayon', pain1: 'Hindi mabasahin ang kanji...', pain2: 'Masyadong mabilis ang Japanese...', pain3: 'Hindi makapagsulat ng care record...', painTitle: 'Naranasan mo ba ang mga problemang ito?', solveTitle: 'Lutasin lahat gamit ang Kaigo Sensei Pro!', s1title: 'AI Record Assistant', s1desc: 'I-input lang ang sitwasyon sa sariling wika, awtomatikong gumawa ng tamang Japanese care record. Matuto rin ng pagbabasa ng kanji.', s2title: 'Pagsasanay sa Pambansang Pagsusulit', s2desc: 'Mag-aral ng mga tanong sa pagsusulit ng Kaigo Fukushishi na may paliwanag sa sariling wika.', s3title: 'AI Role Play', s3desc: 'Magsanay ng mga sitwasyon sa pag-aalaga kasama ang AI sa Japanese. Magsalita gamit ang mikrofono at sasagutin ng AI gamit ang boses.', s4title: '8 Wika ang Sinusuportahan', s4desc: 'Sinusuportahan ang Hapon, Indonesia, Vietnam, Pilipinas, Myanmar, Bangladesh, Nepal, Cambodia.', planTitle: 'Simpleng Mga Plano sa Presyo', free: 'Libreng Plano', freePrice: '¥0', freePeriod: '', freeFeatures: ['AI record assistant (10x/araw)', 'Pagsasanay sa pagsusulit (5 tanong/araw)', '8 wika ang sinusuportahan'], pro: 'Pro Plano', proPrice: '¥500', proPeriod: '/ buwan', proFeatures: ['AI record assistant (walang limitasyon)', 'Lahat ng tanong sa pagsusulit', 'Role play (lahat ng sitwasyon)', 'I-save ang progreso sa pag-aaral'], couponTitle: 'Para sa sending organization at care facility', couponDesc: 'Maaaring buksan nang libre gamit ang coupon code. Ipamahagi sa mga empleyado at trainee.', couponBtn: 'Makipag-ugnayan', missionTitle: 'Pangako ng 2%', missionDesc: '2% ng kita ay ibinalik para suportahan ang edukasyon ng mga batang Asyano.', missionLink: 'Basahin ang aming misyon →', finalCta: 'Magsimula nang Libre Ngayon', finalCtaSub: 'Hindi kailangan ng pagpaparehistro・Magagamit na', lang8: '8 Wika ang Sinusuportahan', appName: 'Kaigo Sensei Pro' },
  my: { catch: 'ဘာသာစကား အတားအဆီးကို ကျော်လွှားကာ\nစောင့်ရှောက်မှု အိပ်မက်ကို ဖြည့်ဆည်းပါ', catchSub: 'ဂျပန်တွင် လုပ်ကိုင်သော နိုင်ငံခြား စောင့်ရှောက်မှုဆရာများအတွက် AI သင်ယူမှု app', cta: 'အခမဲ့ စတင်ရန်', ctaSub: 'ကဒ်မလိုဘဲ ချက်ချင်းသုံးနိုင်သည်', pain1: 'Kanji မဖတ်နိုင်...', pain2: 'ဂျပန်ဘာသာ မြန်လွန်း...', pain3: 'စောင့်ရှောက်မှု မှတ်တမ်း မရေးနိုင်...', painTitle: 'ဤပြဿနာများ ကြုံဖူးပါသလား?', solveTitle: 'Kaigo Sensei Pro ဖြင့် အားလုံး ဖြေရှင်းပါ!', s1title: 'AI မှတ်တမ်း အကူ', s1desc: 'မိမိဘာသာဖြင့် အခြေအနေ ထည့်သွင်းလျှင် မှန်ကန်သော ဂျပန်ဘာသာ မှတ်တမ်း အလိုအလျောက် ဖန်တီးပေးသည်။', s2title: 'အမျိုးသားစာမေးပွဲ လေ့ကျင့်ရေး', s2desc: 'မိမိဘာသာ ရှင်းလင်းချက်ပါ Kaigo Fukushishi စာမေးပွဲ မေးခွန်းများ လေ့လာသည်။', s3title: 'AI Role Play', s3desc: 'AI နှင့် ဂျပန်ဘာသာဖြင့် စောင့်ရှောက်မှု အခြေအနေ လေ့ကျင့်သည်။ မိုက်ဖြင့် ပြောဆိုပြီး AI က အသံဖြင့် ဖြေဆိုသည်။', s4title: 'ဘာသာစကား ၈ မျိုး ပံ့ပိုး', s4desc: 'ဂျပန်၊ အင်ဒိုနီးရှား၊ ဗီယက်နမ်၊ ဖိလစ်ပိုင်၊ မြန်မာ၊ ဘင်္ဂလားဒေ့ရှ်၊ နီပေါ၊ ကမ္ဘောဒီးယားဘာသာများ ပံ့ပိုးသည်။', planTitle: 'ရိုးရှင်းသော စျေးနှုန်း အစီအစဉ်', free: 'အခမဲ့ အစီအစဉ်', freePrice: '¥0', freePeriod: '', freeFeatures: ['AI မှတ်တမ်း အကူ (တစ်နေ့ ၁၀ ကြိမ်)', 'စာမေးပွဲ လေ့ကျင့် (တစ်နေ့ ၅ မေးခွန်း)', 'ဘာသာ ၈ မျိုး'], pro: 'Pro အစီအစဉ်', proPrice: '¥500', proPeriod: '/ လ', proFeatures: ['AI မှတ်တမ်း အကူ (ကန့်သတ်မရှိ)', 'မေးခွန်း အားလုံး', 'Role play (scenario အားလုံး)', 'သင်ယူမှု တိုးတက်မှု သိမ်းဆည်း'], couponTitle: 'Sending organization နှင့် စောင့်ရှောက်မှု施設 အတွက်', couponDesc: 'Coupon code ဖြင့် အခမဲ့ ဖွင့်နိုင်သည်။ ဝန်ထမ်းများနှင့် လေ့ကျင့်သူများသို့ ဖြန့်ပေးပါ။', couponBtn: 'ဆက်သွယ်ရန်', missionTitle: '၂% ကတိ', missionDesc: 'ဝင်ငွေ ၂% ကို အာရှ ကလေးများ ပညာရေးကို ပြန်ပေးသည်။', missionLink: 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက် ဖတ်ပါ →', finalCta: 'ယခု အခမဲ့ စတင်ရန်', finalCtaSub: 'မှတ်ပုံတင်မလိုဘဲ ချက်ချင်းသုံးနိုင်သည်', lang8: 'ဘာသာ ၈ မျိုး', appName: 'Kaigo Sensei Pro' },
  bn: { catch: 'ভাষার বাধা অতিক্রম করুন,\nপরিচর্যার স্বপ্ন পূরণ করুন', catchSub: 'জাপানে কর্মরত বিদেশী পরিচর্যাকর্মীদের জন্য AI শিক্ষা অ্যাপ', cta: 'বিনামূল্যে শুরু করুন', ctaSub: 'ক্রেডিট কার্ড লাগবে না・এখনই ব্যবহার করুন', pain1: 'কাঞ্জি পড়তে পারি না...', pain2: 'জাপানি ভাষা খুব দ্রুত...', pain3: 'পরিচর্যা রেকর্ড লিখতে পারি না...', painTitle: 'আপনি কি এই সমস্যাগুলো অনুভব করেন?', solveTitle: 'Kaigo Sensei Pro দিয়ে সব সমাধান করুন!', s1title: 'AI রেকর্ড সহায়তা', s1desc: 'নিজের ভাষায় পরিস্থিতি ইনপুট করলেই সঠিক জাপানি পরিচর্যা রেকর্ড স্বয়ংক্রিয়ভাবে তৈরি হয়।', s2title: 'জাতীয় পরীক্ষার অনুশীলন', s2desc: 'নিজের ভাষায় ব্যাখ্যাসহ Kaigo Fukushishi পরীক্ষার প্রশ্ন শিখুন।', s3title: 'AI রোল প্লে', s3desc: 'AI-এর সাথে জাপানি ভাষায় পরিচর্যার পরিস্থিতি অনুশীলন করুন।', s4title: '৮ ভাষা সমর্থিত', s4desc: 'জাপানি, ইন্দোনেশিয়ান, ভিয়েতনামী, ফিলিপিনো, মিয়ানমার, বাংলা, নেপালি, খমের সমর্থিত।', planTitle: 'সহজ মূল্য পরিকল্পনা', free: 'বিনামূল্যে পরিকল্পনা', freePrice: '¥0', freePeriod: '', freeFeatures: ['AI রেকর্ড সহায়তা (দিনে ১০ বার)', 'পরীক্ষা অনুশীলন (দিনে ৫ প্রশ্ন)', '৮ ভাষা সমর্থিত'], pro: 'প্রো পরিকল্পনা', proPrice: '¥500', proPeriod: '/ মাস', proFeatures: ['AI রেকর্ড সহায়তা (সীমাহীন)', 'সব পরীক্ষার প্রশ্ন', 'রোল প্লে (সব পরিস্থিতি)', 'শেখার অগ্রগতি সংরক্ষণ'], couponTitle: 'প্রেরণ সংস্থা ও পরিচর্যা কেন্দ্রের জন্য', couponDesc: 'কুপন কোড দিয়ে বিনামূল্যে খোলা যাবে। কর্মচারী ও প্রশিক্ষণার্থীদের বিতরণ করুন।', couponBtn: 'যোগাযোগ করুন', missionTitle: '২% প্রতিশ্রুতি', missionDesc: 'আয়ের ২% এশিয়ার শিশুদের শিক্ষায় ফিরিয়ে দেওয়া হয়।', missionLink: 'আমাদের লক্ষ্য পড়ুন →', finalCta: 'এখনই বিনামূল্যে শুরু করুন', finalCtaSub: 'নিবন্ধন লাগবে না・এখনই ব্যবহার করুন', lang8: '৮ ভাষা সমর্থিত', appName: 'Kaigo Sensei Pro' },
  ne: { catch: 'भाषाको बाधा पार गर्नुहोस्,\nपरिचर्याको सपना पूरा गर्नुहोस्', catchSub: 'जापानमा काम गर्ने विदेशी परिचर्या कर्मचारीहरूको लागि AI सिकाइ एप', cta: 'निःशुल्क सुरु गर्नुहोस्', ctaSub: 'क्रेडिट कार्ड चाहिँदैन・अहिले नै प्रयोग गर्न सकिन्छ', pain1: 'कान्जी पढ्न सक्दिनँ...', pain2: 'जापानी भाषा धेरै छिटो छ...', pain3: 'परिचर्या रेकर्ड लेख्न सक्दिनँ...', painTitle: 'के तपाईंलाई यी समस्याहरू छन्?', solveTitle: 'Kaigo Sensei Pro ले सबै समाधान गर्छ!', s1title: 'AI रेकर्ड सहायक', s1desc: 'आफ्नै भाषामा अवस्था इनपुट गर्दा सही जापानी परिचर्या रेकर्ड स्वतः बनाउँछ।', s2title: 'राष्ट्रिय परीक्षा अभ्यास', s2desc: 'आफ्नै भाषामा व्याख्यासहित Kaigo Fukushishi परीक्षाका प्रश्नहरू सिक्नुहोस्।', s3title: 'AI रोल प्ले', s3desc: 'AI सँग जापानी भाषामा परिचर्या अवस्थाको अभ्यास गर्नुहोस्।', s4title: '८ भाषा समर्थित', s4desc: 'जापानी, इन्डोनेसियाली, भियतनामी, फिलिपिनो, म्यानमारी, बाङ्गाली, नेपाली, खमेर समर्थित।', planTitle: 'सरल मूल्य योजना', free: 'निःशुल्क योजना', freePrice: '¥0', freePeriod: '', freeFeatures: ['AI रेकर्ड सहायक (दिनमा १० पटक)', 'परीक्षा अभ्यास (दिनमा ५ प्रश्न)', '८ भाषा समर्थित'], pro: 'प्रो योजना', proPrice: '¥500', proPeriod: '/ महिना', proFeatures: ['AI रेकर्ड सहायक (असीमित)', 'सबै परीक्षा प्रश्नहरू', 'रोल प्ले (सबै परिदृश्य)', 'सिकाइ प्रगति बचत'], couponTitle: 'पठाउने संस्था र परिचर्या सुविधाका लागि', couponDesc: 'कुपन कोडले निःशुल्क खोल्न सकिन्छ। कर्मचारी र प्रशिक्षुहरूलाई वितरण गर्नुहोस्।', couponBtn: 'सम्पर्क गर्नुहोस्', missionTitle: '२% को वाचा', missionDesc: 'आम्दानीको २% एसियाका बालबालिकाको शिक्षामा फिर्ता गरिन्छ।', missionLink: 'हाम्रो लक्ष्य पढ्नुहोस् →', finalCta: 'अहिले नै निःशुल्क सुरु गर्नुहोस्', finalCtaSub: 'दर्ता गर्नु पर्दैन・अहिले नै प्रयोग गर्न सकिन्छ', lang8: '८ भाषा समर्थित', appName: 'Kaigo Sensei Pro' },
  km: { catch: 'ឆ្លងកាត់របាំងភាសា,\nសម្រេចសុបិន្តការថែទាំ', catchSub: 'កម្មវិធីរៀន AI សម្រាប់អ្នកថែទាំជនបរទេសធ្វើការនៅជប៉ុន', cta: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃ', ctaSub: 'មិនត្រូវការប័ណ្ណឥណទាន・ប្រើបានភ្លាម', pain1: 'មិនអាចអានអក្សរ kanji...', pain2: 'ភាសាជប៉ុនលឿនពេក...', pain3: 'មិនអាចសរសេរកំណត់ត្រាការថែទាំ...', painTitle: 'តើអ្នកជួបបញ្ហាទាំងនេះទេ?', solveTitle: 'ដោះស្រាយទាំងអស់ជាមួយ Kaigo Sensei Pro!', s1title: 'ជំនួយការកត់ត្រា AI', s1desc: 'គ្រាន់តែបញ្ចូលស្ថានភាពជាភាសារបស់ខ្លួន កំណត់ត្រាការថែទាំជាភាសាជប៉ុនត្រឹមត្រូវត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិ។', s2title: 'ហាត់ប្រឡងជាតិ', s2desc: 'រៀនសំណួរប្រឡង Kaigo Fukushishi ជាមួយការពន្យល់ជាភាសារបស់ខ្លួន។', s3title: 'AI Role Play', s3desc: 'ហាត់ស្ថានភាពការថែទាំជាមួយ AI ជាភាសាជប៉ុន។ និយាយតាមមីក្រូហ្វូន ហើយ AI ឆ្លើយតបតាមសំឡេង។', s4title: 'គាំទ្រ ៨ ភាសា', s4desc: 'គាំទ្រភាសាជប៉ុន ឥណ្ឌូនេស៊ី វៀតណាម ហ្វីលីពីន មីយ៉ាន់ម៉ា បង់ក្លាដែស នេប៉ាល់ ខ្មែរ។', planTitle: 'គម្រោងតម្លៃដ៏សាមញ្ញ', free: 'គម្រោងឥតគិតថ្លៃ', freePrice: '¥0', freePeriod: '', freeFeatures: ['ជំនួយការកត់ត្រា AI (១០ដង/ថ្ងៃ)', 'ហាត់ប្រឡង (៥សំណួរ/ថ្ងៃ)', 'គាំទ្រ ៨ ភាសា'], pro: 'គម្រោង Pro', proPrice: '¥500', proPeriod: '/ ខែ', proFeatures: ['ជំនួយការកត់ត្រា AI (គ្មានដែនកំណត់)', 'សំណួរប្រឡងទាំងអស់', 'Role play (ស្ថានភាពទាំងអស់)', 'រក្សាទុកវឌ្ឍនភាពការសិក្សា'], couponTitle: 'សម្រាប់អង្គការបញ្ជូន និងមណ្ឌលថែទាំ', couponDesc: 'អាចបើកដោយឥតគិតថ្លៃជាមួយលេខកូដគូប៉ុង។ សូមចែកចាយដល់បុគ្គលិក និងអ្នកហ្វឹកហ្វឺន។', couponBtn: 'ទាក់ទង', missionTitle: 'សន្យា ២%', missionDesc: '២% នៃប្រាក់ចំណូលត្រូវបានប្រគល់ជូនដើម្បីគាំទ្រការអប់រំកុមារអាស៊ី។', missionLink: 'អានបេសកកម្មរបស់យើង →', finalCta: 'ចាប់ផ្តើមដោយឥតគិតថ្លៃឥឡូវ', finalCtaSub: 'មិនត្រូវការចុះឈ្មោះ・ប្រើបានភ្លាម', lang8: 'គាំទ្រ ៨ ភាសា', appName: 'Kaigo Sensei Pro' },
};

export default function LPPage() {
  const router = useRouter();
  const { lang } = useLang();
  const lp = LP[lang] || LP['ja'];

  return (
    <div className="min-h-screen bg-white">
      {/* ナビ */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-green-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 font-bold text-green-700 text-lg">
          <span className="text-2xl">🏥</span>
          <span>{lp.appName}</span>
        </button>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors">
            {lp.cta}
          </button>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-500 text-white py-20 px-4 text-center">
        <div className="flex justify-center gap-1 text-3xl mb-6 flex-wrap">
          {['🇯🇵','🇮🇩','🇻🇳','🇵🇭','🇲🇲','🇧🇩','🇳🇵','🇰🇭'].map((f,i) => <span key={i}>{f}</span>)}
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight whitespace-pre-line">{lp.catch}</h1>
        <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">{lp.catchSub}</p>
        <button onClick={() => router.push('/')}
          className="bg-white text-green-700 font-extrabold text-xl px-12 py-5 rounded-full shadow-xl hover:scale-105 transition-transform">
          🚀 {lp.cta}
        </button>
        <p className="mt-3 text-green-200 text-sm">{lp.ctaSub}</p>
        <div className="mt-6 inline-block bg-white/20 rounded-full px-4 py-2 text-sm">✅ {lp.lang8}</div>
      </section>

      {/* 悩み */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">{lp.painTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[lp.pain1, lp.pain2, lp.pain3].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
                <div className="text-3xl mb-3">😔</div>
                <p className="text-gray-700 font-semibold">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 解決策 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">{lp.solveTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '📝', title: lp.s1title, desc: lp.s1desc, color: 'border-green-200 bg-green-50' },
              { icon: '📚', title: lp.s2title, desc: lp.s2desc, color: 'border-blue-200 bg-blue-50' },
              { icon: '🤖', title: lp.s3title, desc: lp.s3desc, color: 'border-purple-200 bg-purple-50' },
              { icon: '🌏', title: lp.s4title, desc: lp.s4desc, color: 'border-yellow-200 bg-yellow-50' },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl border ${s.color} p-6`}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">{lp.planTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { key: 'free', title: lp.free, price: lp.freePrice, period: lp.freePeriod, features: lp.freeFeatures, color: 'border-gray-200', btn: 'bg-gray-600 hover:bg-gray-700' },
              { key: 'pro', title: lp.pro, price: lp.proPrice, period: lp.proPeriod, features: lp.proFeatures, color: 'border-green-400 ring-2 ring-green-300', btn: 'bg-green-600 hover:bg-green-700' },
            ].map((plan, i) => (
              <div key={i} className={`bg-white rounded-2xl border ${plan.color} p-6 shadow-sm`}>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-gray-800">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push('/')}
                  className={`w-full ${plan.btn} text-white font-bold py-2.5 rounded-xl text-sm transition-colors`}>
                  {lp.cta}
                </button>
              </div>
            ))}
          </div>

          {/* クーポン */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-yellow-800 mb-2">🎟️ {lp.couponTitle}</h3>
            <p className="text-yellow-700 text-sm mb-4">{lp.couponDesc}</p>
            <button onClick={() => router.push('/plan')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-full text-sm transition-colors">
              {lp.couponBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 理念 */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">💚</div>
          <h2 className="text-2xl font-bold mb-4">{lp.missionTitle}</h2>
          <p className="text-green-100 leading-relaxed mb-6">{lp.missionDesc}</p>
          <button onClick={() => router.push('/mission')}
            className="text-white border border-white/50 hover:bg-white/20 px-6 py-2 rounded-full text-sm transition-colors">
            {lp.missionLink}
          </button>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{lp.finalCta}</h2>
        <p className="text-gray-500 mb-8">{lp.finalCtaSub}</p>
        <button onClick={() => router.push('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-xl px-12 py-5 rounded-full shadow-xl hover:scale-105 transition-transform">
          {lp.cta}
        </button>
      </section>
    </div>
  );
}
