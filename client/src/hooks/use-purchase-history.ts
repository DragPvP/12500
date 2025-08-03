import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAppKitAccount } from '@reown/appkit/react';

interface PurchaseRecord {
  id: string;
  currency: string;
  payAmount: string;
  receiveAmount: string;
  createdAt: string;
  status: string;
}

export function usePurchaseHistory() {
  const { address, isConnected } = useAppKitAccount();
  
  return useQuery<PurchaseRecord[]>({
    queryKey: ["/api/transactions", address],
    queryFn: async () => {
      if (!address) return [];
      const response = await apiRequest("GET", `/api/transactions/${address}`);
      return response.json();
    },
    enabled: isConnected && !!address,
    refetchOnWindowFocus: false,
  });
}