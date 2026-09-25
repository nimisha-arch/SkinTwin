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
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-olive/60 font-serif text-base select-none pointer-events-none">
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value > 0 ? value : ''}
          onChange={handleChange}
          placeholder="e.g. 1500"
          className={`w-full pl-8 pr-3.5 py-2.5 bg-white rounded-control border text-olive text-sm placeholder:text-olive/35 transition-colors duration-150 ${
            error
              ? 'border-red ring-1 ring-red/50 focus:border-red'
              : 'border-border-subtle focus:border-olive'
          }`}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-olive-muted mr-1">Quick select:</span>
        {QUICK_BUDGETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onChange(amt)}
            className={`px-3 py-1.5 text-xs rounded-control transition-colors border ${
              value === amt
                ? 'bg-olive text-cream border-olive font-medium'
                : 'bg-white/80 hover:bg-white text-olive/75 border-border-subtle hover:border-olive/30'
            }`}
          >
            ₹{amt.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red mt-1 font-normal" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
