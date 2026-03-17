import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name || 'ご利用者';

    if (email) {
      // ウェルカムメール送信
      await resend.emails.send({
        from: 'support@aipuru-hu.net',
        to: email,
        subject: '【介護先生Pro】ご購入ありがとうございます！🌸',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #16a34a;">🌸 介護先生Pro</h1>
  </div>
  
  <p>${name} さん、ご購入ありがとうございます！</p>
  
  <p>これから試験合格まで、全力でサポートします。</p>
  
  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h2 style="color: #16a34a; margin-top: 0;">✅ 使える機能（全て無制限）</h2>
    <ul style="line-height: 2;">
      <li>📝 AI介護記録アシスト</li>
      <li>📚 国家試験対策（全11科目）</li>
      <li>🤖 AI会話ロールプレイ</li>
      <li>📊 学習進捗管理</li>
    </ul>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://kaigo-sensei-pro.vercel.app" 
       style="background: #16a34a; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px;">
      🚀 今すぐ学習を始める
    </a>
  </div>

  <div style="background: #fdf4ff; border: 1px solid #e879f9; border-radius: 12px; padding: 15px; margin: 20px 0;">
    <p style="margin: 0; font-size: 14px;">
      💌 <strong>毎月、感想をお聞かせください！</strong><br>
      感想を送っていただいた方に、翌月の割引クーポンをプレゼントします。
      毎月末にフォームのリンクをメールでお送りします。
    </p>
  </div>

  <p style="color: #6b7280; font-size: 13px; margin-top: 30px;">
    ご不明な点は support@aipuru-hu.net までお気軽にご連絡ください。<br>
    あなたの合格を心から応援しています！🌸
  </p>
</body>
</html>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
