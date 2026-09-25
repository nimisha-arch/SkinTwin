import React from 'react';

interface ChipSelectProps {
  options: readonly string[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  onOptionToggle?: (option: string) => void;
}

export const ChipSelect: React.FC<ChipSelectProps> = ({
  options,
  selected,
  onChange,
  multiple = false,
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
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const active = isSelected(opt);

        return (
          <button
            key={opt}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={active}
            onClick={() => handleSelect(opt)}
            onKeyDown={(e) => handleKeyDown(e, opt)}
            className={`px-3.5 py-2 rounded-control text-sm transition-colors duration-150 border cursor-pointer select-none text-left ${
              active
                ? 'bg-olive text-cream border-olive font-medium'
                : 'bg-white/80 hover:bg-white text-olive/80 hover:text-olive border-border-subtle hover:border-olive/30'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
