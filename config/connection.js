
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

// MONGODB_URI ="mongodb+srv://<username>:<password>@cluster0.nhwls.mongodb.net/social-network?retryWrites=true&w=majority"
//  use this url if you are on local host "mongodb://localhost:27017/social-network"

export default function connectDB() {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-network");
}
