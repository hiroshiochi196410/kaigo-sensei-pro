'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';

const MT = {
  ja: {
    hero: '夢の架け橋',
    heroSub: 'アジアと日本をつなぐ',
    heroDesc: '言葉の壁を越えて、アジアの若者が日本で夢を叶える。そしてその経験が、故郷の次世代へとつながっていく。',
    bridge: '介護先生Pro が繋ぐ',
    v1: 'お金で諦めさせない',
    v1d: '学ぶ意欲がある人が、経済的な理由だけで夢を諦めることのないよう、無料プランと送り出し機関向けクーポンで誰でも使えるアプリを目指します。',
    v2: '2%の約束',
    v2d: '売上の2%をアジアの子どもたちの教育支援に還元します。介護士として働くことが、故郷の次世代の教育につながる循環を作ります。',
    v3: '共に育つ',
    v3d: '日本の介護業界の人手不足を解消しながら、アジアの若者が日本で活躍できる環境を作る。双方にとってプラスになる共生を目指します。',
    cycle: '夢がつながる循環',
    c1: '母国語で介護を学ぶ', c2: '日本で活躍する', c3: '家族に仕送りする', c4: '故郷の子が学校へ', c5: '次世代につながる',
    msgTitle: '創設者より',
    msg: 'バックオフィス業務を長年経験してきた私が、Facebookを通じてアジアの介護士の卵たちと出会いました。「専門の漢字がわからない」「日本語が早くてわからない」「記録が書けない」という声を聞き、このアプリを作ることを決めました。\n\n言葉の壁は、乗り越えられます。テクノロジーとAIの力で、アジアと日本の架け橋を作りたい。それが私の夢です。',
    founder: '越智 宏志 / アイプルーフ',
    cta: '🚀 学習をはじめる',
    ctaSub: '無料プランでいますぐ始められます',
    back: 'トップへ戻る',
  },
  id: {
    hero: 'Jembatan Impian',
    heroSub: 'Menghubungkan Asia dan Jepang',
    heroDesc: 'Melampaui hambatan bahasa, pemuda Asia mewujudkan impian mereka di Jepang. Pengalaman itu kemudian terhubung ke generasi berikutnya di kampung halaman.',
    bridge: 'Kaigo Sensei Pro menghubungkan',
    v1: 'Jangan Menyerah karena Uang',
    v1d: 'Agar mereka yang ingin belajar tidak menyerah hanya karena alasan ekonomi, kami menyediakan paket gratis dan kupon untuk lembaga pengirim.',
    v2: 'Janji 2%',
    v2d: '2% dari pendapatan dikembalikan untuk mendukung pendidikan anak-anak Asia. Bekerja sebagai perawat menciptakan siklus yang terhubung ke pendidikan generasi berikutnya.',
    v3: 'Tumbuh Bersama',
    v3d: 'Sambil mengatasi kekurangan tenaga di industri perawatan Jepang, kami menciptakan lingkungan di mana pemuda Asia dapat berkembang di Jepang.',
    cycle: 'Siklus Impian yang Terhubung',
    c1: 'Belajar perawatan dalam bahasa sendiri', c2: 'Aktif di Jepang', c3: 'Kirim uang ke keluarga', c4: 'Anak kampung halaman sekolah', c5: 'Terhubung ke generasi berikutnya',
    msgTitle: 'Dari Pendiri',
    msg: 'Saya bertemu dengan calon perawat Asia melalui Facebook. Mendengar suara mereka: "Tidak bisa membaca kanji", "Bahasa Jepang terlalu cepat", "Tidak bisa menulis catatan" - saya memutuskan untuk membuat aplikasi ini.\n\nHambatan bahasa bisa diatasi. Dengan kekuatan teknologi dan AI, saya ingin membangun jembatan antara Asia dan Jepang. Itulah impian saya.',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 Mulai Belajar',
    ctaSub: 'Bisa dimulai sekarang dengan paket gratis',
    back: 'Kembali ke Atas',
  },
  vi: {
    hero: 'Cây cầu của những ước mơ',
    heroSub: 'Kết nối châu Á và Nhật Bản',
    heroDesc: 'Vượt qua rào cản ngôn ngữ, những người trẻ châu Á thực hiện ước mơ tại Nhật Bản. Và những trải nghiệm đó kết nối với thế hệ tiếp theo ở quê hương.',
    bridge: 'Kaigo Sensei Pro kết nối',
    v1: 'Đừng từ bỏ vì tiền',
    v1d: 'Để những người có ý chí học tập không từ bỏ chỉ vì lý do kinh tế, chúng tôi cung cấp gói miễn phí và coupon cho các tổ chức phái cử.',
    v2: 'Cam kết 2%',
    v2d: '2% doanh thu được hoàn trả để hỗ trợ giáo dục cho trẻ em châu Á. Làm việc như một người chăm sóc tạo ra chu kỳ kết nối với giáo dục thế hệ tiếp theo.',
    v3: 'Cùng phát triển',
    v3d: 'Vừa giải quyết tình trạng thiếu nhân lực trong ngành chăm sóc Nhật Bản, vừa tạo môi trường để người trẻ châu Á phát triển tại Nhật Bản.',
    cycle: 'Chu kỳ ước mơ kết nối',
    c1: 'Học chăm sóc bằng tiếng mẹ đẻ', c2: 'Hoạt động tại Nhật Bản', c3: 'Gửi tiền về gia đình', c4: 'Con em quê hương đến trường', c5: 'Kết nối thế hệ tiếp theo',
    msgTitle: 'Từ người sáng lập',
    msg: 'Tôi đã gặp những người trẻ châu Á đang học để trở thành người chăm sóc qua Facebook. Nghe tiếng nói của họ: "Không đọc được kanji", "Tiếng Nhật quá nhanh", "Không viết được nhật ký" - tôi quyết định tạo ra ứng dụng này.\n\nRào cản ngôn ngữ có thể vượt qua. Với sức mạnh của công nghệ và AI, tôi muốn xây dựng cây cầu giữa châu Á và Nhật Bản. Đó là ước mơ của tôi.',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 Bắt đầu học',
    ctaSub: 'Có thể bắt đầu ngay với gói miễn phí',
    back: 'Về trang đầu',
  },
  tl: {
    hero: 'Tulay ng mga Pangarap',
    heroSub: 'Nag-uugnay ng Asya at Hapon',
    heroDesc: 'Sa paglagpas ng hadlang sa wika, ang mga kabataang Asyano ay natutupad ang kanilang mga pangarap sa Hapon. At ang karanasang iyon ay kumonekta sa susunod na henerasyon sa kanilang tinubuang-lupa.',
    bridge: 'Iniuugnay ng Kaigo Sensei Pro',
    v1: 'Huwag Sumuko dahil sa Pera',
    v1d: 'Para ang mga nais matuto ay hindi susuko dahil lang sa dahilang pang-ekonomiya, nagbibigay kami ng libreng plano at coupon para sa mga sending organization.',
    v2: 'Pangako ng 2%',
    v2d: '2% ng kita ay ibinalik para suportahan ang edukasyon ng mga batang Asyano. Ang pagtrabaho bilang tagapag-alaga ay lumilikha ng siklo na konektado sa edukasyon ng susunod na henerasyon.',
    v3: 'Lumalaki nang Magkasama',
    v3d: 'Habang nireresolta ang kakulangan ng manggagawa sa industriya ng pag-aalaga sa Hapon, lumilikha ng kapaligiran kung saan maaaring umunlad ang mga kabataang Asyano sa Hapon.',
    cycle: 'Ikot ng Mga Pangarap na Konektado',
    c1: 'Matuto ng pag-aalaga sa sariling wika', c2: 'Maging aktibo sa Hapon', c3: 'Magpadala ng pera sa pamilya', c4: 'Mga bata sa tinubuang-lupa pumunta sa paaralan', c5: 'Kumonekta sa susunod na henerasyon',
    msgTitle: 'Mula sa Tagapagtatag',
    msg: 'Nakilala ko ang mga kabataang Asyano na nag-aaral para maging tagapag-alaga sa pamamagitan ng Facebook. Naririnig ko ang kanilang mga boses: "Hindi mabasahin ang kanji", "Masyadong mabilis ang Japanese", "Hindi makapagsulat ng rekord" - nagpasya akong gumawa ng app na ito.\n\nAng hadlang sa wika ay maaaring malampasan. Sa kapangyarihan ng teknolohiya at AI, nais kong bumuo ng tulay sa pagitan ng Asya at Hapon. Iyon ang aking pangarap.',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 Simulan ang Pag-aaral',
    ctaSub: 'Maaaring magsimula ngayon sa libreng plano',
    back: 'Bumalik sa Itaas',
  },
  my: {
    hero: 'အိပ်မက်တံတား',
    heroSub: 'အာရှနှင့် ဂျပန်ကို ချိတ်ဆက်သည်',
    heroDesc: 'ဘာသာစကား အတားအဆီးကို ကျော်လွှားကာ အာရှ လူငယ်များသည် ဂျပန်တွင် မိမိတို့၏ အိပ်မက်ကို ဖြည့်ဆည်းကြသည်။ ထိုအတွေ့အကြုံသည် မိမိ မွေးရပ်မြေ၏ နောက်မျိုးဆက်သို့ ဆက်သွယ်သည်။',
    bridge: 'Kaigo Sensei Pro ချိတ်ဆက်သည်',
    v1: 'ငွေကြောင့် မ포給မလို',
    v1d: 'သင်ယူလိုသော စိတ်ဆန္ဒရှိသူများ စီးပွားရေး အကြောင်းကြောင့်သာ အိပ်မက်ကို မစွန့်လွှတ်ရစေရန် အခမဲ့ plan နှင့် sending organization အတွက် coupon ပေးသည်။',
    v2: '၂% ကတိ',
    v2d: 'ဝင်ငွေ ၂% ကို အာရှ ကလေးများ၏ ပညာရေး ထောက်ပံ့မှုအတွက် ပြန်လည်ပေးသည်။',
    v3: 'အတူ ကြီးထွားသည်',
    v3d: 'ဂျပန် လုပ်သား အင်အားလိုအပ်ချက်ကို ဖြေရှင်းရင်း အာရှ လူငယ်များ ဂျပန်တွင် ကြွေးချနိုင်သော ပတ်ဝန်းကျင် ဖန်တီးသည်။',
    cycle: 'ချိတ်ဆက်သော အိပ်မက် သံသရာ',
    c1: 'မိမိဘာသာဖြင့် စောင့်ရှောက်မှု သင်ယူ', c2: 'ဂျပန်တွင် လှုပ်ရှားသည်', c3: 'မိသားစုသို့ ငွေလွှဲသည်', c4: 'မွေးရပ်မြေ ကလေးများ ကျောင်းသွားသည်', c5: 'နောက်မျိုးဆက်သို့ ဆက်သည်',
    msgTitle: 'တည်ထောင်သူထံမှ',
    msg: 'ကျွန်ုပ်သည် Facebook မှတဆင့် အာရှ စောင့်ရှောက်မှုဆရာ မျိုးဆက်သစ်များနှင့် တွေ့ဆုံခဲ့သည်။ ၎င်းတို့၏ အသံများကို ကြားသည်- "Kanji မဖတ်နိုင်", "ဂျပန်ဘာသာ မြန်လွန်း", "မှတ်တမ်း မရေးနိုင်" - ဤ app ကို ဖန်တီးရန် ဆုံးဖြတ်ခဲ့သည်။\n\nဘာသာစကား အတားအဆီးကို ကျော်လွှားနိုင်သည်။ နည်းပညာနှင့် AI ၏ အစွမ်းဖြင့် အာရှနှင့် ဂျပန်ကြားတွင် တံတားတည်ဆောက်လိုသည်။ ထိုသည် ကျွန်ုပ်၏ အိပ်မက်ဖြစ်သည်။',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 သင်ယူမှု စတင်ရန်',
    ctaSub: 'အခမဲ့ plan ဖြင့် ယခုပင် စတင်နိုင်သည်',
    back: 'အပေါ်သို့',
  },
  bn: {
    hero: 'স্বপ্নের সেতু',
    heroSub: 'এশিয়া ও জাপানকে সংযুক্ত করা',
    heroDesc: 'ভাষার বাধা অতিক্রম করে এশিয়ার তরুণরা জাপানে তাদের স্বপ্ন পূরণ করে। এবং সেই অভিজ্ঞতা জন্মভূমির পরবর্তী প্রজন্মের সাথে সংযুক্ত হয়।',
    bridge: 'Kaigo Sensei Pro সংযুক্ত করে',
    v1: 'অর্থের কারণে হাল ছাড়বেন না',
    v1d: 'যারা শিখতে চান তারা যেন শুধু অর্থনৈতিক কারণে স্বপ্ন ছেড়ে না দেন, তাই আমরা বিনামূল্যে প্ল্যান এবং প্রেরণ সংস্থার জন্য কুপন প্রদান করি।',
    v2: '২% প্রতিশ্রুতি',
    v2d: 'আয়ের ২% এশিয়ার শিশুদের শিক্ষা সহায়তায় ফেরত দেওয়া হয়। পরিচর্যাকর্মী হিসেবে কাজ করা পরবর্তী প্রজন্মের শিক্ষার সাথে সংযুক্ত একটি চক্র তৈরি করে।',
    v3: 'একসাথে বড় হওয়া',
    v3d: 'জাপানের পরিচর্যা শিল্পে জনশক্তির ঘাটতি সমাধান করার পাশাপাশি এশিয়ার তরুণরা জাপানে সক্রিয় হতে পারে এমন পরিবেশ তৈরি করা।',
    cycle: 'সংযুক্ত স্বপ্নের চক্র',
    c1: 'মাতৃভাষায় পরিচর্যা শেখা', c2: 'জাপানে সক্রিয় থাকা', c3: 'পরিবারকে টাকা পাঠানো', c4: 'জন্মভূমির শিশুরা স্কুলে যায়', c5: 'পরবর্তী প্রজন্মের সাথে সংযুক্ত',
    msgTitle: 'প্রতিষ্ঠাতার কাছ থেকে',
    msg: 'আমি Facebook-এর মাধ্যমে এশিয়ার পরিচর্যাকর্মী হওয়ার স্বপ্ন দেখা তরুণদের সাথে পরিচিত হয়েছিলাম। তাদের কণ্ঠস্বর শুনেছি: "কাঞ্জি পড়তে পারি না", "জাপানি ভাষা খুব দ্রুত", "রেকর্ড লিখতে পারি না" - এই অ্যাপ তৈরি করার সিদ্ধান্ত নিয়েছি।\n\nভাষার বাধা অতিক্রম করা যায়। প্রযুক্তি ও AI-এর শক্তিতে এশিয়া ও জাপানের মধ্যে একটি সেতু তৈরি করতে চাই। এটাই আমার স্বপ্ন।',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 শেখা শুরু করুন',
    ctaSub: 'বিনামূল্যে প্ল্যান দিয়ে এখনই শুরু করুন',
    back: 'শীর্ষে ফিরুন',
  },
  ne: {
    hero: 'सपनाको पुल',
    heroSub: 'एसिया र जापानलाई जोड्दै',
    heroDesc: 'भाषाको बाधा पार गरेर एसियाका युवाहरूले जापानमा आफ्नो सपना पूरा गर्छन्। र त्यो अनुभव जन्मभूमिको अर्को पुस्तासँग जोडिन्छ।',
    bridge: 'Kaigo Sensei Pro ले जोड्छ',
    v1: 'पैसाको कारण हार नमान्नुस्',
    v1d: 'सिक्न चाहने मान्छेहरू आर्थिक कारणले मात्र सपना नछोडून् भनेर हामी निःशुल्क प्लान र पठाउने संस्थाका लागि कुपन प्रदान गर्छौं।',
    v2: '२% को वाचा',
    v2d: 'आम्दानीको २% एसियाका बालबालिकाको शिक्षा समर्थनमा फिर्ता गरिन्छ। परिचर्या कर्मचारीको रूपमा काम गर्नुले अर्को पुस्ताको शिक्षासँग जोडिएको चक्र सिर्जना गर्छ।',
    v3: 'सँगै हुर्कनु',
    v3d: 'जापानको परिचर्या उद्योगमा जनशक्तिको कमी समाधान गर्दै एसियाका युवाहरू जापानमा सक्रिय हुन सक्ने वातावरण सिर्जना गर्ने।',
    cycle: 'जोडिएको सपनाको चक्र',
    c1: 'मातृभाषामा परिचर्या सिक्नु', c2: 'जापानमा सक्रिय हुनु', c3: 'परिवारलाई पैसा पठाउनु', c4: 'जन्मभूमिका बच्चाहरू स्कूल जान्छन्', c5: 'अर्को पुस्तासँग जोडिनु',
    msgTitle: 'संस्थापकबाट',
    msg: 'मैले Facebook मार्फत एसियाका भावी परिचर्या कर्मचारीहरूसँग परिचय भएँ। उनीहरूका आवाज सुनेँ: "कान्जी पढ्न सक्दिनँ", "जापानी भाषा धेरै छिटो छ", "रेकर्ड लेख्न सक्दिनँ" - यो app बनाउने निर्णय गरेँ।\n\nभाषाको बाधा पार गर्न सकिन्छ। प्रविधि र AI को शक्तिले एसिया र जापानबीच पुल बनाउन चाहन्छु। त्यही मेरो सपना हो।',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 सिक्न सुरु गर्नुहोस्',
    ctaSub: 'निःशुल्क प्लानले अहिले नै सुरु गर्न सकिन्छ',
    back: 'माथि फर्कनुहोस्',
  },
  km: {
    hero: 'ស្ពានសុបិន្ត',
    heroSub: 'ភ្ជាប់អាស៊ី និងជប៉ុន',
    heroDesc: 'ដោយឆ្លងកាត់របាំងភាសា យុវជនអាស៊ីសម្រេចបានសុបិន្តរបស់ពួកគេនៅជប៉ុន។ ហើយបទពិសោធន៍នោះភ្ជាប់ទៅជំនាន់ក្រោយនៅកំណើតភូមិ។',
    bridge: 'Kaigo Sensei Pro ភ្ជាប់',
    v1: 'កុំបោះបង់ ដោយសារប្រាក់',
    v1d: 'ដើម្បីឱ្យអ្នកដែលចង់រៀន មិនបោះបង់សុបិន្ត ដោយសារតែហេតុផលសេដ្ឋកិច្ចប៉ុណ្ណោះ យើងផ្តល់ផែនការឥតគិតថ្លៃ និងគូប៉ុងសម្រាប់អង្គការបញ្ជូន។',
    v2: 'សន្យា ២%',
    v2d: '២% នៃប្រាក់ចំណូល ត្រូវបានប្រគល់ជូនដើម្បីគាំទ្រការអប់រំកុមារអាស៊ី។ ការធ្វើការជាអ្នកថែទាំ បង្កើតវដ្តដែលភ្ជាប់ទៅការអប់រំជំនាន់ក្រោយ។',
    v3: 'ធំដឹងក្ដីជាមួយគ្នា',
    v3d: 'ខណៈដោះស្រាយការខ្វះខាតកម្លាំងពលកម្មក្នុងឧស្សាហកម្មថែទាំជប៉ុន បង្កើតបរិស្ថានដែលយុវជនអាស៊ីអាចរីកចម្រើននៅជប៉ុន។',
    cycle: 'វដ្តសុបិន្តដែលភ្ជាប់',
    c1: 'រៀនការថែទាំជាភាសាម្ដាយ', c2: 'សកម្មនៅជប៉ុន', c3: 'ផ្ញើប្រាក់ទៅគ្រួសារ', c4: 'កុមារកំណើតភូមិចូលសាលា', c5: 'ភ្ជាប់ជំនាន់ក្រោយ',
    msgTitle: 'ពីស្ថាបនិក',
    msg: 'ខ្ញុំបានជួបយុវជនអាស៊ីដែលកំពុងរៀនដើម្បីក្លាយជាអ្នកថែទាំ តាម Facebook។ ខ្ញុំឮសំឡេងរបស់ពួកគេ: "មិនអាចអានអក្សរ kanji", "ភាសាជប៉ុនលឿនពេក", "មិនអាចសរសេរកំណត់ត្រា" - ខ្ញុំបានសម្រេចចិត្តបង្កើត app នេះ។\n\nរបាំងភាសាអាចឆ្លងបាន។ ដោយកម្លាំងបច្ចេកវិជ្ជា និង AI ខ្ញុំចង់បង្កើតស្ពានរវាងអាស៊ី និងជប៉ុន។ នោះជាសុបិន្តរបស់ខ្ញុំ។',
    founder: 'Hiroshi Ochi / aipuru-hu',
    cta: '🚀 ចាប់ផ្តើមរៀន',
    ctaSub: 'អាចចាប់ផ្តើមឥឡូវនេះជាមួយផែនការឥតគិតថ្លៃ',
    back: 'ត្រលប់ទៅដើម',
  },
};

