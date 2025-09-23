"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Activity, AlertTriangle, Users } from "lucide-react";
import Link from "next/link";

// ✅ Corrected Parent container variant
// It only orchestrates the children's animations, avoiding the conflict.
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Child animation (for each FeatureCard) remains the same
const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800">
          Smart Community Health Monitoring
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Early warning system for water-borne diseases in rural Northeast
          India. Empowering communities with real-time alerts, AI-driven
          insights, and health awareness.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
             SignUp
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
      >
        <FeatureCard
          icon={<Droplets className="h-10 w-10 text-blue-600" />}
          title="Water Quality Monitoring"
          desc="Track turbidity, pH, and bacterial presence via IoT sensors and water tests."
        />
        <FeatureCard
          icon={<Activity className="h-10 w-10 text-green-600" />}
          title="AI-Powered Outbreak Prediction"
          desc="Detect early patterns of disease using health reports, seasonal trends, and ML models."
        />
        <FeatureCard
          icon={<AlertTriangle className="h-10 w-10 text-red-600" />}
          title="Real-Time Alerts"
          desc="Send SMS and app notifications to health officials and communities when risk is high."
        />
        <FeatureCard
          icon={<Users className="h-10 w-10 text-purple-600" />}
          title="Community Involvement"
          desc="Enable ASHA workers and villagers to report symptoms through a multilingual app."
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={childVariant}
      whileHover={{ scale: 1.05 }}
      className="w-full h-full"
    >
      <Card className="rounded-2xl shadow-lg hover:shadow-xl transition bg-white h-full flex flex-col">
        <CardHeader className="flex flex-col items-center">
          {icon}
          <CardTitle className="mt-4 text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 text-center">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}