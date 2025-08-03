import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';
import { QRCodeSVG } from './qr-code-svg';

interface SolanaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payAmount: string;
  paymentId: string;
  paymentAddress: string;
}

export function SolanaPaymentModal({ 
  isOpen, 
  onClose, 
  payAmount, 
  paymentId, 
  paymentAddress 
}: SolanaPaymentModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Generate Solana Pay URL for QR code
  const solanaPayUrl = `solana:${paymentAddress}?amount=${payAmount}&reference=${paymentId}&label=PEPEWUFF%20Token%20Purchase&message=Purchase%20PEPEWUFF%20tokens`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Transaction</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code and Payment Details */}
          <div className="flex items-start gap-6">
            {/* QR Code */}
            <div className="flex-shrink-0 text-center">
              <div className="w-40 h-40 border-2 border-gray-200 rounded-lg bg-white p-3 flex items-center justify-center">
                <QRCodeSVG 
                  value={solanaPayUrl}
                  size={140}
                  className="w-full h-full"
                />
              </div>
              <div className="mt-3 text-sm text-gray-500">
                QR Code for wallet scanning
              </div>
            </div>

            {/* Payment Details */}
            <div className="flex-1 space-y-4">
              {/* Pay Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pay Amount (SOL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={payAmount}
                    readOnly
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-center text-lg"
                  />
                  <button
                    onClick={() => copyToClipboard(payAmount, 'amount')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  {copiedField === 'amount' && (
                    <div className="absolute -bottom-8 left-0 text-sm text-green-600">
                      Copied!
                    </div>
                  )}
                </div>
              </div>

              {/* Payment ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentId}
                    readOnly
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm text-center"
                  />
                  <button
                    onClick={() => copyToClipboard(paymentId, 'id')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  {copiedField === 'id' && (
                    <div className="absolute -bottom-8 left-0 text-sm text-green-600">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={paymentAddress}
                readOnly
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-xs break-all text-center"
              />
              <button
                onClick={() => copyToClipboard(paymentAddress, 'address')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-200 rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
              {copiedField === 'address' && (
                <div className="absolute -bottom-8 left-0 text-sm text-green-600">
                  Copied!
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Pay <span className="font-medium">{payAmount} of SOL</span> on the{' '}
              <span className="font-medium">SOL</span> network to the address above to
              confirm the payment.
            </p>
            
            <p>
              The tokens will automatically be deposited upon received payment. 
              Note that it can take between 10 minutes and 1 hour for transactions 
              to go through.
            </p>
            
            <p>
              Refresh the page to check your balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}