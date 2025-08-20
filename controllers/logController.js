import { createLog, getLogs, getAggregatedUsage } from "../services/logServices.js";

export const createLogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { event, value } = req.body;
    const log = await createLog(id, { event, value });
    res.json({
      success: true,
      log: {
        id: log.logId,
        event: log.event,
        value: log.value,
        timestamp: log.timestamp
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });  
  }
};

export const getLogsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10 } = req.query;

    const logs = await getLogs(id, parseInt(limit));
    
    res.json({
      success: true,
      logs: logs.map(log => ({
        id: log.logId,
        event: log.event,
        value: log.value,
        timestamp: log.timestamp
      }))
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUsageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { range = "24h" } = req.query;
    const usage = await getAggregatedUsage(id, range);
    res.json({
      success: true,
      device_id: usage.device_id,
      total_units_last_24h: usage.total_units_last_24h
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
