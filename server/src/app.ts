import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
app.use(cors());
app.use(express.json());

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
