import React from 'react';

interface BudgetInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string | null;
}

const QUICK_BUDGETS = [500, 1000, 1500, 2500, 4000];

export const BudgetInput: React.FC<BudgetInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = rawVal === '' ? 0 : parseInt(rawVal, 10);
    onChange(num);
  };

  return (
    <div className="space-y-3">
      <div className="relative max-w-xs">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-olive font-serif text-lg font-medium select-none pointer-events-none">
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value > 0 ? value : ''}
          onChange={handleChange}
          placeholder="e.g. 1500"
          className={`w-full pl-9 pr-4 py-3 bg-white rounded-xl border text-olive text-base placeholder:text-olive/40 transition-colors duration-150 ${
            error
              ? 'border-red ring-1 ring-red focus:border-red'
              : 'border-sage/70 focus:border-olive focus:ring-1 focus:ring-olive'
          }`}
        />
      </div>

      {/* Quick budget presets for user convenience */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-olive-muted mr-1">Quick pick:</span>
        {QUICK_BUDGETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onChange(amt)}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors border ${
              value === amt
                ? 'bg-sage border-sage text-olive font-medium'
                : 'bg-white/60 border-sage/40 text-olive/80 hover:bg-white hover:border-sage'
            }`}
          >
            ₹{amt.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red mt-1 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
