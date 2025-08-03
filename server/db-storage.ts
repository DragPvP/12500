import { 
  type User, 
  type InsertUser, 
  type PresaleData, 
  type Transaction, 
  type InsertTransaction,
  type ReferralCode,
  type InsertReferralCode,
  users,
  presaleData,
  transactions,
  referralCodes
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  async getPresaleData(): Promise<PresaleData> {
    const result = await db.select().from(presaleData).orderBy(desc(presaleData.updatedAt)).limit(1);
    
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
      return created[0];
    }
    
    return result[0];
  }

  async updatePresaleData(data: Partial<PresaleData>): Promise<PresaleData> {
    const current = await this.getPresaleData();
    const result = await db.update(presaleData)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(presaleData.id, current.id))
      .returning();
    return result[0];
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }

  async getTransactionsByWallet(walletAddress: string): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(eq(transactions.walletAddress, walletAddress))
      .orderBy(desc(transactions.createdAt));
  }

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction | undefined> {
    const result = await db.update(transactions)
      .set(data)
      .where(eq(transactions.id, id))
      .returning();
    return result[0];
  }
  
  async getReferralCode(code: string): Promise<ReferralCode | undefined> {
    const result = await db.select().from(referralCodes)
      .where(eq(referralCodes.code, code.toUpperCase()))
      .limit(1);
    return result[0];
  }

  async createReferralCode(referralCode: InsertReferralCode): Promise<ReferralCode> {
    const codeData = {
      ...referralCode,
      code: referralCode.code.toUpperCase()
    };
    const result = await db.insert(referralCodes).values(codeData).returning();
    return result[0];
  }

  async useReferralCode(code: string): Promise<ReferralCode | undefined> {
    const existing = await this.getReferralCode(code);
    if (!existing || !existing.isActive) return undefined;
    
    const newUsageCount = (parseInt(existing.usageCount) + 1).toString();
    const result = await db.update(referralCodes)
      .set({ usageCount: newUsageCount })
      .where(eq(referralCodes.id, existing.id))
      .returning();
    
    return result[0];
  }
}