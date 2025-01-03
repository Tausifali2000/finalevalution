import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

//Connecting to mongoDB
export const connectDB = async () => {

  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI); //using connection string
    console.log("MongoDB connected: "+ conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB: "+ error.message);
    process.exit(1);
  }
}
