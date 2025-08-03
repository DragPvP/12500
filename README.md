# PepeWuff Presale Platform

A cryptocurrency token presale platform built with React, TypeScript, and Express.js. Features wallet integration, real-time presale data, countdown timers, and support for multiple cryptocurrencies (ETH, BNB, SOL, USDT).

## Quick Start

### Local Development

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/DragPvP/PepeWuff.git
   cd PepeWuff
   npm install
   ```

2. Set up environment variables:
   ```bash
   # Create .env file with your database configuration
   DATABASE_URL=your_postgresql_url
   NODE_ENV=development
   PORT=5000
   ```

3. Set up database schema:
   ```bash
   npm run db:push
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Production Deployment

#### Deploy to Vercel

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the `vercel.json` configuration
   - Set environment variables in Vercel dashboard:
     - `DATABASE_URL`
     - `NODE_ENV=production`

The application includes:
- **Frontend**: React SPA with wallet integration and responsive design
- **Backend**: Express.js API with serverless functions for Vercel
- **Database**: PostgreSQL with Drizzle ORM
- **Wallet Support**: Multi-chain wallet connectivity (ETH, BNB, TRX)
- **Payment Methods**: Native tokens and stablecoins with QR code support

## API Endpoints

- `GET /api/presale` - Get presale data and statistics
- `POST /api/presale/calculate` - Calculate token amounts for payments
- `GET /api/wallet/purchase?address=<wallet>` - Get wallet purchase history
- `POST /api/wallet/purchase` - Record new wallet purchase

## Project Structure

```
├── client/           # React frontend application
├── server/           # Express.js backend (development)
├── api/              # Vercel serverless functions (production)
├── shared/           # Shared types and schemas
├── dist/             # Built application files
└── vercel.json       # Vercel deployment configuration
```

## Prerequisites

- **Node.js 18+**: Required for running the application
- **npm**: Package manager
- **PostgreSQL**: Database (local or hosted like Neon)

## Environment Variables

```bash
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=development
PORT=5000
```

## Vercel Deployment Issues Fixed

The previous 404 NOT_FOUND error was resolved by:
1. Creating proper Vercel serverless functions in `/api/` directory
2. Simplifying the `vercel.json` configuration
3. Ensuring static files are properly served from `dist/public`
4. Adding proper TypeScript support for Vercel functions

## Common Issues

**404 Errors on Vercel:**
- Ensure `vercel.json` has correct `outputDirectory: "dist/public"`
- Verify API functions are in `/api/` directory
- Check that build command completes successfully

**Database Connection:**
- Update `DATABASE_URL` environment variable
- Run `npm run db:push` to sync schema
- Ensure database is accessible from deployment environment