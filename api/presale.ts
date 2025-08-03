import { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { presaleData } from '../shared/schema';
import { desc } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    // Initialize database connection
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema: { presaleData } });

    // Get presale data
    const result = await db.select().from(presaleData).orderBy(desc(presaleData.updatedAt)).limit(1);
    
    let currentPresaleData;
    if (result.length === 0) {
      // Initialize presale data if none exists
      const initialData = {
        totalRaised: "76735.34",
        totalSupply: "200000",
        currentRate: "65",
        stageEndTime: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (17 * 60 * 1000) + (14 * 1000)), // 3 days, 5 hours, 17 mins, 14 secs from now
        isActive: true,
      };
      
      const created = await db.insert(presaleData).values(initialData).returning();
      currentPresaleData = created[0];
    } else {
      currentPresaleData = result[0];
    }
    
    // Calculate percentage
    const totalRaised = parseFloat(currentPresaleData.totalRaised);
    const goalAmount = parseFloat(currentPresaleData.totalSupply); // Using totalSupply field as goal amount
    const percentage = goalAmount > 0 ? (totalRaised / goalAmount) * 100 : 0;
    
    res.json({
      ...currentPresaleData,
      percentage: percentage.toFixed(2)
    });
  } catch (error) {
    console.error("Presale API error:", error);
    res.status(500).json({ message: "Failed to fetch presale data", error: error instanceof Error ? error.message : "Unknown error" });
  }
}