import express from "express";
import giphyRoute from "./src/routes/giphy.route";
import { errorHandler } from "./src/controllers/error-handler.controller";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
  allowedHeaders: process.env.REACT_APP_URL
}))

app.use("/api/giphy", giphyRoute);

app.use("/health-check", (req, res) => {
  res.sendStatus(200);
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });
}

export default app;
