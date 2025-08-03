// Presale Contract Configuration
export const PRESALE_CONTRACT_ADDRESS = '0xe2Db113d16Af1D9fae9302c552a7bae4B8788E20'; // ETH/BNB payment address

// PEPEWUFF Token Contract Address (will be set after token deployment)
export const PEPEWUFF_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // Placeholder - update after token launch

// ERC20 Token Contract ABI for USDT transfers
export const ERC20_ABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "_to", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "type": "function"
  }
] as const;

// Presale Contract ABI
export const PRESALE_ABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "currency", "type": "string" },
      { "name": "referralCode", "type": "string" }
    ],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "type": "function"
  }
] as const;

// Token Contract Addresses by Network
export const TOKEN_ADDRESSES = {
  ETH: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86a33E6441E6e5B8c5B62e81C0c5C3f1Ec79b', // Replace with actual USDC address
  },
  BSC: {
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  },
  POLYGON: {
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  }
} as const;

// Network Chain IDs
export const CHAIN_IDS = {
  ETH: 1,
  BSC: 56,
  POLYGON: 137,
  ARBITRUM: 42161
} as const;

// Solana Configuration
export const SOLANA_WALLET_ADDRESS = 'AmnDX9PUtsCNjPxEXJ6oXS6tb4KEb6vz1Cgj27Dg1wqK';