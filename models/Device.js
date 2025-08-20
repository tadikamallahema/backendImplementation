import mongoose from "mongoose";

let deviceCounter = 1;

const deviceSchema = new mongoose.Schema(
  {
  dId: { 
    type: String, 
    unique: true 
  }, 
  name: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["active", "inactive", "offline"], 
    default: "inactive" 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  last_active_at: { 
    type: Date, 
    default: null 
  }
}, { timestamps: true });


deviceSchema.pre("save", function (next) {
  if (this.isNew && !this.dId) {
    this.dId = `d${deviceCounter++}`;
  }
  next();
});

export default mongoose.model("Device", deviceSchema);

