import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCalculateTokens, useCreateTransaction } from '@/hooks/use-presale';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useToast } from '@/hooks/use-toast';
import { CURRENCIES, type CurrencyId } from '@/lib/constants';
import { useSendTransaction, useWriteContract } from 'wagmi';
import { parseEther, parseUnits } from 'viem';
import { PRESALE_CONTRACT_ADDRESS, ERC20_ABI, PRESALE_ABI, TOKEN_ADDRESSES, SOLANA_WALLET_ADDRESS } from '@/lib/contracts';
import { SolanaPaymentModal } from './solana-payment-modal';

interface PurchaseFormProps {
  selectedCurrency: CurrencyId;
}

export function PurchaseForm({ selectedCurrency }: PurchaseFormProps) {
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [isSolanaModalOpen, setIsSolanaModalOpen] = useState(false);
  
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { toast } = useToast();
  
  const calculateMutation = useCalculateTokens();
  const createTransactionMutation = useCreateTransaction();
  const { sendTransaction, isPending: isTransactionPending } = useSendTransaction();
  const { writeContract, isPending: isContractPending } = useWriteContract();

  const selectedCurrencyInfo = CURRENCIES.find(c => c.id === selectedCurrency);

  useEffect(() => {
    if (payAmount && !isNaN(parseFloat(payAmount)) && parseFloat(payAmount) > 0) {
      const timeoutId = setTimeout(() => {
        calculateMutation.mutate({
          currency: selectedCurrency,
          payAmount: parseFloat(payAmount)
        });
      }, 500); // 500ms debounce
      
      return () => clearTimeout(timeoutId);
    } else {
      setReceiveAmount('');
    }
  }, [payAmount, selectedCurrency]);

  useEffect(() => {
    if (calculateMutation.data && calculateMutation.data.tokenAmount !== undefined) {
      const tokenAmount: number | string = calculateMutation.data.tokenAmount;
      // Handle both number and string responses safely
      let numericAmount: number;
      
      if (typeof tokenAmount === 'string') {
        numericAmount = parseFloat(String(tokenAmount).replace(/,/g, ''));
      } else {
        numericAmount = Number(tokenAmount);
      }
      
      if (!isNaN(numericAmount) && numericAmount > 0) {
        setReceiveAmount(numericAmount.toLocaleString());
      } else {
        setReceiveAmount('');
        console.warn('Invalid token amount received:', tokenAmount);
      }
    }
    // Clear receive amount if calculation fails
    if (calculateMutation.error) {
      setReceiveAmount('');
    }
  }, [calculateMutation.data, calculateMutation.error]);



  const handlePurchase = async () => {
    if (!isConnected || !address) {
      // Open wallet connection modal instead of showing error
      open();
      return;
    }

    if (!payAmount || !receiveAmount) {
      toast({
        title: "Error", 
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    try {
      toast({
        title: "Processing",
        description: "Preparing blockchain transaction...",
      });

      // Handle different payment methods
      if (selectedCurrency === 'ETH' || selectedCurrency === 'BNB') {
        // ETH/BNB payment to specified address
        const value = parseEther(payAmount);
        
        await sendTransaction({
          to: PRESALE_CONTRACT_ADDRESS,
          value: value,
          data: '0x',
        });
      } else if (selectedCurrency === 'SOL') {
        // SOL payment - Open Solana payment modal
        setIsSolanaModalOpen(true);
        return;
      } else {
        // ERC20 token payment (USDT, USDC)
        const tokenAddress = TOKEN_ADDRESSES.ETH[selectedCurrency as keyof typeof TOKEN_ADDRESSES.ETH];
        if (!tokenAddress) {
          throw new Error(`Unsupported token: ${selectedCurrency}`);
        }

        // Convert amount to proper decimals (USDT uses 6 decimals)
        const decimals = selectedCurrency === 'USDT' ? 6 : 18;
        const amount = parseUnits(payAmount, decimals);
        
        await writeContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [PRESALE_CONTRACT_ADDRESS, amount],
        });
      }

      // Record transaction in database after blockchain confirmation
      await createTransactionMutation.mutateAsync({
        walletAddress: address,
        currency: selectedCurrency,
        payAmount: payAmount,
        receiveAmount: receiveAmount,
        referralCode: null,
      });

      toast({
        title: "Success",
        description: "Transaction submitted to blockchain! Please wait for confirmation.",
      });

      // Reset form
      setPayAmount('');
      setReceiveAmount('');
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toast({
        title: "Transaction Failed",
        description: error?.message || "Failed to process blockchain transaction",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Amount Input */}
      <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedCurrency} you pay
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="1"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="input-3d w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:border-black text-base"
              />
              {selectedCurrencyInfo?.icon.startsWith('/') ? (
                <img 
                  src={selectedCurrencyInfo.icon} 
                  alt={selectedCurrencyInfo.name} 
                  className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 object-contain ${selectedCurrencyInfo.id === 'SOL' ? 'rounded-full' : ''}`}
                />
              ) : (
                <span className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 ${selectedCurrencyInfo?.color}`}>
                  {selectedCurrencyInfo?.icon}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              $PEPEWUFF you receive
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="173180.51"
                value={receiveAmount}
                readOnly
                className="input-3d w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-base"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                <img 
                  src="/img/pepewuff-logo.png" 
                  alt="PEPEWUFF" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Link - Only visible when wallet connected */}
      {isConnected && (
        <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
          <div className="flex flex-row items-center justify-between space-x-3">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Share & Earn</h3>
              <p className="text-xs text-gray-500">Get 10% of purchased tokens</p>
            </div>
            <Button
              onClick={() => {
                const shareUrl = `${window.location.origin}?ref=${address}`;
                navigator.clipboard.writeText(shareUrl);
                // You could add a toast notification here
              }}
              className="btn-3d bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-800 text-sm"
            >
              Share Link
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 sm:p-6 bg-white">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={handlePurchase}
            disabled={isConnected && (createTransactionMutation.isPending || isTransactionPending || isContractPending || !payAmount)}
            className="btn-3d w-full bg-black text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-800"
          >
            {(createTransactionMutation.isPending || isTransactionPending || isContractPending)
              ? 'Processing Transaction...' 
              : isConnected 
                ? 'Buy $PEPEWUFF' 
                : 'Connect Wallet'
            }
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const howToBuySection = document.getElementById('how-to-buy');
              if (howToBuySection) {
                howToBuySection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="btn-3d w-full bg-white text-black border-2 border-black py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50"
          >
            How To Buy
          </Button>
        </div>
      </div>

      {/* Solana Payment Modal */}
      <SolanaPaymentModal
        isOpen={isSolanaModalOpen}
        onClose={() => setIsSolanaModalOpen(false)}
        payAmount={payAmount}
        paymentId={`PW${Date.now().toString().slice(-8)}`}
        paymentAddress={SOLANA_WALLET_ADDRESS}
      />
    </div>
  );
}
