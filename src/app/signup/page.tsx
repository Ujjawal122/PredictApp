"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "clinic",
    phone:""
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", form);

      if (res.status === 201 || res.status === 200) {
        alert("Signup successful! Please login.");
        router.push("/login"); // redirect to login page
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100"
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
            <CardTitle className="text-center text-2xl font-bold text-blue-600">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input
                  placeholder="Enter your username"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
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
              <div>
                <Label>Phone</Label>
                <Input
                  type="contact"
                  placeholder="Enter your Phone Number"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select onValueChange={(val) => setForm({ ...form, role: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASHA">asha</SelectItem>
                    <SelectItem value="CLINIC">clinic</SelectItem>
                    <SelectItem value="OFFICIAL">official</SelectItem>
                    <SelectItem value="ADMIN">admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
            <p className="mt-4 text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-purple-400 hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
