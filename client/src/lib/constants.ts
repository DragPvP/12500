export const CURRENCIES = [
  {
    id: 'ETH',
    name: 'ETH',
    network: 'ERC-20',
    icon: '/img/ethereum.png',
    color: 'text-blue-500'
  },
  {
    id: 'USDT',
    name: 'USDT',
    network: 'ERC-20', 
    icon: '/img/tether.png',
    color: 'text-green-500'
  },
  {
    id: 'SOL',
    name: 'SOL',
    network: 'Solana',
    icon: '/img/solana.png',
    color: 'text-purple-500'
  },
  {
    id: 'BNB',
    name: 'BNB',
    network: 'BSC',
    icon: '/img/bnb.png',
    color: 'text-yellow-500'
  }
] as const;

export type CurrencyId = typeof CURRENCIES[number]['id'];

export const REOWN_PROJECT_ID = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID_HERE';

export const APP_METADATA = {
  name: 'PEPEWUFF Presale',
  description: 'PEPEWUFF Token Presale - Join the revolution',
  url: 'https://pepewuff.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};
