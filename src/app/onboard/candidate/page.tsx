"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import CandidateMapPicker from "./CandidateMapPicker";

export default function CandidateOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    photo: null as File | null,
    location: null as { lat: number; lng: number } | null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, phone: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalData = new FormData();
    const { location, ...rest } = formData;
    if (location) {
        finalData.append("location", JSON.stringify(location));
    }

    Object.entries(rest).forEach(([key, value]) => {
        if (value) {
            finalData.append(key, value);
        }
    });

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: finalData,
      });

      if (res.ok) {
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (loginRes?.ok) {
          localStorage.setItem('onboardingComplete', 'true');
          router.push("/dashboard");
        } else {
          setError("Account created, but auto-login failed. Please log in manually.");
          setTimeout(() => router.push('/auth/login'), 3000);
        }
      } else {
        const data = await res.json();
        setError(data.message || "Onboarding failed. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`An unexpected error occurred: ${err.message}`);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Candidate Onboarding</h2>
      <div className="w-full max-w-sm bg-gray-50 p-6 rounded shadow">
        {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">Step 1: Account Details</h3>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="p-2 rounded border"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password"  className="text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="p-2 rounded border"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button onClick={handleNext} className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mt-2">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center text-gray-800">Step 2: Profile Details</h3>
             <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className="p-2 rounded border"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                />
            </div>
             <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="1234567890"
                    className="p-2 rounded border"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Profile Photo</label>
                {photoPreview && (
                  <Image src={photoPreview} alt="Profile Preview" width={96} height={96} className="w-24 h-24 rounded-full mx-auto my-2 object-cover" />
                )}
                <label className="w-full flex flex-col items-center px-4 py-3 bg-white text-indigo-600 rounded-lg shadow-sm tracking-wide uppercase border border-indigo-500 cursor-pointer hover:bg-indigo-600 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4 4-4-4h3v-4h2v4z" />
                    </svg>
                    <span className="mt-1 text-sm leading-normal">Choose profile pic</span>
                    <input type='file' className="hidden" name="photo" accept="image/*" onChange={handleInputChange} />
                </label>
            </div>
            <CandidateMapPicker
              onLocationSelect={(location: { lat: number, lng: number }) => setFormData(prev => ({ ...prev, location }))}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            />
            <div className="flex gap-4 mt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">
                    Back
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                    Submit
                </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 