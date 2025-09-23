"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/auth/login", form);
    const data = res.data;
    router.push('/dashboard')

  
  } catch (err: any) {
    alert(err.response?.data?.error || "Login failed");
  }
};



  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-[400px] shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-green-600">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <Button className="w-full" type="submit"
              onClick={handleSubmit}
              >
                Login
              </Button>
            </form>
            <p className="text-center text-gray-400 text-sm mt-6">
              New user?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:underline"
              >
                Sign up here
              </Link>
            </p>
             
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
