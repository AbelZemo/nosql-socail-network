import express from "express";
import connectDB from "./config/connection.js";
import routes from "./routes/index.js";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

connectDB();

app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`))