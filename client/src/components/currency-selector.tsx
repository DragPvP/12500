import { CURRENCIES, type CurrencyId } from '@/lib/constants';

interface CurrencySelectorProps {
  selectedCurrency: CurrencyId;
  onCurrencyChange: (currency: CurrencyId) => void;
}

export function CurrencySelector({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {CURRENCIES.map((currency) => (
          <button
            key={currency.id}
            onClick={() => onCurrencyChange(currency.id)}
            className={`currency-btn bg-white border-2 rounded-xl p-2 sm:p-4 flex flex-col items-center space-y-1 sm:space-y-2 ${
              selectedCurrency === currency.id
                ? 'active border-black'
                : 'border-gray-200 hover:border-black'
            }`}
          >
            {currency.icon.startsWith('/') ? (
              <img 
                src={currency.icon} 
                alt={currency.name} 
                className={`w-6 h-6 sm:w-8 sm:h-8 object-contain ${currency.id === 'SOL' ? 'rounded-full' : ''}`}
              />
            ) : (
              <span className={`text-xl sm:text-2xl ${currency.color}`}>
                {currency.icon}
              </span>
            )}
            <div className="text-center">
              <div className="font-semibold text-xs sm:text-sm">{currency.name}</div>
              <div className="text-xs text-gray-500 hidden sm:block">{currency.network}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
