import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <h1 className="text-3xl font-bold mb-8 text-indigo-800">Welcome to Esolution Onboarding</h1>
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Link href="/onboard/candidate" className="bg-indigo-600 text-white rounded-lg py-3 px-6 text-center text-lg font-semibold shadow hover:bg-indigo-700 transition">Candidate Onboarding</Link>
        <Link href="/onboard/client" className="bg-blue-500 text-white rounded-lg py-3 px-6 text-center text-lg font-semibold shadow hover:bg-blue-600 transition">Client Onboarding</Link>
      </div>
    </div>
  );
}
