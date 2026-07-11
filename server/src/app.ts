import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// ROUTES IMPORTING
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// USAGE OF ESSENTIALS
dotenv.config();

const app = express();

// Security & Performance Middlewares
app.use(helmet()); // Adds security headers
app.use(compression()); // Gzips responses for faster loads
app.use(cors());
app.use(express.json());

// Basic Rate Limiter (Max 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// PRISMA HANDLES DB CONNECTION AUTOMATICALLY
// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// API & ROUTES

// PUBLIC ROUTES
app.use("/", publicRoutes);

// ADMIN ROUTES
app.use("/admin", adminRoutes);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// EXPORTING APP
export default app;
