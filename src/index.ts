import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors(), express.json(), router);

const PORT = process.env.PORT;
app.listen(PORT);
