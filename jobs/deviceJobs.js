import cron from "node-cron";
import Device from "../models/Device.js";


export const autoDeactivateDevices = () => {
  cron.schedule("0 * * * *", async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await Device.updateMany(
      { last_active_at: { $lt: twentyFourHoursAgo }, isActive: true },
      { isActive: false }
    );

    console.log(`Auto-deactivated ${result.modifiedCount} devices`);
  });
};
