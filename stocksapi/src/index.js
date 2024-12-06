import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";
import { handleError } from "./error.js";
import { extractAuthHeader } from "./middleware.js";
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(json());
app.use(extractAuthHeader);
app.use(handleError);

app.use("/api", router);
app.use("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
