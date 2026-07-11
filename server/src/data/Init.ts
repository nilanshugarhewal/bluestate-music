import testingData from "./Data";
import prisma from "../lib/prisma";
import { log } from "node:console";
import dotenv from "dotenv";

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// USING STUFF
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// --------------------------------------------->
// --------------------------------------------->
// --------------------------------------------->

// INITIALIZING DB
const initializeData = async () => {
  try {
    await prisma.beat.deleteMany({});
    
    // We need to omit the 'id' field if we want Prisma to autogenerate it, 
    // or keep it if 'testingData' has specific strings for IDs.
    // If 'testingData' contains '_id' or 'id' that doesn't match Prisma's String/UUID, we might need to map it.
    // Let's assume testingData is compatible or we map it to Prisma's format.
    const formattedData = testingData.map(beat => {
      // Prisma expects bpm as Int, genre as String[]
      const { mood, price, description, ...rest } = beat as any;
      return {
        ...rest,
        bpm: beat.bpm ? parseInt(beat.bpm as any, 10) : null,
      };
    });

    await prisma.beat.createMany({
      data: formattedData,
    });

    log("Data is inserted in Database.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

initializeData();
