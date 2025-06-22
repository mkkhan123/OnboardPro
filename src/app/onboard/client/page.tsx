"use client";
import { useState } from "react";
import ClientMapPicker from "./ClientMapPicker";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ClientOnboarding() {
  const [step, setStep] = useState<"email" | "otp" | "form">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const router = useRouter();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    // Call the OTP API
    const res = await fetch('/api/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStep("otp");
      alert("OTP sent to your email!");
    } else {
      alert("Failed to send OTP. Please check your email and try again.");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    // Call the OTP verification API
    const res = await fetch('/api/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, action: 'verify' }),
    });
    const data = await res.json();
    if (data.success) {
      setStep("form");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Client Onboarding</h2>
      {step === "email" && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4 w-full max-w-sm bg-gray-50 p-6 rounded shadow">
          <input
            type="email"
            placeholder="Business Email"
            className="p-2 rounded border"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Send OTP</button>
        </form>
      )}
      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 w-full max-w-sm bg-gray-50 p-6 rounded shadow">
          <input
            type="text"
            placeholder="Enter OTP"
            className="p-2 rounded border"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Verify OTP</button>
        </form>
      )}
      {step === "form" && (
        <form
          className="flex flex-col gap-4 w-full max-w-sm bg-gray-50 p-6 rounded shadow mt-8"
          onSubmit={e => {
            e.preventDefault();
            // TODO: handle form data, including logoFile
            router.push("/dashboard");
          }}
        >
          <input type="text" placeholder="Company Name" className="p-2 rounded border" required />
          <input type="text" placeholder="Contact Person" className="p-2 rounded border" required />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Company Logo</label>
            {logoPreview && (
              <Image src={logoPreview} alt="Company Logo Preview" width={96} height={96} className="w-24 h-24 rounded-full mx-auto my-2 object-cover" />
            )}
            <label className="w-full flex flex-col items-center px-4 py-3 bg-white text-blue-600 rounded-lg shadow-sm tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-600 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3v-4h2v4z" />
                </svg>
                <span className="mt-1 text-sm leading-normal">Select a logo</span>
                <input type='file' className="hidden" name="logo" accept="image/*" onChange={handleLogoChange} />
            </label>
          </div>
          <ClientMapPicker />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2">Submit</button>
        </form>
      )}
    </div>
  );
} 