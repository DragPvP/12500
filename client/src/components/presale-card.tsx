import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { CountdownTimer } from './countdown-timer';
import { CurrencySelector } from './currency-selector';
import { PurchaseForm } from './purchase-form';
import { ConnectButton } from './connect-button';
import { usePresaleData } from '@/hooks/use-presale';
import { usePurchaseHistory } from '@/hooks/use-purchase-history';
import { useAppKitAccount } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';
import { ERC20_ABI, PEPEWUFF_TOKEN_ADDRESS } from '@/lib/contracts';
import type { CurrencyId } from '@/lib/constants';

export function PresaleCard() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyId>('ETH');
  const [directData, setDirectData] = useState<any>(null);
  const [directLoading, setDirectLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const { data: presaleData, isLoading, isFetching, error } = usePresaleData();
  const { data: purchases } = usePurchaseHistory();
  const { isConnected, address } = useAppKitAccount();

  const totalPurchased = purchases?.reduce((sum, purchase) => 
    sum + parseFloat(purchase.receiveAmount), 0) || 0;

  // Read PEPEWUFF token balance (when token is deployed)
  const { data: balanceData } = useReadContract({
    address: PEPEWUFF_TOKEN_ADDRESS as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!(isConnected && address && PEPEWUFF_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000')
    }
  });

  useEffect(() => {
    if (balanceData) {
      // Convert from wei to tokens (assuming 18 decimals)
      const balance = (Number(balanceData) / Math.pow(10, 18)).toFixed(2);
      setTokenBalance(balance);
    }
  }, [balanceData]);

  // Direct fetch as fallback
  useEffect(() => {
    const fetchDirectly = async () => {
      try {
        setDirectLoading(true);
        const response = await fetch('/api/presale');
        if (response.ok) {
          const data = await response.json();
          setDirectData(data);
          console.log('Direct fetch successful:', data);
        } else {
          console.error('Direct fetch failed:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('Direct fetch error:', err);
      } finally {
        setDirectLoading(false);
      }
    };
    
    fetchDirectly();
  }, []);

  // Use direct data if React Query fails
  const finalData = presaleData || directData;
  const finalLoading = isLoading && directLoading;
  
  // Safe percentage calculation with NaN protection
  const safePercentage = finalData?.percentage ? 
    (isNaN(parseFloat(finalData.percentage)) ? 0 : parseFloat(finalData.percentage)) : 0;
  
  // Debug logging removed - data is working correctly

  if (finalLoading && !finalData) {
    return (
      <Card className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-8 space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-2xl border-0 overflow-hidden">
      {/* Header Section */}
      <div className="text-center py-6 sm:py-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <h2 className="text-2xl sm:text-4xl font-bold text-black mb-2">BUY $PEPEWUFF</h2>
      </div>

      {/* Countdown Timer */}
      {finalData && (
        <CountdownTimer targetDate={finalData.stageEndTime} />
      )}

      {/* Progress Section */}
      <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm sm:text-lg font-semibold text-black">
            USD RAISED: ${finalData ? parseFloat(finalData.totalRaised).toLocaleString() : '0'}
          </span>
          <span className="text-sm sm:text-lg font-semibold text-black">
            {safePercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
          <div 
            className="progress-bar h-4 rounded-full" 
            style={{ width: `${Math.min(Math.max(safePercentage, 0), 100)}%` }}
          />
        </div>
        <div className="text-center mt-4 py-2 border-2 border-dashed border-gray-300">
          <span className="text-sm sm:text-base text-gray-600 font-medium">
            $1 USDT = {finalData?.currentRate && !isNaN(parseFloat(finalData.currentRate)) ? finalData.currentRate : '65'} $PEPEWUFF
          </span>
        </div>
      </div>

      {/* Currency Selector */}
      <CurrencySelector 
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      {/* Purchase Form */}
      <PurchaseForm selectedCurrency={selectedCurrency} />

      {/* Wallet Info */}
      {isConnected && address && (
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-black mb-3">Wallet Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </div>
            
            {/* Token Balance */}
            <div className="flex justify-between">
              <span className="text-gray-600">Balance:</span>
              <span className="font-mono font-semibold">
                {PEPEWUFF_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000' 
                  ? `${parseFloat(tokenBalance).toLocaleString()} $PEPEWUFF`
                  : '0 $PEPEWUFF'}
              </span>
            </div>
            
            {/* Purchased Amount */}
            {totalPurchased > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Purchased:</span>
                <span className="font-mono font-semibold text-green-600">
                  {totalPurchased.toLocaleString()} $PEPEWUFF
                </span>
              </div>
            )}
          </div>
        </div>
      )}

    </Card>
  );
}
