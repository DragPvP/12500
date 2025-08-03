import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { PresaleData, InsertTransaction } from "@shared/schema";

interface PresaleDataWithPercentage extends PresaleData {
  percentage: string;
}

interface CalculationResult {
  currency: string;
  payAmount: number;
  usdtValue: number;
  tokenAmount: number;
  tokenPrice: number;
  rate: number;
}

interface ReferralCode {
  code: string;
  discountPercent: string;
  isValid?: boolean;
  applied?: boolean;
}

export function usePresaleData() {
  return useQuery<PresaleDataWithPercentage>({
    queryKey: ["/api/presale"],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useCalculateTokens() {
  return useMutation<CalculationResult, Error, { currency: string; payAmount: number }>({
    mutationFn: async ({ currency, payAmount }) => {
      const response = await apiRequest("POST", "/api/presale/calculate", {
        currency,
        payAmount,
      });
      return response.json();
    },
    retry: false, // Don't retry failed calculations
    gcTime: 0, // Don't cache calculation results
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, InsertTransaction>({
    mutationFn: async (transactionData) => {
      const response = await apiRequest("POST", "/api/transactions", transactionData);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate presale data to refresh the raised amount
      queryClient.invalidateQueries({ queryKey: ["/api/presale"] });
    },
  });
}

export function useValidateReferralCode() {
  return useMutation<ReferralCode, Error, string>({
    mutationFn: async (code) => {
      const response = await apiRequest("GET", `/api/referral/${code}`);
      return response.json();
    },
  });
}

export function useApplyReferralCode() {
  return useMutation<ReferralCode, Error, { code: string }>({
    mutationFn: async ({ code }) => {
      const response = await apiRequest("POST", "/api/referral/apply", { code });
      return response.json();
    },
  });
}

export function useCountdown(targetDate: string | Date) {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate);
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
