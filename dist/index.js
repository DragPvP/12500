// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";
import express from "express";
import path from "path";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  presaleData;
  transactions;
  referralCodes;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.transactions = /* @__PURE__ */ new Map();
    this.referralCodes = /* @__PURE__ */ new Map();
    this.presaleData = {
      id: randomUUID(),
      totalRaised: "76735.34",
      totalSupply: "200000",
      currentRate: "65",
      stageEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1e3 + 5 * 60 * 60 * 1e3 + 17 * 60 * 1e3 + 14 * 1e3),
      // 3 days, 5 hours, 17 mins, 14 secs from now
      isActive: true,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.referralCodes.set("WELCOME10", {
      id: randomUUID(),
      code: "WELCOME10",
      discountPercent: "10",
      isActive: true,
      usageCount: "0",
      createdAt: /* @__PURE__ */ new Date()
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getPresaleData() {
    return this.presaleData;
  }
  async updatePresaleData(data) {
    this.presaleData = { ...this.presaleData, ...data, updatedAt: /* @__PURE__ */ new Date() };
    return this.presaleData;
  }
  async createTransaction(insertTransaction) {
    const id = randomUUID();
    const transaction = {
      ...insertTransaction,
      id,
      txHash: null,
      status: "pending",
      referralCode: insertTransaction.referralCode || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }
  async getTransactionsByWallet(walletAddress) {
    return Array.from(this.transactions.values()).filter(
      (tx) => tx.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
  }
  async updateTransaction(id, data) {
    const transaction = this.transactions.get(id);
    if (!transaction) return void 0;
    const updatedTransaction = { ...transaction, ...data };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
  async getReferralCode(code) {
    return this.referralCodes.get(code.toUpperCase());
  }
  async createReferralCode(insertReferralCode) {
    const id = randomUUID();
    const referralCode = {
      ...insertReferralCode,
      id,
      code: insertReferralCode.code.toUpperCase(),
      discountPercent: insertReferralCode.discountPercent || "0",
      isActive: true,
      usageCount: "0",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.referralCodes.set(referralCode.code, referralCode);
    return referralCode;
  }
  async useReferralCode(code) {
    const referralCode = this.referralCodes.get(code.toUpperCase());
    if (!referralCode || !referralCode.isActive) return void 0;
    const updatedCode = {
      ...referralCode,
      usageCount: (parseInt(referralCode.usageCount) + 1).toString()
    };
    this.referralCodes.set(code.toUpperCase(), updatedCode);
    return updatedCode;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var presaleData = pgTable("presale_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalRaised: decimal("total_raised", { precision: 18, scale: 2 }).notNull().default("0"),
  totalSupply: decimal("total_supply", { precision: 18, scale: 2 }).notNull().default("1000000"),
  currentRate: decimal("current_rate", { precision: 18, scale: 8 }).notNull().default("47"),
  // PEPEWUFF per USDT
  stageEndTime: timestamp("stage_end_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").notNull(),
  currency: text("currency").notNull(),
  // ETH, BNB, SOL, USDT
  payAmount: decimal("pay_amount", { precision: 18, scale: 8 }).notNull(),
  receiveAmount: decimal("receive_amount", { precision: 18, scale: 2 }).notNull(),
  txHash: text("tx_hash"),
  status: text("status").notNull().default("pending"),
  // pending, completed, failed
  referralCode: text("referral_code"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var referralCodes = pgTable("referral_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  discountPercent: decimal("discount_percent", { precision: 5, scale: 2 }).notNull().default("0"),
  isActive: boolean("is_active").notNull().default(true),
  usageCount: decimal("usage_count", { precision: 10, scale: 0 }).notNull().default("0"),
  createdAt: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertTransactionSchema = createInsertSchema(transactions).pick({
  walletAddress: true,
  currency: true,
  payAmount: true,
  receiveAmount: true,
  referralCode: true
});
var insertReferralCodeSchema = createInsertSchema(referralCodes).pick({
  code: true,
  discountPercent: true
});

// server/routes.ts
import { z } from "zod";
import fs from "fs";
var WALLET_PURCHASES_FILE = path.resolve(import.meta.dirname, "wallet-purchases.json");
function loadWalletPurchases() {
  try {
    const data = fs.readFileSync(WALLET_PURCHASES_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
function saveWalletPurchases(purchases) {
  fs.writeFileSync(WALLET_PURCHASES_FILE, JSON.stringify(purchases, null, 2));
}
function addWalletPurchase(purchase) {
  const purchases = loadWalletPurchases();
  purchases.push(purchase);
  saveWalletPurchases(purchases);
}
async function registerRoutes(app2) {
  app2.use("/api/assets", express.static(path.resolve(import.meta.dirname, "..", "attached_assets")));
  app2.use("/img", express.static(path.resolve(import.meta.dirname, "..", "img")));
  app2.get("/api/presale", async (req, res) => {
    try {
      const presaleData2 = await storage.getPresaleData();
      const totalRaised = parseFloat(presaleData2.totalRaised);
      const goalAmount = parseFloat(presaleData2.totalSupply);
      const percentage = goalAmount > 0 ? totalRaised / goalAmount * 100 : 0;
      res.json({
        ...presaleData2,
        percentage: percentage.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch presale data" });
    }
  });
  app2.post("/api/presale/calculate", async (req, res) => {
    try {
      const { currency, payAmount } = req.body;
      if (!currency || !payAmount || isNaN(payAmount) || payAmount <= 0) {
        return res.status(400).json({ message: "Invalid currency or amount" });
      }
      const presaleData2 = await storage.getPresaleData();
      const rate = parseFloat(presaleData2.currentRate);
      const exchangeRates = {
        ETH: 3500,
        // 1 ETH = 3500 USDT
        BNB: 600,
        // 1 BNB = 600 USDT
        SOL: 100,
        // 1 SOL = 100 USDT
        USDT: 1
        // 1 USDT = 1 USDT
      };
      const usdtValue = payAmount * (exchangeRates[currency] || 1);
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
  app2.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      const presaleData2 = await storage.getPresaleData();
      const currentRaised = parseFloat(presaleData2.totalRaised);
      const exchangeRates = {
        ETH: 3500,
        BNB: 600,
        SOL: 100,
        USDT: 1
      };
      const usdtValue = parseFloat(validatedData.payAmount) * (exchangeRates[validatedData.currency] || 1);
      const rate = parseFloat(presaleData2.currentRate);
      const tokenAmount = (usdtValue * rate).toString();
      await storage.updatePresaleData({
        totalRaised: (currentRaised + usdtValue).toString()
      });
      const walletPurchase = {
        walletAddress: validatedData.walletAddress,
        walletName: `${tokenAmount} PEPEWUFF`,
        amount: validatedData.payAmount,
        transactionHash: transaction.txHash || void 0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        currency: validatedData.currency,
        usdtValue,
        tokenAmount
      };
      addWalletPurchase(walletPurchase);
      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });
  app2.get("/api/transactions/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const transactions2 = await storage.getTransactionsByWallet(walletAddress);
      res.json(transactions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  app2.get("/api/referral/:code", async (req, res) => {
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
  app2.get("/api/wallet-purchases", async (req, res) => {
    try {
      const purchases = loadWalletPurchases();
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet purchases" });
    }
  });
  app2.get("/api/wallet-purchases/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const purchases = loadWalletPurchases();
      const walletPurchases = purchases.filter((p) => p.walletAddress.toLowerCase() === walletAddress.toLowerCase());
      res.json(walletPurchases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet purchases" });
    }
  });
  app2.put("/api/wallet-purchases/:walletAddress/name", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const { walletName } = req.body;
      if (!walletName) {
        return res.status(400).json({ message: "Wallet name is required" });
      }
      const purchases = loadWalletPurchases();
      const updatedPurchases = purchases.map(
        (p) => p.walletAddress.toLowerCase() === walletAddress.toLowerCase() ? { ...p, walletName } : p
      );
      saveWalletPurchases(updatedPurchases);
      res.json({ message: "Wallet name updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update wallet name" });
    }
  });
  app2.post("/api/referral/apply", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "80", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
