import express from 'express';
import { createDevice, heartbeat, listDevices, removeDevice, updateDevice } from '../controllers/deviceController.js';
import userAuth from '../middleware/userAuth.js';


const deviceRoutes=express.Router();

deviceRoutes.post("/", userAuth, createDevice); 
deviceRoutes.get("/list", listDevices);
deviceRoutes.patch("/:id", updateDevice);
deviceRoutes.delete("/:id", removeDevice);
deviceRoutes.post("/:id/heartbeat", heartbeat);


export default deviceRoutes;
