import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
  try {
    const conn= await mongoose.connect(process.env.MONGODB_URI);
    console.info(`Conexión establecida`);
  } catch (error) {
    console.error('Error de conexión', error);
    process.exit(1);
  }
};

export default connectDB;
