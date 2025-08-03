import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

interface WalletPurchase {
  walletAddress: string;
  walletName: string;
  amount: string;
  transactionHash?: string;
  timestamp: string;
  currency: string;
  usdtValue: number;
  tokenAmount: string;
}

const WALLET_PURCHASES_FILE = path.join(process.cwd(), 'server', 'wallet-purchases.json');

function loadWalletPurchases(): WalletPurchase[] {
  try {
    const data = fs.readFileSync(WALLET_PURCHASES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveWalletPurchases(purchases: WalletPurchase[]): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(WALLET_PURCHASES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(WALLET_PURCHASES_FILE, JSON.stringify(purchases, null, 2));
  } catch (error) {
    console.error('Failed to save wallet purchases:', error);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const purchase: WalletPurchase = req.body;
      
      if (!purchase.walletAddress || !purchase.amount || !purchase.currency) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const purchases = loadWalletPurchases();
      purchases.push(purchase);
      saveWalletPurchases(purchases);

      res.json({ success: true, message: "Purchase recorded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to record purchase" });
    }
  } else if (req.method === 'GET') {
    try {
      const { address } = req.query;
      
      if (!address) {
        return res.status(400).json({ message: "Wallet address required" });
      }

      const purchases = loadWalletPurchases();
      const walletPurchases = purchases.filter(p => 
        p.walletAddress.toLowerCase() === (address as string).toLowerCase()
      );

      // Calculate total tokens purchased
      const totalTokens = walletPurchases.reduce((sum, purchase) => {
        const tokens = parseFloat(purchase.tokenAmount.replace(/,/g, ''));
        return sum + (isNaN(tokens) ? 0 : tokens);
      }, 0);

      res.json({
        purchases: walletPurchases,
        totalTokens: totalTokens.toLocaleString(),
        purchaseCount: walletPurchases.length
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wallet purchases" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}