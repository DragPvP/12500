import { VercelRequest, VercelResponse } from '@vercel/node';

// Exchange rates (these would typically come from an API)
const exchangeRates = {
  ETH: 2400.00,
  BNB: 620.00,
  TRX: 0.12,
  SOL: 180.00,
  USDT: 1.00
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { currency, payAmount } = req.body;
    
    if (!currency || !payAmount || isNaN(payAmount) || payAmount <= 0) {
      return res.status(400).json({ message: "Invalid currency or amount" });
    }

    // Get exchange rate for the currency
    const rate = exchangeRates[currency as keyof typeof exchangeRates];
    if (!rate) {
      return res.status(400).json({ message: "Unsupported currency" });
    }

    // Convert to USDT value
    const usdtValue = parseFloat(payAmount) * rate;
    
    // PEPEWUFF token price: 1 USDT = 1000 PEPEWUFF tokens
    const tokenPrice = 0.001; // $0.001 per token
    const tokenAmount = usdtValue / tokenPrice;

    res.json({
      currency,
      payAmount: parseFloat(payAmount),
      usdtValue: usdtValue.toFixed(2),
      tokenAmount: tokenAmount.toLocaleString(),
      tokenPrice: tokenPrice
    });
  } catch (error) {
    res.status(500).json({ message: "Calculation failed" });
  }
}