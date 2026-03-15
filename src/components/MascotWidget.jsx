'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const MASCOT_MESSAGES = {
  ja: [
    'こんにちは！一緒に頑張ろうね！🌸',
    'あなたなら絶対に合格できる！💪',
    '今日も勉強しにきてくれてありがとう！',
    '一問一問、着実に積み上げよう！',
    '休憩も大切だよ。無理しないでね🍵',
    '先輩のテーリンさんを知ってる？カンボジアから来て介護福祉士になったすごい人！フォローしてみてね 📲',
  ],
  id: [
    'Halo! Ayo berjuang bersama! 🌸',
    'Kamu pasti bisa lulus! 💪',
    'Terima kasih sudah datang belajar hari ini!',
    'Satu per satu, terus maju!',
    'Istirahat juga penting ya 🍵',
    'Kenal Thearin? Dia dari Kamboja, jadi perawat sosial di Jepang! Yuk follow 📲',
  ],
  vi: [
    'Xin chào! Cùng cố gắng nhé! 🌸',
    'Bạn nhất định sẽ đậu! 💪',
    'Cảm ơn bạn đã đến học hôm nay!',
    'Từng câu một, tiến lên!',
    'Nghỉ ngơi cũng quan trọng nhé 🍵',
    'Bạn biết chị Thearin chưa? Chị ấy từ Campuchia đến Nhật và trở thành hộ lý! Hãy follow nhé 📲',
  ],
  tl: [
    'Kumusta! Sama-sama tayong magsikap! 🌸',
    'Kaya mo yan! 💪',
    'Salamat sa pagdating mo ngayon!',
    'Isa-isang tanong, patuloy tayo!',
    'Ang pahinga ay mahalaga rin 🍵',
    'Kilala mo si Thearin? Galing siya sa Cambodia, naging care worker sa Japan! I-follow mo siya 📲',
  ],
  km: [
    'សួស្ដី! តោះព្យាយាមជាមួយគ្នា! 🌸',
    'អ្នកអាចជាប់បានជាក់ជាមិនខាន! 💪',
    'សូមអរគុណដែលបានមកសិក្សាថ្ងៃនេះ!',
    'ម្តងមួយសំណួរ រីកចម្រើន!',
    'ការសម្រាកក៏សំខាន់ដែរ 🍵',
    'តើអ្នកស្គាល់ Thearin ទេ? នាងមកពីកម្ពុជា ក្លាយជា care worker នៅជប៉ុន! Follow នាង 📲',
  ],
  my: [
    'မင်္ဂလာပါ! အတူတကွကြိုးစားကြစို့! 🌸',
    'သင်သေချာပေါက်အောင်မြင်နိုင်သည်! 💪',
    'ယနေ့လာလေ့လာပေးတဲ့အတွက်ကျေးဇူးတင်ပါတယ်!',
    'တစ်မေးခွန်းချင်း တိုးတက်အောင်!',
    'အနားယူဖို့လည်းအရေးကြီးတယ် 🍵',
    'Thearin ကိုသိလား? ကမ္ဘောဒီးယားကလာပြီး ဂျပန်မှာ care worker ဖြစ်ခဲ့သူ! Follow လုပ်ကြည့် 📲',
  ],
  bn: [
    'হ্যালো! একসাথে চেষ্টা করি! 🌸',
    'আপনি অবশ্যই পাস করবেন! 💪',
    'আজ পড়তে আসার জন্য ধন্যবাদ!',
    'একটি একটি প্রশ্ন, এগিয়ে যাই!',
    'বিশ্রামও জরুরি 🍵',
    'Thearin-কে চেনেন? তিনি কম্বোডিয়া থেকে এসে জাপানে care worker হয়েছেন! ফলো করুন 📲',
  ],
  ne: [
    'नमस्ते! सँगै प्रयास गरौं! 🌸',
    'तपाईं अवश्य पास हुनुहुनेछ! 💪',
    'आज पढ्न आउनुभएकोमा धन्यवाद!',
    'एक एक प्रश्न, अगाडि बढौं!',
    'आराम पनि जरुरी छ 🍵',
    'Thearin लाई चिन्नुहुन्छ? उहाँ कम्बोडियाबाट आएर जापानमा care worker भयो! फलो गर्नुस् 📲',
  ],
};

// テーリン紹介メッセージのインデックス（最後の要素）
const THEARIN_MSG_INDEX = 5;

