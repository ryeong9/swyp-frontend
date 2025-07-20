import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export async function sendEmail(to: string, subject: string, text: string) {
  const info = await transporter.sendMail({
    from: '"Swyp Team3" <kimmin5209@gmail.com>',
    to: to,
    subject: '[Swyp Team3] 회원가입 이메일 인증코드',
    text:
      '안녕하세요, Swyp Team3입니다. 회원가입을 위한 이메일 인증코드입니다.\n\n인증코드: ' +
      text +
      '\n\n감사합니다.',
  });
  console.log('Message sent: %s', info.messageId);

  return transporter.sendMail(info);
}