const COUNTRIES = [
  { flag: '🇯🇵', name: '日本', role: '受け入れ国', color: 'bg-red-50 border-red-200' },
  { flag: '🇮🇩', name: 'Indonesia', role: 'インドネシア', color: 'bg-green-50 border-green-200' },
  { flag: '🇻🇳', name: 'Việt Nam', role: 'ベトナム', color: 'bg-red-50 border-red-200' },
  { flag: '🇵🇭', name: 'Philippines', role: 'フィリピン', color: 'bg-blue-50 border-blue-200' },
  { flag: '🇲🇲', name: 'Myanmar', role: 'ミャンマー', color: 'bg-yellow-50 border-yellow-200' },
  { flag: '🇧🇩', name: 'Bangladesh', role: 'バングラデシュ', color: 'bg-green-50 border-green-200' },
  { flag: '🇳🇵', name: 'Nepal', role: 'ネパール', color: 'bg-red-50 border-red-200' },
  { flag: '🇰🇭', name: 'Cambodia', role: 'カンボジア', color: 'bg-blue-50 border-blue-200' },
];

export default function MissionPage() {
  const router = useRouter();
  const { lang } = useLang();
  const m = MT[lang] || MT['ja'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <button onClick={() => router.push('/')} className="mb-6 text-green-600 hover:underline text-sm">← {m.back}</button>

        {/* ヒーロー */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌏</div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{m.hero}</h1>
          <p className="text-xl text-gray-500 mb-2">{m.heroSub}</p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{m.heroDesc}</p>
        </div>

        {/* 国々 */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {COUNTRIES.map((c, i) => (
              <div key={i} className={`${c.color} border rounded-2xl px-4 py-3 text-center`}>
                <div className="text-3xl mb-1">{c.flag}</div>
                <p className="text-xs font-bold text-gray-700">{c.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-gray-400 text-sm">
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-24" />
              <span className="text-green-600 font-bold">{m.bridge}</span>
              <div className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent w-24" />
            </div>
          </div>
        </div>

        {/* 理念3つ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: '💚', title: m.v1, desc: m.v1d },
            { icon: '🌱', title: m.v2, desc: m.v2d },
            { icon: '🤝', title: m.v3, desc: m.v3d },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 循環 */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white mb-10">
          <h2 className="text-2xl font-bold text-center mb-6">{m.cycle}</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center text-xs flex-wrap">
            {[m.c1, m.c2, m.c3, m.c4, m.c5].map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-white/20 rounded-2xl px-4 py-3 max-w-24">
                  <p className="text-green-100">{c}</p>
                </div>
                {i < 4 && <span className="text-green-200 hidden md:block">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* 創設者メッセージ */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center mb-10">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">{m.msgTitle}</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-sm whitespace-pre-line">{m.msg}</p>
          <div className="mt-4 text-gray-400 text-sm">{m.founder}</div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => router.push('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg transition-all hover:scale-105">
            {m.cta}
          </button>
          <p className="mt-3 text-sm text-gray-400">{m.ctaSub}</p>
        </div>
      </main>
    </div>
  );
}
