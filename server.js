import express from "express";
import dotenv from "dotenv";
import Connection from "./config/db.js";
import schoolRoutes from "./routes/school-routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/schools", schoolRoutes);

const startServer = async () => {
  try {
    await Connection.query("SELECT 1");
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running in ${PORT}`);
    });
  } catch (e) {
    console.log("Error ", e);
  }
};

startServer();
