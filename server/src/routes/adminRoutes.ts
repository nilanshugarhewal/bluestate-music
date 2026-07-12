import { Request, Response } from "express";
import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// ✅ Get all beats
router.get("/", async (req: Request, res: Response) => {
  try {
    const beats = await prisma.beat.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(beats);
  } catch (err) {
    console.error("Error fetching beats:", err);
    res.status(500).json({ error: "Failed to fetch beats" });
  }
});

// ✅ Get one beat by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const beat = await prisma.beat.findUnique({ where: { id: id as string } });
    if (!beat) {
      return res.status(404).json({ error: "Beat not found" });
    }
    res.status(200).json(beat);
  } catch (err) {
    console.error("Error fetching beat:", err);
    res.status(500).json({ error: "Failed to fetch beat" });
  }
});

// ✅ Create new beat
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      bpm,
      audioUrl,
      genre,
      mood,
      scale,
      duration,
      coverImage,
      beatCollection,
      purchaseLink,
      releaseDate,
    } = req.body;

    if (!title || !audioUrl) {
      return res.status(400).json({ error: "Title and audioUrl are required" });
    }

    const savedBeat = await prisma.beat.create({
      data: {
        title,
        bpm: parseInt(bpm, 10),
        audioUrl,
        genre: genre || [],
        scale,
        duration,
        coverImage,
        beatCollection,
        purchaseLink,
        releaseDate: new Date(releaseDate),
      }
    });

    res.status(201).json(savedBeat);
  } catch (err) {
    console.error("Error creating beat:", err);
    res.status(500).json({ error: "Failed to create beat" });
  }
});

// ✅ Update existing beat
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const {
      title,
      coverImage,
      audioUrl,
      duration,
      bpm,
      scale,
      genre,
      mood,
      purchaseLink,
      releaseDate,
    } = req.body;

    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (coverImage !== undefined) updateFields.coverImage = coverImage;
    if (audioUrl !== undefined) updateFields.audioUrl = audioUrl;
    if (duration !== undefined) updateFields.duration = duration;
    if (bpm !== undefined) updateFields.bpm = parseInt(bpm, 10);
    if (scale !== undefined) updateFields.scale = scale;
    if (genre !== undefined) updateFields.genre = genre;
    if (purchaseLink !== undefined) updateFields.purchaseLink = purchaseLink;
    if (releaseDate !== undefined) updateFields.releaseDate = new Date(releaseDate);

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update" });
    }

    const updatedBeat = await prisma.beat.update({
      where: { id: req.params.id as string },
      data: updateFields,
    });

    res.status(200).json({
      message: "Beat updated successfully!",
      beat: updatedBeat,
    });
  } catch (err) {
    console.error("Error updating beat:", err);
    // Prisma throws specific error when record to update not found (P2025)
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2025') {
       return res.status(404).json({ error: "Beat not found" });
    }
    res.status(500).json({ error: "Failed to update beat" });
  }
});


// ✅ Delete beat
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedBeat = await prisma.beat.delete({
      where: { id: req.params.id as string }
    });

    res.status(200).json({ message: "Beat deleted successfully!" });
  } catch (err) {
    console.error("Error deleting beat:", err);
    if (err && typeof err === 'object' && 'code' in err && err.code === 'P2025') {
       return res.status(404).json({ error: "Beat not found" });
    }
    res.status(500).json({ error: "Failed to delete beat" });
  }
});

export default router;
