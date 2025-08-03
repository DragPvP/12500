import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const presaleData = pgTable("presale_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalRaised: decimal("total_raised", { precision: 18, scale: 2 }).notNull().default("0"),
  totalSupply: decimal("total_supply", { precision: 18, scale: 2 }).notNull().default("1000000"),
  currentRate: decimal("current_rate", { precision: 18, scale: 8 }).notNull().default("47"), // PEPEWUFF per USDT
  stageEndTime: timestamp("stage_end_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull(),
  currency: text("currency").notNull(), // ETH, BNB, SOL, USDT
  payAmount: decimal("pay_amount", { precision: 18, scale: 8 }).notNull(),
  receiveAmount: decimal("receive_amount", { precision: 18, scale: 2 }).notNull(),
  txHash: text("tx_hash"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  referralCode: text("referral_code"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const referralCodes = pgTable("referral_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  discountPercent: decimal("discount_percent", { precision: 5, scale: 2 }).notNull().default("0"),
  isActive: boolean("is_active").notNull().default(true),
  usageCount: decimal("usage_count", { precision: 10, scale: 0 }).notNull().default("0"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  walletAddress: true,
  currency: true,
  payAmount: true,
  receiveAmount: true,
  referralCode: true,
});

export const insertReferralCodeSchema = createInsertSchema(referralCodes).pick({
  code: true,
  discountPercent: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PresaleData = typeof presaleData.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type ReferralCode = typeof referralCodes.$inferSelect;
export type InsertReferralCode = z.infer<typeof insertReferralCodeSchema>;
