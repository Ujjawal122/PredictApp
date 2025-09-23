import mongoose, { Schema, Document } from "mongoose";

export interface IIntervention extends Document {
  alertId: mongoose.Types.ObjectId;
  officialId: mongoose.Types.ObjectId;
  action: string;
  status: "pending" | "in_progress" | "completed";
  updatedAt: Date;
}

const InterventionSchema: Schema = new Schema(
  {
    alertId: { type: Schema.Types.ObjectId, ref: "Alert", required: true },
    officialId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" }
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export default mongoose.models.Intervention ||
  mongoose.model<IIntervention>("Intervention", InterventionSchema);
