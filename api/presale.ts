import { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";

// Inline schema definition to avoid import issues in Vercel
import { pgTable, varchar, decimal, timestamp, boolean, sql } from "drizzle-orm/pg-core";

const presaleData = pgTable("presale_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalRaised: decimal("total_raised", { precision: 18, scale: 2 }).notNull().default("0"),
  totalSupply: decimal("total_supply", { precision: 18, scale: 2 }).notNull().default("1000000"),
  currentRate: decimal("current_rate", { precision: 18, scale: 8 }).notNull().default("47"),
  stageEndTime: timestamp("stage_end_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

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
        stageEndTime: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (17 * 60 * 1000) + (14 * 1000)),
        isActive: true,
      };
      
      const created = await db.insert(presaleData).values(initialData).returning();
      currentPresaleData = created[0];
    } else {
      currentPresaleData = result[0];
    }
    
    // Calculate percentage
    const totalRaised = parseFloat(currentPresaleData.totalRaised.toString());
    const goalAmount = parseFloat(currentPresaleData.totalSupply.toString());
    const percentage = goalAmount > 0 ? (totalRaised / goalAmount) * 100 : 0;
    
    res.json({
      id: currentPresaleData.id,
      totalRaised: currentPresaleData.totalRaised.toString(),
      totalSupply: currentPresaleData.totalSupply.toString(),
      currentRate: currentPresaleData.currentRate.toString(),
      stageEndTime: currentPresaleData.stageEndTime,
      isActive: currentPresaleData.isActive,
      updatedAt: currentPresaleData.updatedAt,
      percentage: percentage.toFixed(2)
    });
  } catch (error) {
    console.error("Presale API error:", error);
    res.status(500).json({ message: "Failed to fetch presale data", error: error instanceof Error ? error.message : "Unknown error" });
  }
}