export default function MascotWidget({ lang = 'ja' }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');
  const [face, setFace] = useState('🤖');
  const [bouncing, setBouncing] = useState(false);
  const [isThearinMsg, setIsThearinMsg] = useState(false);
  const timerRef = useRef(null);
  const msgCountRef = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => { setVisible(true); setBouncing(true); setTimeout(() => setBouncing(false), 1000); }, 2000);
    const t2 = setTimeout(() => triggerMessage(0, '🥳', false), 4000);
    // 45秒後にテーリン紹介
    const t3 = setTimeout(() => triggerMessage(THEARIN_MSG_INDEX, '😊', true), 45000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [lang]);

  const triggerMessage = (idx, faceEmoji = '😄', thearin = false) => {
    const msgs = MASCOT_MESSAGES[lang] || MASCOT_MESSAGES.ja;
    setMessage(msgs[idx % msgs.length]);
    setFace(faceEmoji);
    setShowBubble(true);
    setIsThearinMsg(thearin);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setShowBubble(false); setIsThearinMsg(false); }, thearin ? 10000 : 6000);
  };

  const handleClick = () => {
    const msgs = MASCOT_MESSAGES[lang] || MASCOT_MESSAGES.ja;
    msgCountRef.current += 1;
    // 3回に1回テーリン紹介
    const isThearin = msgCountRef.current % 3 === 0;
    const idx = isThearin ? THEARIN_MSG_INDEX : Math.floor(Math.random() * (msgs.length - 1));
    const faces = ['😄', '🥳', '🤔', '😊', '💪'];
    triggerMessage(idx, isThearin ? '😊' : faces[Math.floor(Math.random() * faces.length)], isThearin);
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(msgs[idx]);
      utter.lang = lang === 'ja' ? 'ja-JP' : lang === 'vi' ? 'vi-VN' : lang === 'id' ? 'id-ID' : 'en-US';
      utter.rate = 0.9; utter.pitch = 1.1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes mascot-pop{0%{transform:scale(0);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        @keyframes mascot-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes mascot-idle{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-5px) rotate(-3deg)}70%{transform:translateY(-3px) rotate(3deg)}}
        @keyframes bubble-in{0%{transform:scale(0.6) translateY(8px);opacity:0}70%{transform:scale(1.04);opacity:1}100%{transform:scale(1);opacity:1}}
        .m-pop{animation:mascot-pop 0.5s cubic-bezier(.34,1.56,.64,1) forwards}
        .m-bounce{animation:mascot-bounce 0.55s ease-in-out}
        .m-idle{animation:mascot-idle 3.5s ease-in-out infinite}
        .b-in{animation:bubble-in 0.35s cubic-bezier(.34,1.56,.64,1) forwards}
      `}</style>

      {showBubble && (
        <div className="b-in" style={{position:'fixed',bottom:'108px',right:'16px',zIndex:9999,maxWidth:'240px',background:'white',borderRadius:'20px 20px 6px 20px',boxShadow:'0 8px 40px rgba(99,102,241,0.18)',padding:'14px 16px 12px',border:`2px solid ${isThearinMsg ? '#fde68a' : '#e0e7ff'}`}}>
          {isThearinMsg && (
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-lg">👩</span>
              <span className="text-xs font-bold text-amber-600">Thearin先輩より</span>
            </div>
          )}
          <p style={{fontSize:'13px',color:'#1e1b4b',lineHeight:1.6,margin:0,fontWeight:500}}>{message}</p>
          {isThearinMsg && (
            <button onClick={() => { setShowBubble(false); router.push('/senpai'); }}
              className="mt-2 w-full py-1.5 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
              👩 先輩紹介ページへ →
            </button>
          )}
          <div style={{position:'absolute',bottom:'-11px',right:'22px',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderTop:'11px solid white'}}/>
          <button onClick={()=>{setShowBubble(false);setIsThearinMsg(false);}} style={{position:'absolute',top:'7px',right:'9px',background:'none',border:'none',cursor:'pointer',fontSize:'11px',color:'#c4b5fd',fontWeight:'bold'}}>✕</button>
        </div>
      )}

      <button onClick={handleClick}
        className={`m-pop ${bouncing ? 'm-bounce' : 'm-idle'}`}
        style={{position:'fixed',bottom:'20px',right:'16px',zIndex:9999,width:'70px',height:'70px',borderRadius:'50%',background:'linear-gradient(135deg,#6366f1 0%,#a855f7 100%)',boxShadow:'0 6px 28px rgba(99,102,241,0.45)',border:'3px solid white',cursor:'pointer',fontSize:'30px',display:'flex',alignItems:'center',justifyContent:'center',outline:'none'}}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 10px 36px rgba(99,102,241,0.6)';e.currentTarget.style.transform='scale(1.12)';}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 6px 28px rgba(99,102,241,0.45)';e.currentTarget.style.transform='';}}
      >
        {face}
        {!showBubble && (
          <span style={{position:'absolute',top:'-3px',right:'-3px',width:'19px',height:'19px',borderRadius:'50%',background:'#f43f5e',border:'2px solid white',fontSize:'10px',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>!</span>
        )}
      </button>
    </>
  );
}
