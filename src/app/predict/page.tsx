"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    Country: "",
    Region: "",
    Water_Source_Type: "",
    Water_Treatment_Method: "",
    Population: "",
    Literacy_Rate: "",
    Rainfall: "",
    Avg_Temperature: "",
    Sanitation_Coverage: "",
    Healthcare_Access_Index: "",
    GDP_Per_Capita: "",
    Year: "",
    Turbidity: "",
    Urbanization_Rate: "",
    Access_to_Clean_Water: "",
    Contaminant_Level: "",
    Nitrate_Level: "",
    Population_Density: "",
    Lead_Concentration: "",
    pH_Level: "",
    Dissolved_Oxygen: "",
    Bacteria_Count: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setErrors([]);

    try {
      const res = await axios.post("/api/predict", {
        ...Object.fromEntries(
          Object.entries(formData).map(([k, v]) => [k, isNaN(Number(v)) ? v : Number(v)])
        ),
      });
      setPrediction(res.data);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50">
      <h1 className="text-4xl font-bold text-center mb-10">💧 Waterborne Disease Prediction</h1>

      <Card className="max-w-4xl mx-auto p-6 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Input Environmental & Socio-economic Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <Label htmlFor={key}>{key.replace(/_/g, " ")}</Label>
                <Input
                  id={key}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-end mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
              </Button>
            </div>
          </form>

          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
              <ul className="list-disc list-inside">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {prediction && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4">
              <h2 className="font-semibold text-lg mb-2">Prediction Results:</h2>
              <ul className="space-y-1">
                <li>Diarrheal Cases: {prediction.Diarrheal_Cases}</li>
                <li>Cholera Cases: {prediction.Cholera_Cases}</li>
                <li>Typhoid Cases: {prediction.Typhoid_Cases}</li>
                <li>Infant Mortality Rate: {prediction.Infant_Mortality_Rate}</li>
                <li>Safe or UnSafe : {prediction.Safe_or_Unsafe}</li>
                <li>Probability : {prediction.Probability_Unsafe}</li>
                <li>Risk Level: {prediction.Risk_Level}</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
