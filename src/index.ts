import express from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/router.js";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

dotenv.config();

const app = express();

app.use(cors(), express.json(), router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;
app.listen(PORT);
