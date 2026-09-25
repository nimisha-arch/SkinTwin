import React from 'react';

interface ChipSelectProps {
  options: readonly string[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  activeColor?: 'sage' | 'peach';
  onOptionToggle?: (option: string) => void;
}

export const ChipSelect: React.FC<ChipSelectProps> = ({
  options,
  selected,
  onChange,
  multiple = false,
  activeColor = 'sage',
  onOptionToggle,
}) => {
  const isSelected = (opt: string) => {
    if (Array.isArray(selected)) {
      return selected.includes(opt);
    }
    return selected === opt;
  };

  const handleSelect = (opt: string) => {
    if (onOptionToggle) {
      onOptionToggle(opt);
      return;
    }

    if (multiple) {
      const current = Array.isArray(selected) ? [...selected] : [];
      if (current.includes(opt)) {
        onChange(current.filter((item) => item !== opt));
      } else {
        onChange([...current, opt]);
      }
    } else {
      onChange(opt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelect(opt);
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5" role="group">
      {options.map((opt) => {
        const active = isSelected(opt);
        const bgActive = activeColor === 'peach' ? 'bg-peach' : 'bg-sage';

        return (
          <button
            key={opt}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={active}
            onClick={() => handleSelect(opt)}
            onKeyDown={(e) => handleKeyDown(e, opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer select-none text-olive ${
              active
                ? `${bgActive} border-transparent shadow-sm font-semibold`
                : 'bg-white/80 hover:bg-white border-sage/60 text-olive/80 hover:text-olive hover:border-sage'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
