"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  MapPin,
  Droplets,
  StickyNote,
  Calendar,
} from "lucide-react";

export default function WaterReportPage() {
  const [form, setForm] = useState({
    reporter: "",
    phone: "",
    location: "",
    issue: "",
    notes: "",
  });
  const [reports, setReports] = useState<any[]>([]);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/water");
        setReports(res.data.reports || []);
      } catch (error) {
        console.error("Error fetching water reports:", error);
      }
    };
    fetchReports();
  }, []);

  // Submit new report
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/water-reports", {
        ...form,
        issue: form.issue.split(",").map((s) => s.trim()),
      });
      alert("✅ Water report submitted!");

      // Refresh
      const res = await axios.get("/api/water-reports");
      setReports(res.data.reports || []);

      setForm({ reporter: "", phone: "", location: "", issue: "", notes: "" });
    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-100 to-green-50 p-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          💧 Community Water Reporting
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Help us track water-related issues in your community.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="shadow-xl rounded-2xl border border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-700">
                Submit a Water Report
              </CardTitle>
              <CardDescription>
                Provide details about water problems in your area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Reporter</Label>
                  <Input
                    value={form.reporter}
                    onChange={(e) =>
                      setForm({ ...form, reporter: e.target.value })
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Village/Town"
                    required
                  />
                </div>
                <div>
                  <Label>Issue (comma separated)</Label>
                  <Input
                    value={form.issue}
                    onChange={(e) =>
                      setForm({ ...form, issue: e.target.value })
                    }
                    placeholder="e.g. Dirty Water, Low Pressure"
                    required
                  />
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Any extra details..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition transform hover:scale-105"
                >
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="shadow-xl rounded-2xl border border-green-100">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-700">
                Recent Water Reports
              </CardTitle>
              <CardDescription>
                Live updates from the community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {reports.length > 0 ? (
                reports.map((report, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-white rounded-xl border shadow hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="bg-blue-100">
                        <AvatarFallback>
                          {report.reporter?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {report.reporter}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-red-500" />
                          {report.location}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="grid gap-1 text-sm text-gray-700">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        {report.phone || "N/A"}
                      </p>
                      <p className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-cyan-600" />
                        {report.issue?.join(", ") || "N/A"}
                      </p>
                      <p className="flex items-center gap-2">
                        <StickyNote className="h-4 w-4 text-yellow-600" />
                        {report.notes || "N/A"}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        {report.createdAt
                          ? new Date(report.createdAt).toLocaleString()
                          : "Unknown"}
                      </p>
                    </div>

                    {/* Badges for issues */}
                    {report.issue?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {report.issue.map((sym: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-cyan-100 text-cyan-700"
                          >
                            {sym}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">
                  No water reports yet.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
