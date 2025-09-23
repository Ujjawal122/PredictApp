import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  type: "outbreak" | "water_contamination";
  severity: number;
  payload: Record<string, any>;
  acknowledged: boolean;
  createdAt: Date;
}

const AlertSchema: Schema = new Schema(
  {
    type: { type: String, enum: ["outbreak", "water_contamination"], required: true },
    severity: { type: Number, min: 1, max: 5, required: true },
    payload: { type: Schema.Types.Mixed },
    acknowledged: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Alert || mongoose.model<IAlert>("Alert", AlertSchema);
