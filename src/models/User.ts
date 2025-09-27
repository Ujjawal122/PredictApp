import bcrypt from "bcryptjs";
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
  resetPasswordToken?:string;
  resetPasswordExpiry?:number;
  location?: { lat: number; lng: number };
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
        resetPasswordToken:{
          type:String,
          default:null
        },
        resetPasswordExpiry:{
          type:Number,
          default:null
        }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);


UserSchema.pre("save",async function(next){
  const user=this as User;
  if(!user.isModified("password"))return next();
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);
  next();

})

UserSchema.methods.comparePassword=async function(
  candidatePassword:string
):Promise<boolean>{
  return bcrypt.compare(candidatePassword,this.password)
}



export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
