
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let userCounter = 1; 

const userSchema = new mongoose.Schema(
  {
  uId: { 
    type: String,
     unique: true 
    }, 
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], default: "user" 
  },
}, { timestamps: true });

userSchema.pre("save", function (next) {
  if (this.isNew && !this.uId) {
    this.uId = `u${userCounter++}`;
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);
