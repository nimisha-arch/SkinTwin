import React, { useState } from 'react';
import {
  SkinProfile,
  AGE_GROUPS,
  SKIN_TYPES,
  SKIN_CONCERNS,
  SENSITIVITY_OPTIONS,
  PRODUCT_CATEGORIES,
} from '../types/skintwin';
import { ChipSelect } from './ChipSelect';
import { BudgetInput } from './BudgetInput';

interface AssessmentFormProps {
  initialValues?: SkinProfile | null;
  onSubmit: (profile: SkinProfile) => void;
  isLoading?: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
}) => {
  const [ageGroup, setAgeGroup] = useState<string>(initialValues?.ageGroup || '');
  const [skinType, setSkinType] = useState<string>(initialValues?.skinType || '');
  const [concerns, setConcerns] = useState<string[]>(initialValues?.concerns || []);
  const [sensitivity, setSensitivity] = useState<string[]>(
    initialValues?.sensitivity || []
  );
  const [productCategory, setProductCategory] = useState<string>(
    initialValues?.productWanted &&
      PRODUCT_CATEGORIES.includes(initialValues.productWanted as any)
      ? initialValues.productWanted
      : 'Sunscreen'
  );
  const [customProduct, setCustomProduct] = useState<string>(
    initialValues?.productWanted &&
      !PRODUCT_CATEGORIES.includes(initialValues.productWanted as any)
      ? initialValues.productWanted
      : ''
  );
  const [budget, setBudget] = useState<number>(initialValues?.budget || 1500);

  // Field-level error messages
  const [budgetError, setBudgetError] = useState<string | null>(null);

  // Handle Concerns selection with special handling for "No Specific Concern"
  const handleConcernToggle = (item: string) => {
    if (item === 'No Specific Concern') {
      if (concerns.includes('No Specific Concern')) {
        setConcerns([]);
      } else {
        setConcerns(['No Specific Concern']);
      }
    } else {
      const filtered = concerns.filter((c) => c !== 'No Specific Concern');
      if (filtered.includes(item)) {
        setConcerns(filtered.filter((c) => c !== item));
      } else {
        setConcerns([...filtered, item]);
      }
    }
  };

  // Handle sensitivity toggle
  const handleSensitivityToggle = (item: string) => {
    if (sensitivity.includes(item)) {
      setSensitivity(sensitivity.filter((s) => s !== item));
    } else {
      setSensitivity([...sensitivity, item]);
    }
  };

  const handleBudgetChange = (val: number) => {
    setBudget(val);
    if (val <= 0) {
      setBudgetError('Please enter a budget greater than ₹0');
    } else if (val > 50000) {
      setBudgetError('Budget cannot exceed ₹50,000');
    } else {
      setBudgetError(null);
    }
  };

  const finalProductWanted = customProduct.trim() || productCategory;

  // Validation according to TECHNICAL.md §5
  const isAgeValid = ageGroup.length > 0;
  const isSkinTypeValid = skinType.length > 0;
  const isConcernsValid = concerns.length > 0;
  const isSensitivityValid = sensitivity.length > 0;
  const isProductValid = finalProductWanted.length > 0;
  const isBudgetValid = budget > 0 && budget <= 50000;

  const isFormValid =
    isAgeValid &&
    isSkinTypeValid &&
    isConcernsValid &&
    isSensitivityValid &&
    isProductValid &&
    isBudgetValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    onSubmit({
      ageGroup,
      skinType,
      concerns,
      sensitivity,
      productWanted: finalProductWanted,
      budget,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-10 py-6"
      noValidate
    >
      {/* 1. Age Group */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            1. Age Group
          </label>
          <span className="text-xs text-olive-muted">Select one</span>
        </div>
        <ChipSelect
          options={AGE_GROUPS}
          selected={ageGroup}
          onChange={(val) => setAgeGroup(val as string)}
          multiple={false}
          activeColor="sage"
        />
      </section>

      {/* 2. Skin Type */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            2. Skin Type
          </label>
          <span className="text-xs text-olive-muted">Select one</span>
        </div>
        <ChipSelect
          options={SKIN_TYPES}
          selected={skinType}
          onChange={(val) => setSkinType(val as string)}
          multiple={false}
          activeColor="sage"
        />
      </section>

      {/* 3. Skin Concerns */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            3. Primary Skin Concerns
          </label>
          <span className="text-xs text-olive-muted">Select all that apply</span>
        </div>
        <ChipSelect
          options={SKIN_CONCERNS}
          selected={concerns}
          onChange={() => {}}
          multiple={true}
          activeColor="peach"
          onOptionToggle={handleConcernToggle}
        />
      </section>

      {/* 4. Skin Features & Sensitivity */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            4. Skin Tolerance & Feel
          </label>
          <span className="text-xs text-olive-muted">Select all that apply</span>
        </div>
        <ChipSelect
          options={SENSITIVITY_OPTIONS}
          selected={sensitivity}
          onChange={() => {}}
          multiple={true}
          activeColor="sage"
          onOptionToggle={handleSensitivityToggle}
        />
      </section>

      {/* 5. Product Wanted */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            5. Product Looking For
          </label>
          <span className="text-xs text-olive-muted">Category or custom request</span>
        </div>

        <ChipSelect
          options={PRODUCT_CATEGORIES}
          selected={productCategory}
          onChange={(val) => setProductCategory(val as string)}
          multiple={false}
          activeColor="peach"
        />

        <div className="pt-2">
          <input
            type="text"
            value={customProduct}
            onChange={(e) => setCustomProduct(e.target.value)}
            placeholder="Or type a custom request (e.g. Gentle gel cleanser for acne, Barrier cream)..."
            className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-sage/60 text-olive placeholder:text-olive/40 focus:border-olive transition-colors"
          />
        </div>
      </section>

      {/* 6. Budget */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <label className="text-xs uppercase tracking-widest text-olive font-semibold">
            6. Target Budget (₹ INR)
          </label>
          <span className="text-xs text-olive-muted">Max price per product</span>
        </div>
        <BudgetInput
          value={budget}
          onChange={handleBudgetChange}
          error={budgetError}
        />
      </section>

      {/* 7. Submit Action */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 px-6 rounded-2xl text-cream font-medium text-base transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
            isFormValid && !isLoading
              ? 'bg-olive hover:bg-olive-hover cursor-pointer active:scale-[0.99]'
              : 'bg-olive/40 cursor-not-allowed text-cream/70'
          }`}
        >
          {isLoading ? 'Generating Routine...' : 'Generate Recommendation'}
        </button>

        {!isFormValid && (
          <p className="text-center text-xs text-olive-muted mt-2.5">
            Please make a selection in each section to generate recommendations.
          </p>
        )}
      </div>
    </form>
  );
};
