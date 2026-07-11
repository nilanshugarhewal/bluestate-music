import { Request, Response } from "express";
import express from "express";
import prisma from "../lib/prisma";
import apicache from "apicache";

import safeRoute from "../middlewares/safeRoute";

const router = express.Router();
const cache = apicache.middleware;

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// GET ALL BEATS ROUTES
router.get(
  "/",
  cache('5 minutes'),
  safeRoute(async (req: Request, res: Response) => {
    const beats = await prisma.beat.findMany({
      orderBy: { releaseDate: 'desc' },
    });
    res.status(200).json(beats);
  })
);

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
