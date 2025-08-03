import { PresaleCard } from '@/components/presale-card';
import { ConnectButton } from '@/components/connect-button';

import { CheckCircle, Circle, Target, Rocket, Globe, TrendingUp, ChevronRight, ChevronLeft, Wallet, CreditCard, ArrowRight, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const buySteps = [
    {
      id: 1,
      title: "Set Up Your Wallet",
      icon: Wallet,
      color: "blue",
      description: "Start by setting up a secure crypto wallet to hold your PEPEWUFF Coins",
      content: "Start by setting up a secure crypto wallet to hold your PEPEWUFF Coins. We recommend using either MetaMask or Trust Wallet for the best experience. These wallets are secure, user-friendly, and fully compatible with PEPEWUFF Coin."
    },
    {
      id: 2,
      title: "Load Your Wallet",
      icon: CreditCard,
      color: "purple",
      description: "Add cryptocurrency to your wallet for purchasing PEPEWUFF Coins",
      content: "After setting up your wallet, you'll need to add ETH BNB SOL or USDT to pay for your PEPEWUFF Coins and transaction fees. You can purchase ETH BNB SOL or USDT directly within your wallet or transfer it from an exchange like Coinbase or Binance."
    },
    {
      id: 3,
      title: "Buy PEPEWUFF Coins",
      icon: ArrowRight,
      color: "pink",
      description: "Connect your wallet and purchase PEPEWUFF during the presale",
      content: "Visit the official PEPEWUFF Coin website and connect your wallet. Enter the amount of $PEPEWUFF you want to purchase, confirm the transaction in your wallet, and wait for the confirmation. Make sure to buy during the current presale phase for the best price."
    },
    {
      id: 4,
      title: "Get Your Hands on $PEPEWUFF",
      icon: Shield,
      color: "green",
      description: "Claim your tokens and participate in staking for rewards",
      content: "After the presale, you can claim your Punisher Coins directly from our dashboard. Your tokens will be sent to your connected wallet automatically. Hold your tokens for potential gains or participate in staking for additional rewards."
    }
  ];

  const phases = [
    {
      id: 1,
      title: "Development",
      icon: Target,
      color: "blue",
      status: "active",
      tasks: [
        { name: "Community Building", completed: true },
        { name: "Smart Contract Development", completed: true },
        { name: "Website and Social Media", completed: true },
        { name: "Presale Launch", completed: false, active: true }
      ]
    },
    {
      id: 2,
      title: "Launch",
      icon: Rocket,
      color: "purple",
      status: "upcoming",
      tasks: [
        { name: "Listing on Uniswap", completed: false },
        { name: "CoinMarketCap Application", completed: false },
        { name: "CoinGecko Application", completed: false }
      ]
    },
    {
      id: 3,
      title: "Expansion",
      icon: TrendingUp,
      color: "pink",
      status: "upcoming",
      tasks: [
        { name: "CEX Listings", completed: false },
        { name: "Staking Platform", completed: false },
        { name: "Strategic Partnerships", completed: false }
      ]
    },
    {
      id: 4,
      title: "Global Adoption",
      icon: Globe,
      color: "orange",
      status: "upcoming",
      tasks: [
        { name: "Tier 1 Exchange Listings", completed: false },
        { name: "International Marketing", completed: false },
        { name: "Adoption Initiatives", completed: false },
        { name: "Ecosystem Maturation", completed: false }
      ]
    }
  ];

  const currentPhaseData = phases[currentPhase];
  const currentStepData = buySteps[currentStep];
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 border-blue-500 text-blue-600",
      purple: "from-purple-500 to-purple-600 border-purple-500 text-purple-600",
      pink: "from-pink-500 to-pink-600 border-pink-500 text-pink-600",
      orange: "from-orange-500 to-orange-600 border-orange-500 text-orange-600",
      green: "from-green-500 to-green-600 border-green-500 text-green-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <img 
                    src="/img/pepewuff-logo.png" 
                    alt="PEPEWUFF" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#how-to-buy" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  How to Buy
                </a>
                <a href="#roadmap" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Roadmap
                </a>
              </nav>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 mt-[6vh]">
        {/* Mascot Logo */}
        <div className="flex justify-center mt-0 relative z-0">
          <img 
            src="/img/mascot-logo.png" 
            alt="PEPEWUFF Mascot" 
            className="w-[248px] h-[248px] sm:w-[312px] sm:h-[312px] lg:w-[374px] lg:h-[374px] object-contain drop-shadow-lg animate-bounce-subtle mt-[-9px] mb-[-70px] lg:mt-[-12px] lg:mb-[-90px]"
          />
        </div>
        
        <div className="border-4 border-black rounded-2xl overflow-hidden relative z-10">
          <PresaleCard />
        </div>
        

      </main>

      {/* How To Buy Section */}
      <section id="how-to-buy" className="bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How To Buy Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              How to Buy PEPEWUFF
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to participate in the PEPEWUFF presale and secure your tokens.
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {buySteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentStep
                        ? `bg-${step.color}-500`
                        : index < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                  {index < buySteps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Card */}
          <div className="max-w-2xl mx-auto">
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-${currentStepData.color}-500`}>
              {/* Card Header */}
              <div className={`bg-gradient-to-r from-${currentStepData.color}-500 to-${currentStepData.color}-600 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <currentStepData.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold opacity-90">STEP {currentStepData.id}</div>
                      <h3 className="text-2xl font-bold">{currentStepData.title}</h3>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-white/90">{currentStepData.description}</p>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {currentStepData.content}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-sm text-gray-500">
                  {currentStep + 1} of {buySteps.length}
                </div>

                <button
                  onClick={() => setCurrentStep(Math.min(buySteps.length - 1, currentStep + 1))}
                  disabled={currentStep === buySteps.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === buySteps.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Roadmap Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              PEPEWUFF Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our journey from presale to global adoption. Track our progress as we build the future of meme tokens.
            </p>
          </div>

          {/* Phase Navigation */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentPhase(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentPhase
                        ? `bg-${phase.color}-500`
                        : index < currentPhase 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                  {index < phases.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      index < currentPhase ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Phase Card */}
          <div className="max-w-2xl mx-auto">
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${getColorClasses(currentPhaseData.color).split(' ')[2]}`}>
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(currentPhaseData.color).split(' ')[0]} ${getColorClasses(currentPhaseData.color).split(' ')[1]} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <currentPhaseData.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold opacity-90">PHASE {currentPhaseData.id}</div>
                      <h3 className="text-2xl font-bold">{currentPhaseData.title}</h3>
                    </div>
                  </div>
                  {currentPhaseData.status === 'active' && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {currentPhaseData.tasks.map((task, index) => (
                    <div key={index} className={`flex items-center p-3 rounded-lg ${
                      task.completed 
                        ? 'bg-green-50' 
                        : task.active 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-gray-50'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : task.active ? (
                        <div className="w-5 h-5 rounded-full bg-blue-500 mr-3 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={`flex-1 ${
                        task.completed 
                          ? 'text-green-700' 
                          : task.active 
                          ? 'text-blue-700 font-medium' 
                          : 'text-gray-600'
                      }`}>
                        {task.name}
                      </span>
                      {task.active && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
                <button
                  onClick={() => setCurrentPhase(Math.max(0, currentPhase - 1))}
                  disabled={currentPhase === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPhase === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-sm text-gray-500">
                  {currentPhase + 1} of {phases.length}
                </div>

                <button
                  onClick={() => setCurrentPhase(Math.min(phases.length - 1, currentPhase + 1))}
                  disabled={currentPhase === phases.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPhase === phases.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">&copy; 2024 PEPEWUFF Token. All rights reserved.</p>
            <div className="mt-4">
              <a 
                href="https://t.me/Yb0YfVcRdN0yYzZk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 btn-3d border-2 border-black shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
