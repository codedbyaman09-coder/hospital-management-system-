import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  if (SMTP_USER === 'your_email@gmail.com') {
    console.log(`[Mock Email] Verification link for ${email}: ${APP_URL}/verify-email?token=${token}`);
    return;
  }

  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"CityCare Hospital" <${SMTP_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Welcome to CityCare Hospital!</h2>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #009e90; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  if (SMTP_USER === 'your_email@gmail.com') {
    console.log(`[Mock Email] Password reset link for ${email}: ${APP_URL}/reset-password?token=${token}`);
    return;
  }

  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"CityCare Hospital" <${SMTP_USER}>`,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Please click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #0a335c; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">Reset Password</a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn't request a password reset, you can safely ignore this email. This link will expire in 1 hour.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
