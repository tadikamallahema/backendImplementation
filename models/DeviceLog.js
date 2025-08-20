import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    logId: {
      type: String,
      required: true,
      unique: true, 
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, 
    },
    event: {
      type: String,
      required: true, 
    },
    value: {
      type: Number,
      required: true, 
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
