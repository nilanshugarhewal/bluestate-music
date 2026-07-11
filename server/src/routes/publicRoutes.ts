import { Request, Response } from "express";
import express from "express";
import prisma from "../lib/prisma";

import safeRoute from "../middlewares/safeRoute";

const router = express.Router();

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET ALL BEATS ROUTES
router.get(
  "/",
  safeRoute(async (req: Request, res: Response) => {
    const beats = await prisma.beat.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(beats);
  })
);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET 24 RANDOM BEATS
router.get("/random", async (req: Request, res: Response) => {
  // Using raw query for efficient random selection in PostgreSQL
  const beats = await prisma.$queryRaw`SELECT * FROM "Beat" ORDER BY RANDOM() LIMIT 24`;
  res.status(200).json(beats);
});

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET SINGLE BEAT DATA

router.get(
  "/track/:id",
  safeRoute(async (req: Request, res: Response) => {
    const { id } = req.params;
    const beat = await prisma.beat.findUnique({
      where: { id },
    });
    res.status(200).json(beat);
  })
);

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// EXPORT ROUTER
export default router;
