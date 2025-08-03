import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { insertTransactionSchema, insertReferralCodeSchema } from "@shared/schema";
import { z } from "zod";
// Wallet purchase tracking will now use database transactions instead of file storage

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve attached assets
  app.use('/api/assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));
  
  // Serve img folder
  app.use('/img', express.static(path.resolve(import.meta.dirname, '..', 'img')));
  // Get presale data
  app.get("/api/presale", async (req, res) => {
    try {
      const presaleData = await storage.getPresaleData();
      
      // Calculate percentage
      const totalRaised = parseFloat(presaleData.totalRaised);
      const goalAmount = parseFloat(presaleData.totalSupply); // Using totalSupply field as goal amount
      const percentage = goalAmount > 0 ? (totalRaised / goalAmount) * 100 : 0;
      
      res.json({
        ...presaleData,
        percentage: percentage.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch presale data" });
    }
  });

  // Calculate token amount
  app.post("/api/presale/calculate", async (req, res) => {
    try {
      const { currency, payAmount } = req.body;
      
      if (!currency || !payAmount || isNaN(payAmount) || payAmount <= 0) {
        return res.status(400).json({ message: "Invalid currency or amount" });
      }

      const presaleData = await storage.getPresaleData();
      const rate = parseFloat(presaleData.currentRate);
      
      // Mock exchange rates (in a real app, fetch from API)
      const exchangeRates = {
        ETH: 3500, // 1 ETH = 3500 USDT
        BNB: 600,  // 1 BNB = 600 USDT
        SOL: 100,  // 1 SOL = 100 USDT
        USDT: 1    // 1 USDT = 1 USDT
      };

      const usdtValue = payAmount * (exchangeRates[currency as keyof typeof exchangeRates] || 1);
      const tokenAmount = usdtValue * rate;

      res.json({
        currency,
        payAmount: parseFloat(payAmount),
        usdtValue,
        tokenAmount,
        rate
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate token amount" });
    }
  });

  // Create transaction
  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      
      // Update total raised (in a real app, this would happen after transaction confirmation)
      const presaleData = await storage.getPresaleData();
      const currentRaised = parseFloat(presaleData.totalRaised);
      
      // Calculate USDT value
      const exchangeRates = {
        ETH: 3500,
        BNB: 600,
        SOL: 100,
        USDT: 1
      };
      
      const usdtValue = parseFloat(validatedData.payAmount) * (exchangeRates[validatedData.currency as keyof typeof exchangeRates] || 1);
      const rate = parseFloat(presaleData.currentRate);
      const tokenAmount = (usdtValue * rate).toString();
      
      await storage.updatePresaleData({
        totalRaised: (currentRaised + usdtValue).toString()
      });

      // Transaction is already saved in database, no need for separate file storage

      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });

  // Get transactions for wallet
  app.get("/api/transactions/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const transactions = await storage.getTransactionsByWallet(walletAddress);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Validate referral code
  app.get("/api/referral/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const referralCode = await storage.getReferralCode(code);
      
      if (!referralCode || !referralCode.isActive) {
        return res.status(404).json({ message: "Invalid or inactive referral code" });
      }

      res.json({
        code: referralCode.code,
        discountPercent: referralCode.discountPercent,
        isValid: true
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to validate referral code" });
    }
  });

  // Get wallet purchases (using database transactions)
  app.get("/api/wallet/purchase", async (req, res) => {
    try {
      const { address } = req.query;
      if (!address) {
        return res.status(400).json({ message: "Wallet address is required" });
      }
      
      const transactions = await storage.getTransactionsByWallet(address as string);
      
      // Transform database transactions to match wallet purchase format
      const walletPurchases = transactions.map(tx => ({
        walletAddress: tx.walletAddress,
        walletName: `${tx.receiveAmount} PEPEWUFF`,
        amount: tx.payAmount,
        transactionHash: tx.txHash,
        timestamp: tx.createdAt.toISOString(),
        currency: tx.currency,
        usdtValue: parseFloat(tx.payAmount), // This would need proper conversion in real app
        tokenAmount: tx.receiveAmount
      }));
      
      res.json(walletPurchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet purchases" });
    }
  });

  // Record new wallet purchase (using database transactions)
  app.post("/api/wallet/purchase", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to record wallet purchase" });
    }
  });

  // Apply referral code
  app.post("/api/referral/apply", async (req, res) => {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ message: "Referral code is required" });
      }

      const referralCode = await storage.useReferralCode(code);
      
      if (!referralCode) {
        return res.status(404).json({ message: "Invalid or inactive referral code" });
      }

      res.json({
        code: referralCode.code,
        discountPercent: referralCode.discountPercent,
        applied: true
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to apply referral code" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
