import express, { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestRouter } from "./routes/request.routes";
import { prisma } from "./utils/_db";
import { friendRouter } from "./routes/friend.routes";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
  ],
  exposedHeaders: ["refreshtoken", "Authorization"],

  credentials: true,
};

dotenv.config();
const allowedOrigin = 'http://localhost:5173'
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors({
    origin: allowedOrigin,
    credentials: true, // Allow credentials
}));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/requests", requestRouter);
app.use("/friends" , friendRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Connected to the database");
});
