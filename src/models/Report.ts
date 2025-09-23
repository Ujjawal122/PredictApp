import mongoose, { Schema, model, models } from "mongoose";

const ReportSchema = new Schema(
  {
    reporter: { type: String, required: true }, 
    phone: { type: String },
    location: { type: String, required: true },
    symptoms: { type: [String], required: true }, 
    notes: { type: String },
    dateReported: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Report = models.Report || model("Report", ReportSchema);
export default Report;
