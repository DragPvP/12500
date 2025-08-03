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
    
    // PEPEWUFF token price: 1 USDT = 65 PEPEWUFF tokens (as per UI)
    const tokenPrice = 1 / 65; // ~$0.0154 per token
    const tokenAmount = usdtValue / tokenPrice;

    // Validate calculations to prevent NaN
    if (isNaN(usdtValue) || isNaN(tokenAmount)) {
      return res.status(400).json({ message: "Invalid calculation result" });
    }

    res.json({
      currency,
      payAmount: parseFloat(payAmount),
      usdtValue: parseFloat(usdtValue.toFixed(2)),
      tokenAmount: parseFloat(tokenAmount.toFixed(2)),
      tokenPrice: tokenPrice,
      rate: rate
    });
  } catch (error) {
    res.status(500).json({ message: "Calculation failed" });
  }
}