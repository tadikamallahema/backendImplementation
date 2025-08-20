import { createDevice as createDeviceService } from "../services/deviceServices.js";
import * as deviceService from "../services/deviceServices.js";

export const createDevice = async (req, res) => {   // instead of addDevice
  try {
    const device = await createDeviceService({ ...req.body, owner: req.user._id });
    res.json({ success: true, device:{
      id:device.dId,
      name:device.name,
      type:device.type,
      status:device.status,
      last_active_at:device.last_active_at,
      owner_id:device.owner.userId
    } });
    
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    
  }
};

export const listDevices = async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.status) filters.status = req.query.status;
    const devices = await deviceService.getDevices(filters);
    const formattedDevices = devices.map(d => ({
      id: d.dId,
      name: d.name,
      type: d.type,
      status: d.status,
      last_active_at: d.last_active_at,
      owner_id: d.owner?._id
    }));

    res.json({ success: true, device:formattedDevices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    
  }
};

export const updateDevice = async (req, res) => {
  try {
    const updated = await deviceService.updateDevice(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Device not found" });
    res.json({ success: true, device: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeDevice = async (req, res) => {
  try {
    const deleted = await deviceService.deleteDevice(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Device not found" });
    res.json({ success: true, message: "Device deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const heartbeat = async (req, res) => {
  try {
    const updated = await deviceService.heartbeatDevice(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: "Device not found" });
    res.json({ success: true,message:"Device heartbeat recorded ", 
      last_active_at:updated.last_active_at
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    
  }
};