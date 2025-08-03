# PEPEWUFF Presale Platform

## Overview

Originally started as a simple Python Git clone script, this project has evolved into a full-stack web application for cryptocurrency token presale, providing a modern interface for users to connect wallets and purchase tokens with various cryptocurrencies (ETH, USDT, SOL, BNB).

## Recent Changes (August 3, 2025)

- ✓ Fixed Vercel deployment 500 Internal Server Error for `/api/presale` endpoint
- ✓ Refactored presale API to use direct database connection instead of complex storage imports
- ✓ Eliminated problematic TypeScript path aliases (`@shared/schema`) in serverless functions
- ✓ Updated `/api/presale.ts` to initialize database connection inline for Vercel compatibility
- ✓ Enhanced Vercel configuration with explicit function runtime settings
- ✓ Fixed token conversion NaN errors when entering ETH, SOL, BNB, USDT amounts
- ✓ Corrected API calculation endpoint to return proper numeric formats
- ✓ Enhanced frontend parsing to handle localized number strings safely
- ✓ Added NaN validation throughout conversion and countdown components
- ✓ Implemented live cryptocurrency prices using CoinGecko API for accurate conversions
- ✓ Added 5-minute price caching and automatic fallbacks for reliability
- ✓ Updated token rate calculation to match UI (1 USDT = 65 PEPEWUFF)
- ✓ Added proper error handling with detailed error messages for debugging
- ✓ Fixed Vercel deployment 404 errors for static images (mascot-logo.png, pepewuff-logo.png)
- ✓ Moved images from `client/img/` to `client/public/img/` for proper Vite asset serving
- ✓ Resolved static asset deployment issues for Vercel compatibility
- ✓ Removed obsolete Clone Script workflows from development environment
- ✓ Fixed Vercel deployment 404 NOT_FOUND errors by restructuring serverless functions
- ✓ Created dedicated API routes for Vercel in `/api/` directory:
  - `/api/presale.ts` - Presale data endpoint
  - `/api/presale/calculate.ts` - Token calculation endpoint  
  - `/api/wallet/purchase.ts` - Wallet purchase tracking
- ✓ Simplified `vercel.json` configuration for proper static file serving
- ✓ Updated build process to output to `dist/public` directory
- ✓ Installed `@vercel/node` package for proper Vercel function types
- ✓ Tested build process successfully - all assets compile without errors
- ✓ Created comprehensive README with deployment instructions
- ✓ Verified application functionality:
  - Website serves properly on port 80
  - API endpoints respond correctly (`/api/presale` working)
  - Frontend loads and displays presale data
  - Wallet integration functional
- ✓ Application ready for Vercel deployment with proper configuration

