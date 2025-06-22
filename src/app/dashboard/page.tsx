"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CandidateDetails from "./CandidateDetails";
import ClientDetails from "./ClientDetails";

const data = [
  { name: "Candidates", value: 60 },
  { name: "Clients", value: 40 },
];
const COLORS = ["#6366f1", "#3b82f6"];

export default function Dashboard() {
  const [selected, setSelected] = useState<"none" | "candidates" | "clients">("none");

  const handleBack = () => setSelected("none");

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-white">
      <h2 className="text-2xl font-bold mb-8 text-indigo-800">Dashboard</h2>
      <div className="w-full max-w-2xl bg-gray-50 rounded shadow p-8 flex flex-col items-center">
        {selected === "none" && (
            <div className="w-full h-64 flex items-center justify-center mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        onClick={(_, idx) => setSelected(idx === 0 ? "candidates" : "clients")}
                        isAnimationActive
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cursor="pointer" />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
             </div>
        )}

        {selected === "candidates" && <CandidateDetails onBack={handleBack} />}
        {selected === "clients" && <ClientDetails onBack={handleBack} />}

        {selected === "none" && (
          <div className="w-full text-center text-gray-500">Click a segment to drill down</div>
        )}
      </div>
    </div>
  );
} 