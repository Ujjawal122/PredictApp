import mongoose, { Schema, model, models } from "mongoose";

const WaterSchema = new Schema(
  {
    location: { type: String, required: true }, // Village / Block
    reporter: { type: String }, // optional - ASHA/volunteer/device ID
    phLevel: { type: Number, required: true }, // e.g. 6.5 - 8.5 is normal
    turbidity: { type: Number, required: true }, // NTU (nephelometric turbidity units)
    contamination: { type: String, enum: ["none", "mild", "severe"], default: "none" },
    notes: { type: String },
    dateTested: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Water = models.Water || model("Water", WaterSchema);
export default Water;
