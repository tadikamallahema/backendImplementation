import Device from "../models/Device.js";

export const createDevice = async ({ name, type, status, owner }) => {
  const device = new Device({ name, type, status, owner });
  await device.save();
  return device;
};

export const getDevices = async (filters = {}) => {
  return await Device.find(filters).populate("owner", "userId");
};

export const updateDevice = async (id, data) => {
  return await Device.findByIdAndUpdate(id, data, { new: true })
    .populate("owner", "userId");
};

export const deleteDevice = async (id) => {
  return await Device.findByIdAndDelete(id);
};

export const heartbeatDevice = async (id) => {
  return await Device.findByIdAndUpdate(
    id,
    { last_active_at: new Date(), status: "online" },
    { new: true }
  ).populate("owner", "userId");
};

