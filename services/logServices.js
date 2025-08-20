import Log from "../models/DeviceLog.js";
import Device from "../models/Device.js";

let logCounter = 1;
const generateLogId = () => `l${logCounter++}`;

export const createLog = async (deviceId, { event, value }) => {
  const device = await Device.findById(deviceId );
  if (!device) throw new Error("Device not found");
  const log = new Log({
    logId: generateLogId(),
    deviceId: device._id,
    event,
    value,
    timestamp: new Date()
  });
  await log.save();
  return log;
};

export const getLogs = async (deviceId, limit = 10) => {
  const device = await Device.findById( deviceId );
  if (!device) throw new Error("Device not found");
  const n = parseInt(limit);
  if (n === 0) return []; 
  const logs = await Log.find({ deviceId: device._id })
    .sort({ timestamp: -1 })
    .limit(limit);
  return logs;
};


export const getAggregatedUsage = async (deviceId, range = "24h") => {
  const device = await Device.findById( deviceId );
  if (!device) throw new Error("Device not found");
  let startTime = new Date();
  if (range === "24h") {
    startTime.setHours(startTime.getHours() - 24);
  }
  const logs = await Log.find({
    deviceId: device._id,
    event: "units_consumed",
    timestamp: { $gte: startTime }
  });
  const total = logs.reduce((sum, log) => sum + log.value, 0);
  return {
    device_id: device.dId,
    total_units_last_24h: total
  };
};
