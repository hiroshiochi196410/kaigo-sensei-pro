// 介護専門用語の読み方辞書（完全版）
// Web Speech APIの誤読防止 + 学習用語集として全機能で共有

export const KAIGO_WORDS = [
  // ===身体介護===
  { ja: '誤嚥', furi: 'ごえん', en: 'aspiration', category: 'body',
    mean: { id: 'Tersedak/aspirasi', vi: 'Hít sặc', tl: 'Paghinop', my: 'မမှန်ကန်မျိုချ', bn: 'অ্যাসপিরেশন', ne: 'गलत निल्नु', km: 'ការស្រូបចូលខុស' },
    example: '誤嚥を防ぐため、食事中は上体を起こします。' },
  { ja: '嚥下', furi: 'えんげ', en: 'swallowing', category: 'body',
    mean: { id: 'Menelan', vi: 'Nuốt', tl: 'Paglunok', my: 'မျိုချခြင်း', bn: 'গেলা', ne: 'निल्नु', km: 'ការលេប' },
    example: '嚥下機能が低下すると誤嚥のリスクが高まります。' },
  { ja: '褥瘡', furi: 'じょくそう', en: 'pressure sore/bedsore', category: 'body',
    mean: { id: 'Luka tekanan', vi: 'Loét do tỳ đè', tl: 'Bedsore', my: 'အိပ်ရာအနာ', bn: 'শয্যাক্ষত', ne: 'थिचिएको घाउ', km: 'របួសសម្ពាធ' },
    example: '定期的な体位変換で褥瘡を予防します。' },
  { ja: '拘縮', furi: 'こうしゅく', en: 'contracture', category: 'body',
    mean: { id: 'Kontraktur', vi: 'Co cứng', tl: 'Contracture', my: 'ကြွက်သားကျုံ့မှု', bn: 'সংকোচন', ne: 'संकुचन', km: 'ការរួញសន្លាក់' },
    example: '関節の拘縮予防のためリハビリを行います。' },
  { ja: '浮腫', furi: 'ふしゅ', en: 'edema/swelling', category: 'body',
    mean: { id: 'Bengkak/edema', vi: 'Phù nề', tl: 'Pamamaga', my: 'ရောင်ရမ်းမှု', bn: 'ফোলা', ne: 'सुन्निनु', km: 'ហើម' },
    example: '足の浮腫が見られたため、挙上しました。' },
  { ja: '清拭', furi: 'せいしき', en: 'body wiping/bed bath', category: 'body',
    mean: { id: 'Memandikan dengan lap', vi: 'Lau người', tl: 'Pagpunas ng katawan', my: 'ကိုယ်သုတ်ရေ', bn: 'শরীর মোছা', ne: 'शरीर पुछ्नु', km: 'ការស្ទូចខ្លួន' },
    example: '入浴できない日は全身清拭を行います。' },
  { ja: '体位変換', furi: 'たいいへんかん', en: 'repositioning', category: 'body',
    mean: { id: 'Mengubah posisi tubuh', vi: 'Thay đổi tư thế', tl: 'Pagbabago ng posisyon', my: 'ကိုယ်ဟန်ပြောင်းလဲမှု', bn: 'শরীরের অবস্থান পরিবর্তন', ne: 'शरीरको स्थिति परिवर्तन', km: 'ការផ្លាស់ប្តូរទីតាំងរាងកាយ' },
    example: '2時間ごとに体位変換を実施します。' },
  { ja: '移乗', furi: 'いじょう', en: 'transfer', category: 'body',
    mean: { id: 'Pindah/transfer', vi: 'Chuyển vị trí', tl: 'Paglipat', my: 'နေရာပြောင်းမှု', bn: 'স্থানান্তর', ne: 'सार्नु', km: 'ការផ្ទេរ' },
    example: 'ベッドから車椅子への移乗を介助します。' },
  { ja: '仰臥位', furi: 'ぎょうがい', en: 'supine position', category: 'body',
    mean: { id: 'Posisi telentang', vi: 'Tư thế nằm ngửa', tl: 'Supine', my: 'မျက်နှာမောက်လှန် အနေအထား', bn: 'চিৎ শোয়া', ne: 'ढाड लगाएर सुत्नु', km: 'ទ្រង់ប្រហាក់' },
    example: '仰臥位から側臥位に体位変換しました。' },
  { ja: '側臥位', furi: 'そくがい', en: 'lateral position', category: 'body',
    mean: { id: 'Posisi miring', vi: 'Tư thế nằm nghiêng', tl: 'Lateral position', my: 'ဘေးစောင်းအနေအထား', bn: 'কাত হয়ে শোয়া', ne: 'छेउमा सुत्नु', km: 'ទ្រង់ស្ថាន' },
    example: '褥瘡予防のため側臥位をとります。' },
  { ja: '端座位', furi: 'たんざい', en: 'sitting on edge of bed', category: 'body',
    mean: { id: 'Duduk di tepi tempat tidur', vi: 'Ngồi mép giường', tl: 'Sitting on bed edge', my: 'အိပ်ရာစောင်းဘေး ထိုင်မှု', bn: 'বিছানার কিনারে বসা', ne: 'खाटको किनारमा बस्नु', km: 'អង្គុយគែមគ្រែ' },
    example: '端座位で血圧を測定しました。' },
  { ja: 'ボディメカニクス', furi: 'ぼでぃめかにくす', en: 'body mechanics', category: 'body',
    mean: { id: 'Mekanika tubuh', vi: 'Cơ học cơ thể', tl: 'Body mechanics', my: 'ကိုယ်မကင်နစ်', bn: 'বডি মেকানিক্স', ne: 'शरीर यान्त्रिकी', km: 'មេកានិចរាងកាយ' },
    example: 'ボディメカニクスを活用して腰への負担を減らします。' },

  // ===認知症===
  { ja: '認知症', furi: 'にんちしょう', en: 'dementia', category: 'dementia',
    mean: { id: 'Demensia', vi: 'Sa sút trí tuệ', tl: 'Demensya', my: 'ဦးနှောက်ယျုတ်ဆင်းရောဂါ', bn: 'ডিমেনশিয়া', ne: 'मानसिक ह्रास', km: 'វង្វេងស្មារតី' },
    example: '認知症の方には否定せず受け止めることが大切です。' },
  { ja: '徘徊', furi: 'はいかい', en: 'wandering', category: 'dementia',
    mean: { id: 'Mengembara', vi: 'Lang thang', tl: 'Paggala-gala', my: 'ရပ်ချောင်မသိ လမ်းလျှောက်ခြင်း', bn: 'ঘোরাফেরা', ne: 'अलमल घुम्नु', km: 'ការក្រឡេក' },
    example: '夜間の徘徊があるため見守りを強化します。' },
  { ja: '見当識', furi: 'けんとうしき', en: 'orientation', category: 'dementia',
    mean: { id: 'Orientasi', vi: 'Định hướng', tl: 'Oryentasyon', my: 'အချိန်နေရာသိမှု', bn: 'অভিমুখীকরণ', ne: 'दिशाज्ञान', km: 'ការដឹងទិស' },
    example: '見当識障害により今日の日付がわからない状態です。' },
  { ja: 'BPSD', furi: 'びーぴーえすでぃー', en: 'behavioral and psychological symptoms of dementia', category: 'dementia',
    mean: { id: 'Gejala perilaku demensia', vi: 'Triệu chứng hành vi', tl: 'BPSD', my: 'BPSD', bn: 'BPSD', ne: 'BPSD', km: 'BPSD' },
    example: 'BPSDの対応には環境調整が効果的です。' },

  // ===記録・報告===
  { ja: '申し送り', furi: 'もうしおくり', en: 'handover/shift report', category: 'record',
    mean: { id: 'Serah terima', vi: 'Bàn giao ca', tl: 'Handover', my: 'တာဝန်လွှဲပြောင်းမှု', bn: 'দায়িত্ব হস্তান্তর', ne: 'हस्तान्तरण', km: 'ការប្រគល់វេន' },
    example: '申し送りで利用者の状態変化を伝えます。' },
  { ja: 'ヒヤリハット', furi: 'ひやりはっと', en: 'near-miss incident', category: 'record',
    mean: { id: 'Hampir celaka', vi: 'Sự cố suýt xảy ra', tl: 'Near miss', my: 'အန္တရာယ်နီးပါးဖြစ်ရပ်', bn: 'প্রায় দুর্ঘটনা', ne: 'लगभग दुर्घटना', km: 'ហេតុការណ៍ជិតគ্রোះ' },
    example: 'ヒヤリハットは些細なことでも記録します。' },
  { ja: '経過記録', furi: 'けいかきろく', en: 'progress record', category: 'record',
    mean: { id: 'Catatan perkembangan', vi: 'Ghi chép tiến triển', tl: 'Progress record', my: 'တိုးတက်မှုမှတ်တမ်း', bn: 'অগ্রগতি রেকর্ড', ne: 'प्रगति रेकर्ड', km: 'កំណត់ត្រាវឌ្ឍនភាព' },
    example: '食事量・水分量を経過記録に記入します。' },
  { ja: 'サービス担当者会議', furi: 'さーびすたんとうしゃかいぎ', en: 'care conference', category: 'record',
    mean: { id: 'Rapat koordinasi layanan', vi: 'Hội nghị dịch vụ', tl: 'Care conference', my: 'ဝန်ဆောင်မှုညှိနှိုင်းအစည်းအဝေး', bn: 'সেবা সমন্বয় সভা', ne: 'सेवा समन्वय बैठक', km: 'កិច្ចប្រជុំសម្របសម្រួលសេវា' },
    example: 'サービス担当者会議でケアプランを確認します。' },

  // ===バイタルサイン===
  { ja: 'バイタルサイン', furi: 'ばいたるさいん', en: 'vital signs', category: 'body',
    mean: { id: 'Tanda vital', vi: 'Dấu hiệu sinh tồn', tl: 'Vital signs', my: 'အသက်ရှင်မှုသဲလွန်စ', bn: 'গুরুত্বপূর্ণ লক্ষণ', ne: 'जीवन संकेत', km: 'សញ្ញាជីវិត' },
    example: '朝のバイタルサインを測定して記録します。' },
  { ja: '収縮期血圧', furi: 'しゅうしゅくきけつあつ', en: 'systolic blood pressure', category: 'body',
    mean: { id: 'Tekanan darah sistolik', vi: 'Huyết áp tâm thu', tl: 'Systolic BP', my: 'ကျုံ့ချိန်သွေးဖိ', bn: 'সিস্টোলিক রক্তচাপ', ne: 'सिस्टोलिक रक्तचाप', km: 'សម្ពាធឈាម Systolic' },
    example: '収縮期血圧が180mmHgを超えたため報告しました。' },
  { ja: '酸素飽和度', furi: 'さんそほうわど', en: 'oxygen saturation / SpO2', category: 'body',
    mean: { id: 'Saturasi oksigen', vi: 'Độ bão hòa oxy', tl: 'Oxygen saturation', my: 'အောက်ဆီဂျင်ပြည့်မှုနှုန်း', bn: 'অক্সিজেন স্যাচুরেশন', ne: 'अक्सिजन संतृप्ति', km: 'ការឆ្អែតអុកស៊ីហ្សែន' },
    example: 'SpO2が92%に低下したため酸素投与を開始しました。' },

  // ===食事・栄養===
  { ja: '摂取量', furi: 'せっしゅりょう', en: 'intake amount', category: 'meal',
    mean: { id: 'Jumlah asupan', vi: 'Lượng tiêu thụ', tl: 'Dami ng kinain', my: 'စားသောက်မှုပမာဏ', bn: 'গ্রহণের পরিমাণ', ne: 'सेवन मात्रा', km: 'បរិមាណទទួលទាន' },
    example: '食事摂取量8割、水分摂取量600mlでした。' },
  { ja: 'とろみ', furi: 'とろみ', en: 'thickening agent', category: 'meal',
    mean: { id: 'Pengental', vi: 'Chất làm đặc', tl: 'Pampalapot', my: 'ထူထဲစေသောပစ္စည်း', bn: 'ঘন করার উপাদান', ne: 'गाढा बनाउने', km: 'សារធាតុខាប់' },
    example: 'とろみをつけて誤嚥を予防します。' },
  { ja: '嚥下食', furi: 'えんげしょく', en: 'dysphagia diet', category: 'meal',
    mean: { id: 'Diet disfagia', vi: 'Chế độ ăn cho người khó nuốt', tl: 'Dysphagia diet', my: 'မျိုချခက်ခဲသူအတွက်အစားအစာ', bn: 'ডিসফেজিয়া ডায়েট', ne: 'निल्न गाह्रो हुनेको खाना', km: 'របបអាហារសម្រាប់អ្នកលំបាកលេប' },
    example: '嚥下機能に合わせた嚥下食を提供します。' },
  { ja: '口腔ケア', furi: 'こうくうけあ', en: 'oral care', category: 'meal',
    mean: { id: 'Perawatan mulut', vi: 'Chăm sóc miệng', tl: 'Oral care', my: 'ခံတွင်းစောင့်ရှောက်မှု', bn: 'মুখের যত্ন', ne: 'मुखको हेरचाह', km: 'ការថែទាំមាត់' },
    example: '食後は口腔ケアを実施します。' },

  // ===排泄===
  { ja: '排泄', furi: 'はいせつ', en: 'excretion', category: 'toilet',
    mean: { id: 'Ekskresi/buang air', vi: 'Bài tiết', tl: 'Pagdumi', my: 'စွန့်ထုတ်မှု', bn: 'মলত্যাগ', ne: 'मलमूत्र त्याग', km: 'ការបញ្ចេញជាតិ' },
    example: '排泄の自立支援を行います。' },
  { ja: '失禁', furi: 'しっきん', en: 'incontinence', category: 'toilet',
    mean: { id: 'Inkontinensia', vi: 'Tiểu không tự chủ', tl: 'Inkontinensya', my: 'ဆီးကျင်းမထိန်းနိုင်ခြင်း', bn: 'অসংযম', ne: 'मूत्र असंयम', km: 'ការបាត់បង់ការគ្រប់គ្រង' },
    example: '尿失禁があるためパッドを使用しています。' },
  { ja: '陰部洗浄', furi: 'いんぶせいじょう', en: 'perineal care', category: 'toilet',
    mean: { id: 'Membersihkan area kewanitaan', vi: 'Vệ sinh vùng kín', tl: 'Perineal care', my: 'မိန်းမကိုယ်ဆေးကြောခြင်း', bn: 'পেরিনিয়াল যত্ন', ne: 'गुप्ताङ्ग सफाई', km: 'ការថែទាំបង្ហួរ' },
    example: '排泄後は陰部洗浄を行います。' },

  // ===倫理・理念===
  { ja: '自己決定', furi: 'じこけってい', en: 'self-determination', category: 'basic',
    mean: { id: 'Penentuan diri sendiri', vi: 'Tự quyết định', tl: 'Sariling desisyon', my: 'ကိုယ်ပိုင်ဆုံးဖြတ်ချက်', bn: 'স্বনির্ণয়', ne: 'आत्म-निर्णय', km: 'ការសម្រេចចិត្តខ្លួនឯង' },
    example: '利用者の自己決定を尊重することが介護の基本です。' },
  { ja: '尊厳', furi: 'そんげん', en: 'dignity', category: 'basic',
    mean: { id: 'Martabat', vi: 'Phẩm giá', tl: 'Dignidad', my: 'ဂုဏ်သိက္ခာ', bn: 'মর্যাদা', ne: 'मर्यादा', km: 'សេចក្តីថ្លៃថ្នូរ' },
    example: '利用者の尊厳を守ることが最も大切です。' },
  { ja: '傾聴', furi: 'けいちょう', en: 'active listening', category: 'basic',
    mean: { id: 'Mendengarkan dengan seksama', vi: 'Lắng nghe chăm chú', tl: 'Aktibong pakikinig', my: 'အာရုံစိုက်နားထောင်ခြင်း', bn: 'মনোযোগ দিয়ে শোনা', ne: 'ध्यानपूर्वक सुन्नु', km: 'ការស្តាប់យ៉ាងយកចិត្តទុកដាក់' },
    example: '傾聴することで利用者の気持ちを理解します。' },
  { ja: '残存機能', furi: 'ざんそんきのう', en: 'remaining function', category: 'basic',
    mean: { id: 'Fungsi yang tersisa', vi: 'Chức năng còn lại', tl: 'Natitirang kakayahan', my: 'ကျန်ရှိသောစွမ်းဆောင်ရည်', bn: 'অবশিষ্ট কার্যকারিতা', ne: 'बाँकी कार्य क्षमता', km: 'មុខងារដែលនៅសល់' },
    example: '残存機能を活かした自立支援を行います。' },
  { ja: '個別ケア', furi: 'こべつけあ', en: 'individualized care', category: 'basic',
    mean: { id: 'Perawatan individual', vi: 'Chăm sóc cá nhân', tl: 'Indibidwal na pag-aalaga', my: 'တစ်ဦးချင်းစောင့်ရှောက်မှု', bn: 'ব্যক্তিগত যত্ন', ne: 'व्यक्तिगत हेरचाह', km: 'ការថែទាំបុគ្គល' },
    example: '利用者一人ひとりに合わせた個別ケアを提供します。' },

  // ===制度・保険===
  { ja: '要介護', furi: 'ようかいご', en: 'care need level', category: 'law',
    mean: { id: 'Tingkat kebutuhan perawatan', vi: 'Mức độ cần chăm sóc', tl: 'Antas ng pangangailangan', my: 'စောင့်ရှောက်မှုလိုအပ်မှုအဆင့်', bn: 'যত্নের প্রয়োজনীয়তার স্তর', ne: 'हेरचाह आवश्यकता स्तर', km: 'កម្រិតការត្រូវការថែទាំ' },
    example: '要介護3の認定を受けています。' },
  { ja: 'ケアプラン', furi: 'けあぷらん', en: 'care plan', category: 'law',
    mean: { id: 'Rencana perawatan', vi: 'Kế hoạch chăm sóc', tl: 'Care plan', my: 'စောင့်ရှောက်မှုအစီအစဉ်', bn: 'কেয়ার প্ল্যান', ne: 'हेरचाह योजना', km: 'គម្រោងថែទាំ' },
    example: 'ケアプランに沿ってサービスを提供します。' },
  { ja: 'サービス担当者', furi: 'さーびすたんとうしゃ', en: 'service coordinator', category: 'law',
    mean: { id: 'Koordinator layanan', vi: 'Điều phối viên dịch vụ', tl: 'Koordinator ng serbisyo', my: 'ဝန်ဆောင်မှုညှိနှိုင်းရေးမှူး', bn: 'সেবা সমন্বয়কারী', ne: 'सेवा समन्वयक', km: 'អ្នកសម្របសម្រួលសេវា' },
    example: 'サービス担当者会議に参加します。' },
  { ja: '福祉用具', furi: 'ふくしようぐ', en: 'welfare equipment', category: 'law',
    mean: { id: 'Peralatan kesejahteraan', vi: 'Thiết bị phúc lợi', tl: 'Kagamitang pangkalasugan', my: 'လူမှုကူညီပစ္စည်းများ', bn: 'কল্যাণ সরঞ্জাম', ne: 'कल्याण उपकरण', km: 'ឧបករណ៍សង្គមកិច្ច' },
    example: '車椅子や歩行器などの福祉用具を活用します。' },

  // ===緊急対応===
  { ja: '急変', furi: 'きゅうへん', en: 'sudden change in condition', category: 'emergency',
    mean: { id: 'Perubahan mendadak', vi: 'Thay đổi đột ngột', tl: 'Biglaang pagbabago', my: 'ရုတ်တရက်အခြေအနေပြောင်းလဲမှု', bn: 'হঠাৎ পরিবর্তন', ne: 'अचानक परिवर्तन', km: 'ការផ្លាស់ប្តូរភ្លាមៗ' },
    example: '利用者が急変したため、すぐに看護師に報告しました。' },
  { ja: '意識障害', furi: 'いしきしょうがい', en: 'consciousness disorder', category: 'emergency',
    mean: { id: 'Gangguan kesadaran', vi: 'Rối loạn ý thức', tl: 'Karamdaman ng kamalayan', my: 'သတိလစ်မှုပြဿနာ', bn: 'চেতনার ব্যাধি', ne: 'चेतना विकार', km: 'បញ្ហាស្មារតី' },
    example: '意識障害が疑われたため救急要請しました。' },
  { ja: '転倒', furi: 'てんとう', en: 'fall', category: 'emergency',
    mean: { id: 'Jatuh', vi: 'Ngã', tl: 'Pagkahulog', my: 'လဲကျခြင်း', bn: 'পড়ে যাওয়া', ne: 'ढल्नु', km: 'ការដួល' },
    example: '転倒リスクが高いため、こまめな見守りを行います。' },
  { ja: '誤薬', furi: 'ごやく', en: 'medication error', category: 'emergency',
    mean: { id: 'Kesalahan obat', vi: 'Nhầm thuốc', tl: 'Mali sa gamot', my: 'ဆေးမှားပေးခြင်း', bn: 'ওষুধের ভুল', ne: 'गलत औषधि', km: 'ការឱ្យថ្នាំខុស' },
    example: '誤薬防止のため、服薬確認を徹底します。' },
];

