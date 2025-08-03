import { VercelRequest, VercelResponse } from '@vercel/node';

// Fallback exchange rates in case API fails
const fallbackRates = {
  ETH: 2400.00,
  BNB: 620.00,
  TRX: 0.12,
  SOL: 180.00,
  USDT: 1.00
};

// CoinGecko API mapping
const coinGeckoIds = {
  ETH: 'ethereum',
  BNB: 'binancecoin',
  TRX: 'tron',
  SOL: 'solana',
  USDT: 'tether'
};

// Cache for prices (5 minute cache)
let priceCache: { [key: string]: number } = {};
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchLivePrices(): Promise<{ [key: string]: number }> {
  try {
    const now = Date.now();
    
    // Return cached prices if still fresh
    if (now - lastFetch < CACHE_DURATION && Object.keys(priceCache).length > 0) {
      return priceCache;
    }

    const coinIds = Object.values(coinGeckoIds).join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Convert CoinGecko response to our format
    const rates: { [key: string]: number } = {};
    
    for (const [currency, coinId] of Object.entries(coinGeckoIds)) {
      if (data[coinId] && data[coinId].usd) {
        rates[currency] = data[coinId].usd;
      } else {
        // Use fallback if specific coin data is missing
        rates[currency] = fallbackRates[currency as keyof typeof fallbackRates];
      }
    }

    // Update cache
    priceCache = rates;
    lastFetch = now;
    
    console.log('Fetched live prices:', rates);
    return rates;
    
  } catch (error) {
    console.error('Failed to fetch live prices, using fallback:', error);
    return fallbackRates;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { currency, payAmount } = req.body;
    
    if (!currency || !payAmount || isNaN(payAmount) || payAmount <= 0) {
      return res.status(400).json({ message: "Invalid currency or amount" });
    }

    // Get live exchange rates
    const exchangeRates = await fetchLivePrices();
    
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
      rate: rate,
      priceSource: Object.keys(priceCache).length > 0 ? 'live' : 'fallback',
      lastUpdated: new Date(lastFetch).toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: "Calculation failed" });
  }
}