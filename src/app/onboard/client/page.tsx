"use client";
import { useState } from "react";
import ClientMapPicker from "./ClientMapPicker";
import { useRouter } from "next/navigation";

export default function ClientOnboarding() {
  const [step, setStep] = useState<"email" | "otp" | "form">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

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
            // TODO: handle form data
            router.push("/dashboard");
          }}
        >
          <input type="text" placeholder="Company Name" className="p-2 rounded border" required />
          <input type="text" placeholder="Contact Person" className="p-2 rounded border" required />
          <label className="block text-sm font-medium text-gray-700">Company Logo
            <input type="file" accept="image/*" className="mt-1 block w-full" />
          </label>
          <ClientMapPicker />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2">Submit</button>
        </form>
      )}
    </div>
  );
} 