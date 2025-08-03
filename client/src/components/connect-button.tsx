import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Button } from '@/components/ui/button';

export function ConnectButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  if (isConnected && address) {
    return (
      <Button 
        onClick={() => open()}
        className="btn-3d bg-black text-white hover:bg-gray-800"
      >
        Connected: {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => open()}
      className="btn-3d bg-black text-white hover:bg-gray-800"
    >
      Connect Wallet
    </Button>
  );
}
