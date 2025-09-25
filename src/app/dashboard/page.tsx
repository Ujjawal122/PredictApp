"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, StickyNote, Calendar, Activity, Droplet, AlertTriangle, Users } from "lucide-react";

interface HealthReport {
  reporter: string;
  location: string;
  symptoms: string[];
  notes?: string;
  createdAt: string;
}

interface WaterReport {
  reporter: string;
  location: string;
  issue?: string[];
  notes?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [healthReports, setHealthReports] = useState<HealthReport[]>([]);
  const [waterReports, setWaterReports] = useState<WaterReport[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, waterRes] = await Promise.all([
          axios.get("/api/reports").catch(err => {
            console.error("Health reports fetch failed:", err.response?.data || err);
            return { data: { reports: [] } };
          }),
          axios.get("/api/water").catch(err => {
            console.error("Water reports fetch failed:", err.response?.data || err);
            return { data: { reports: [] } };
          }),
        ]);

        const healthReportsData: HealthReport[] = healthRes.data.reports || [];
        const waterReportsData: WaterReport[] = waterRes.data.reports || [];

        setHealthReports(healthReportsData);
        setWaterReports(waterReportsData);

        const newAlerts: string[] = [];
        if (healthReportsData.some(r => r.symptoms?.includes("Diarrhea"))) {
          newAlerts.push("🚨 High number of diarrhea cases detected!");
        }
        if (waterReportsData.some(r => r.notes?.includes("Dirty Water"))) {
          newAlerts.push("⚠️ Unsafe water detected in some villages!");
        }
        setAlerts(newAlerts);

      } catch (err) {
        console.error("Unexpected dashboard fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const topStats = [
    { title: "Health Reports", value: healthReports.length, icon: <Activity className="w-6 h-6 text-blue-600" /> },
    { title: "Water Reports", value: waterReports.length, icon: <Droplet className="w-6 h-6 text-teal-600" /> },
    { title: "Active Alerts", value: alerts.length, icon: <AlertTriangle className="w-6 h-6 text-red-600" /> },
    { title: "At-Risk Villages", value: new Set([...healthReports.map(r => r.location), ...waterReports.map(r => r.location)]).size, icon: <Users className="w-6 h-6 text-purple-600" /> },
  ];

  const combinedReports = [
    ...healthReports.map(r => ({ type: 'health', data: r })),
    ...waterReports.map(r => ({ type: 'water', data: r }))
  ].sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime());

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-green-50 p-6">

      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8 p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-none">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/dashboard/report" className="px-4 py-2 bg-blue-600 bg-opacity-80 text-white rounded hover:bg-blue-700 transition">Health Reports</Link>
          <Link href="/dashboard/water" className="px-4 py-2 bg-teal-600 bg-opacity-80 text-white rounded hover:bg-teal-700 transition">Water Reports</Link>
          <Link href="/predict" className="px-4 py-2 bg-teal-600 bg-opacity-80 text-white rounded hover:bg-teal-700 transition">Prediction</Link>
        </div>
      </nav>

      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-10 text-center text-gray-800">
        📊 Health & Water Monitoring Dashboard
      </motion.h1>

      {/* Top Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        {topStats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
            <Card className="hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex items-center gap-2">{stat.icon}<CardTitle>{stat.title}</CardTitle></CardHeader>
              <CardContent className="text-3xl font-bold text-gray-800">{stat.value}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader><CardTitle>⚠️ Active Alerts</CardTitle></CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <ul className="space-y-3">{alerts.map((a, i) => <li key={i} className="p-3 border rounded-md bg-red-100 text-red-700 shadow-sm">{a}</li>)}</ul>
            ) : (
              <p className="text-gray-500">✅ No active alerts right now.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Reports */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="shadow-xl rounded-2xl">
          <CardHeader><CardTitle>🧾 Recent Health & Water Reports</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {combinedReports.length > 0 ? combinedReports.map((r, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border shadow hover:shadow-md transition-all">
                <p className="font-semibold text-gray-800">{r.data.reporter}</p>
                <p className="flex items-center text-sm text-gray-500 gap-1"><MapPin className="h-4 w-4 text-red-500" />{r.data.location}</p>
                <Separator className="my-2" />
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <StickyNote className={`h-4 w-4 ${r.type === 'health' ? 'text-green-600' : 'text-cyan-600'}`} />
                  {'symptoms' in r.data ? r.data.symptoms.join(", ") : r.data.issue?.join(", ")}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700"><Calendar className="h-4 w-4 text-purple-600" />{new Date(r.data.createdAt).toLocaleString()}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {'symptoms' in r.data
                    ? r.data.symptoms.map((s, i) => <Badge key={i} className="bg-red-100 text-red-700">{s}</Badge>)
                    : r.data.issue?.map((i2, j) => <Badge key={j} className="bg-cyan-100 text-cyan-700">{i2}</Badge>)
                  }
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-center">No reports available.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
