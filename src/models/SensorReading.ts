import mongoose, { Schema, Document } from "mongoose";

export interface ISensorReading extends Document {
  sensorId: string;
  location: { lat: number; lng: number };
  reading: Record<string, number>;
  readingTime: Date;
}

const SensorReadingSchema: Schema = new Schema({
  sensorId: { type: String, required: true },
  location: { lat: Number, lng: Number },
  reading: { type: Map, of: Number },
  readingTime: { type: Date, default: Date.now }
});

export default mongoose.models.SensorReading ||
  mongoose.model<ISensorReading>("SensorReading", SensorReadingSchema);