## Previous Changes (August 2, 2025)
- ✓ Created initial Git clone script for https://github.com/DragPvP/200000.git
- ✓ Successfully cloned repository with PEPEWUFF presale website
- ✓ Moved website files from cloned repository to project root 
- ✓ Installed all Node.js dependencies successfully
- ✓ Fixed React Query configuration by removing duplicate QueryClient instances
- ✓ Updated button text from "Connect Wallet First" to "Connect Wallet"
- ✓ Made Connect Wallet button functional - opens wallet connection modal
- ✓ Moved website containers 50% lower on the page for better layout
- ✓ Added mascot logo above buy container with layered positioning
- ✓ Reduced top margins by 20% for improved layout
- ✓ Increased mascot size by 30% for better visual impact
- ✓ Website running successfully on port 80 with proper asset serving
- ✓ All API endpoints responding correctly with presale data
- ✓ Server operational without errors
- ✓ Removed old Git clone script as requested by user
- ✓ Configured development server to run on correct port (80)
- ✓ Verified website functionality with presale data and wallet integration
- ✓ Updated wallet networks to ETH, BNB, TRX (EVM-compatible chains)
- ✓ Created Solana payment modal with QR code, copy functionality, and payment instructions
- ✓ Integrated modal to open when users select SOL currency for purchase
- ✓ Enhanced wallet information display with PEPEWUFF token balance and purchase history
- ✓ Moved wallet information to bottom of presale card for better UX
- ✓ Updated "How To Buy" section with custom 4-step process
- ✓ Removed Pro Tips and Security containers as requested
- ✓ Implemented wallet purchase tracking system with JSON file storage
- ✓ Added API endpoints for wallet purchase management and retrieval
- ✓ Applied consistent monospace font formatting to wallet information
- ✓ Fixed Share Link button positioning for mobile screens
- ✓ Removed old Git clone script as requested by user
- ✓ Reinstalled Node.js and all dependencies successfully
- ✓ Website server running on port 80 with development mode active
- ✓ Added smooth scroll functionality to "How To Buy" button to navigate to How To Buy section
- ✓ Fixed QR code generation in Solana payment modal with proper Solana Pay URL format
- ✓ Added multiple QR service fallbacks and error handling for better reliability
- ✓ Implemented backup QR display when external services fail
- ✓ Created native SVG QR code component using Solscan QR path data
- ✓ Replaced external QR services with reliable SVG-based QR code generation
- ✓ Eliminated dependency on external QR code APIs for better performance
- ✓ Improved Solana payment modal layout with centered QR code and better alignment
- ✓ Enhanced user experience with larger QR code and consistent field styling
- ✓ Repositioned pay amount and payment ID fields next to QR code for compact layout
- ✓ Created comprehensive Tokenomics section with 2B total supply display
- ✓ Added visual donut chart showing token distribution across 6 categories
- ✓ Integrated Tokenomics section below buy container with professional styling
- ✓ Replaced programmatic chart with user-provided tokenomics image  
- ✓ Removed stats legend and simplified to show only total supply and chart
- ✓ Completely removed tokenomics section from website as requested

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom 3D design system and CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Wallet Integration**: Reown AppKit (formerly WalletConnect v2) with Wagmi for multi-chain wallet connectivity

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage**: Dual storage pattern with in-memory storage (MemStorage) and database persistence
- **API Design**: RESTful API with structured error handling and request logging

### Database Design
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Shared schema definitions between client and server
- **Tables**: Users, presale data, transactions, and referral codes with proper relationships
- **Migration**: Drizzle Kit for database migrations and schema management

### Wallet Integration
- **Multi-chain Support**: Ethereum mainnet, Arbitrum, Polygon, and BSC networks
- **Wallet Providers**: Support for major wallet providers through Reown AppKit
- **Transaction Handling**: Real-time transaction status tracking and confirmation
- **Balance Queries**: Live wallet balance fetching and display

### Security & Data Flow
- **Type Safety**: End-to-end TypeScript with shared schema validation using Zod
- **Input Validation**: Server-side validation for all API endpoints
- **Session Management**: Express sessions with PostgreSQL session store
- **Environment Configuration**: Secure handling of sensitive configuration via environment variables

### Development & Deployment
- **Build Process**: Vite for frontend bundling, esbuild for server compilation
- **Development Tools**: Hot module replacement, error overlays, and TypeScript checking
- **Code Organization**: Monorepo structure with shared types and utilities
- **Asset Management**: Static asset serving with proper caching strategies

## External Dependencies

### Blockchain & Wallet Services
- **Reown (WalletConnect)**: Primary wallet connection service requiring project ID from dashboard.reown.com
- **Wagmi**: Ethereum wallet integration library for React applications
- **Viem**: Low-level Ethereum library for blockchain interactions
- **Neon Database**: Serverless PostgreSQL database hosting

### UI & Development
- **Radix UI**: Unstyled, accessible UI component primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form state management with validation

### Database & ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL operations
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Zod**: Schema validation library for runtime type checking

### Build & Development Tools
- **Vite**: Frontend build tool with React plugin
- **TSX**: TypeScript execution for server development
- **ESBuild**: Fast JavaScript/TypeScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Testing & Quality
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development debugging tools (conditional)