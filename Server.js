import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';
import logRoutes from './routes/logRoutes.js';
import { autoDeactivateDevices } from './jobs/deviceJobs.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
const dburl=process.env.MONGODB_URL;

mongoose.connect(dburl)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log(err.message);
    console.log(err);
  });

  
autoDeactivateDevices();
const app=express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const allowedOrigins=['http://localhost:3000']
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, try again after a minute",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials : true}));


app.use('/auth',userRoutes);
app.use('/device',deviceRoutes);
app.use('/devices',logRoutes);