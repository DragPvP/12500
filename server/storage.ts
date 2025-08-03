import { 
  type User, 
  type InsertUser, 
  type PresaleData, 
  type Transaction, 
  type InsertTransaction,
  type ReferralCode,
  type InsertReferralCode
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPresaleData(): Promise<PresaleData>;
  updatePresaleData(data: Partial<PresaleData>): Promise<PresaleData>;
  
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByWallet(walletAddress: string): Promise<Transaction[]>;
  updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction | undefined>;
  
  getReferralCode(code: string): Promise<ReferralCode | undefined>;
  createReferralCode(referralCode: InsertReferralCode): Promise<ReferralCode>;
  useReferralCode(code: string): Promise<ReferralCode | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private presaleData: PresaleData;
  private transactions: Map<string, Transaction>;
  private referralCodes: Map<string, ReferralCode>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.referralCodes = new Map();
    
    // Initialize presale data
    this.presaleData = {
      id: randomUUID(),
      totalRaised: "76735.34",
      totalSupply: "200000",
      currentRate: "65",
      stageEndTime: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (17 * 60 * 1000) + (14 * 1000)), // 3 days, 5 hours, 17 mins, 14 secs from now
      isActive: true,
      updatedAt: new Date(),
    };

    // Initialize some referral codes
    this.referralCodes.set("WELCOME10", {
      id: randomUUID(),
      code: "WELCOME10",
      discountPercent: "10",
      isActive: true,
      usageCount: "0",
      createdAt: new Date(),
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPresaleData(): Promise<PresaleData> {
    return this.presaleData;
  }

  async updatePresaleData(data: Partial<PresaleData>): Promise<PresaleData> {
    this.presaleData = { ...this.presaleData, ...data, updatedAt: new Date() };
    return this.presaleData;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      txHash: null,
      status: "pending",
      referralCode: insertTransaction.referralCode || null,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByWallet(walletAddress: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (tx) => tx.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
  }

  async updateTransaction(id: string, data: Partial<Transaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = { ...transaction, ...data };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  async getReferralCode(code: string): Promise<ReferralCode | undefined> {
    return this.referralCodes.get(code.toUpperCase());
  }

  async createReferralCode(insertReferralCode: InsertReferralCode): Promise<ReferralCode> {
    const id = randomUUID();
    const referralCode: ReferralCode = {
      ...insertReferralCode,
      id,
      code: insertReferralCode.code.toUpperCase(),
      discountPercent: insertReferralCode.discountPercent || "0",
      isActive: true,
      usageCount: "0",
      createdAt: new Date(),
    };
    this.referralCodes.set(referralCode.code, referralCode);
    return referralCode;
  }

  async useReferralCode(code: string): Promise<ReferralCode | undefined> {
    const referralCode = this.referralCodes.get(code.toUpperCase());
    if (!referralCode || !referralCode.isActive) return undefined;
    
    const updatedCode = {
      ...referralCode,
      usageCount: (parseInt(referralCode.usageCount) + 1).toString()
    };
    this.referralCodes.set(code.toUpperCase(), updatedCode);
    return updatedCode;
  }
}

import { DatabaseStorage } from "./db-storage";

export const storage = new DatabaseStorage();
