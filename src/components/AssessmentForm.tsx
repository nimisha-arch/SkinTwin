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
      className="w-full max-w-2xl mx-auto space-y-10 sm:space-y-12"
      noValidate
    >
      {/* 1. Age Group */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Age Group
          </label>
          <span className="text-xs text-olive-muted">Select one</span>
        </div>
        <ChipSelect
          options={AGE_GROUPS}
          selected={ageGroup}
          onChange={(val) => setAgeGroup(val as string)}
          multiple={false}
        />
      </section>

      {/* 2. Skin Type */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Skin Type
          </label>
          <span className="text-xs text-olive-muted">Select one</span>
        </div>
        <ChipSelect
          options={SKIN_TYPES}
          selected={skinType}
          onChange={(val) => setSkinType(val as string)}
          multiple={false}
        />
      </section>

      {/* 3. Skin Concerns */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Skin Concerns
          </label>
          <span className="text-xs text-olive-muted">Select all that apply</span>
        </div>
        <ChipSelect
          options={SKIN_CONCERNS}
          selected={concerns}
          onChange={() => {}}
          multiple={true}
          onOptionToggle={handleConcernToggle}
        />
      </section>

      {/* 4. Skin Features & Sensitivity */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Tolerance & Feel
          </label>
          <span className="text-xs text-olive-muted">Select all that apply</span>
        </div>
        <ChipSelect
          options={SENSITIVITY_OPTIONS}
          selected={sensitivity}
          onChange={() => {}}
          multiple={true}
          onOptionToggle={handleSensitivityToggle}
        />
      </section>

      {/* 5. Product Wanted */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Product Category
          </label>
          <span className="text-xs text-olive-muted">Choose category or custom need</span>
        </div>

        <ChipSelect
          options={PRODUCT_CATEGORIES}
          selected={productCategory}
          onChange={(val) => setProductCategory(val as string)}
          multiple={false}
        />

        <div className="pt-1.5">
          <input
            type="text"
            value={customProduct}
            onChange={(e) => setCustomProduct(e.target.value)}
            placeholder="Or type a specific request (e.g. Non-comedogenic barrier moisturizer)..."
            className="w-full px-3.5 py-2.5 text-sm bg-white/80 hover:bg-white focus:bg-white rounded-control border border-border-subtle text-olive placeholder:text-olive/35 focus:border-olive transition-colors"
          />
        </div>
      </section>

      {/* 6. Budget */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-border-subtle/80 pb-2">
          <label className="text-xs uppercase tracking-[0.14em] font-semibold text-olive/75">
            Target Budget
          </label>
          <span className="text-xs text-olive-muted">In ₹ INR</span>
        </div>
        <BudgetInput
          value={budget}
          onChange={handleBudgetChange}
          error={budgetError}
        />
      </section>

      {/* Action */}
      <div className="pt-6 border-t border-border-subtle/80 space-y-3">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-3.5 px-6 rounded-control text-cream font-medium text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 ${
            isFormValid && !isLoading
              ? 'bg-olive hover:bg-olive-hover cursor-pointer'
              : 'bg-olive/40 cursor-not-allowed text-cream/70'
          }`}
        >
          {isLoading ? 'Consulting SkinTwin…' : 'Generate Recommendation'}
        </button>

        {!isFormValid && (
          <p className="text-center text-xs text-olive-muted font-normal">
            Select an option in each section to complete your consultation.
          </p>
        )}
      </div>
    </form>
  );
};