// 読み方変換辞書（Web Speech API用）
const READINGS = {};
KAIGO_WORDS.forEach(w => { READINGS[w.ja] = w.furi; });

// 追加の誤読しやすい語句
const EXTRA_READINGS = {
  '廃用症候群': 'はいようしょうこうぐん',
  '摂食': 'せっしょく',
  '喀痰': 'かくたん',
  '胃瘻': 'いろう',
  '経管栄養': 'けいかんえいよう',
  '義歯': 'ぎし',
  'ADL': 'えーでぃーえる',
  'QOL': 'きゅーおーえる',
  'ICF': 'あいしーえふ',
  'SpO2': 'えすぴーおーつー',
  'BPSD': 'びーぴーえすでぃー',
};

export function convertToReadable(text) {
  if (!text) return text;
  let result = text;
  const allReadings = { ...READINGS, ...EXTRA_READINGS };
  const sortedEntries = Object.entries(allReadings).sort((a, b) => b[0].length - a[0].length);
  for (const [kanji, reading] of sortedEntries) {
    result = result.split(kanji).join(reading);
  }
  return result;
}

// カテゴリ別に取得
export function getWordsByCategory(category) {
  return KAIGO_WORDS.filter(w => w.category === category);
}

// 今日の単語（日付ベースでローテーション）
export function getTodayWord() {
  const idx = Math.floor(Date.now() / 86400000) % KAIGO_WORDS.length;
  return KAIGO_WORDS[idx];
}

// ランダムに取得
export function getRandomWords(count = 5) {
  const shuffled = [...KAIGO_WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
