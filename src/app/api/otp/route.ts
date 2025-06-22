import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore: { [email: string]: string } = {};

export async function POST(req: NextRequest) {
  const { email, otp, action } = await req.json();
  if (action === "verify") {
    // OTP verification
    if (otpStore[email] === otp) {
      delete otpStore[email]; // Invalidate OTP after use
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  // Generate 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = generatedOtp;

  // Send OTP via Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${generatedOtp}`,
  });

  return NextResponse.json({ success: true });
}

export function verifyOtp(email: string, otp: string) {
  return otpStore[email] === otp;
} 