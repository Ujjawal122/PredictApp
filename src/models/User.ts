import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  phone: string;
  email:string;
  password:string;
  role: "asha" | "clinic" | "official" | "admin";
  language: string;
  verifyCode:string;
  verifyCodeExpiry:Date;
  isVerified:boolean;
  isAccetingMessage:boolean;
  location?: { lat: number; lng: number };
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ["asha", "clinic", "official", "admin"], required: true },
    language: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
       verifyCode:{
            type:String,
            required:[false,"verify Code is required"],
            default: ""
        },
        verifyCodeExpiry:{
            type:Date,
            required:[false,"verify Code expiry is required"],
            default: Date.now
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAccetingMessage:{
            type:Boolean,
            default:false
        }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
