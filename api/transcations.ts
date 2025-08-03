import { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, sql } from "drizzle-orm";

// Inline schema definition to avoid import issues in Vercel
import { pgTable, varchar, text, decimal, timestamp } from "drizzle-orm/pg-core";

const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull(),
  currency: text("currency").notNull(),
  payAmount: decimal("pay_amount", { precision: 18, scale: 8 }).notNull(),
  receiveAmount: decimal("receive_amount", { precision: 18, scale: 2 }).notNull(),
  txHash: text("tx_hash"),
  status: text("status").notNull().default("pending"),
  referralCode: text("referral_code"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema: { transactions } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      // Create new transaction
      const { walletAddress, currency, payAmount, receiveAmount, referralCode } = req.body;
      
      if (!walletAddress || !currency || !payAmount || !receiveAmount) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await db.insert(transactions).values({
        walletAddress,
        currency,
        payAmount: payAmount.toString(),
        receiveAmount: receiveAmount.toString(),
        referralCode: referralCode || null,
      }).returning();

      res.json({ success: true, transaction: result[0] });
      
    } else if (req.method === 'GET') {
      // Get transactions by wallet address
      const { address } = req.query;
      
      if (!address) {
        return res.status(400).json({ message: "Wallet address required" });
      }

      const userTransactions = await db
        .select()
        .from(transactions)
        .where(eq(transactions.walletAddress, address as string))
        .orderBy(transactions.createdAt);

      // Calculate totals
      const totalTokens = userTransactions.reduce((sum, tx) => sum + parseFloat(tx.receiveAmount.toString()), 0);
      const totalSpent = userTransactions.reduce((sum, tx) => sum + parseFloat(tx.payAmount.toString()), 0);

      res.json({
        transactions: userTransactions,
        totalTokens: totalTokens.toLocaleString(),
        totalSpent: totalSpent.toFixed(4),
        transactionCount: userTransactions.length
      });
      
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Transaction API error:', error);
    res.status(500).json({ message: "Failed to process transaction request" });
  }
}
