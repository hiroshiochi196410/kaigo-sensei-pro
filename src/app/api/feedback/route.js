import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, name, good, improve, score, nextGoal } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'メールアドレスが必要です' }, { status: 400 });
    }

    // Stripeでクーポン自動発行
    const coupon = await stripe.coupons.create({
      percent_off: 100,
      duration: 'once',
      name: '感想クーポン',
      max_redemptions: 1,
      metadata: { email, month: new Date().toISOString().slice(0, 7) },
    });

    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: `THANKS-${Date.now().toString(36).toUpperCase()}`,
      max_redemptions: 1,
    });

    // 感想お礼メール＋クーポン送信
    await resend.emails.send({
      from: 'support@aipuru-hu.net',
      to: email,
      subject: '【介護先生Pro】感想ありがとうございます！来月のクーポンをお届けします🎁',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #16a34a;">🌸 介護先生Pro</h1>
  </div>
  
  <p>${name || 'ご利用者'} さん、感想を送っていただきありがとうございます！</p>
  <p>あなたの声が、このアプリをもっと良くする力になります。</p>

  <div style="background: #fef9c3; border: 2px solid #fbbf24; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 8px; font-size: 14px; color: #92400e;">🎁 来月の割引クーポン</p>
    <p style="font-size: 32px; font-weight: 900; color: #d97706; letter-spacing: 3px; margin: 8px 0;">${promotionCode.code}</p>
    <p style="margin: 8px 0 0; font-size: 13px; color: #92400e;">次回のご利用時に入力してください（1回限り有効）</p>
  </div>

  <div style="background: #f0fdf4; border-radius: 12px; padding: 16px; margin: 20px 0;">
    <h3 style="color: #16a34a; margin-top: 0;">📝 いただいた感想</h3>
    <p><strong>良かった点：</strong>${good || '-'}</p>
    <p><strong>改善してほしい点：</strong>${improve || '-'}</p>
    <p><strong>満足度：</strong>${score ? `${score}/5` : '-'}</p>
    <p><strong>次の目標：</strong>${nextGoal || '-'}</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://kaigo-sensei-pro.vercel.app" 
       style="background: #16a34a; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold;">
      🚀 学習を続ける
    </a>
  </div>

  <p style="color: #6b7280; font-size: 13px;">
    引き続き応援しています！合格まで一緒に頑張りましょう 🌸<br>
    support@aipuru-hu.net
  </p>
</body>
</html>
      `,
    });

    // 管理者にも通知
    await resend.emails.send({
      from: 'support@aipuru-hu.net',
      to: 'support@aipuru-hu.net',
      subject: `【感想が届きました】${email}`,
      html: `
        <p><strong>送信者：</strong>${name} (${email})</p>
        <p><strong>良かった点：</strong>${good}</p>
        <p><strong>改善点：</strong>${improve}</p>
        <p><strong>満足度：</strong>${score}/5</p>
        <p><strong>次の目標：</strong>${nextGoal}</p>
        <p><strong>発行クーポン：</strong>${promotionCode.code}</p>
      `,
    });

    return NextResponse.json({ success: true, coupon: promotionCode.code });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '送信に失敗しました' }, { status: 500 });
  }
}
