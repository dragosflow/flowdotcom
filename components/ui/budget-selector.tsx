"use client";

import { Euro } from "lucide-react";

type BudgetSelectorProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function BudgetSelector({
  options,
  value,
  onChange,
}: BudgetSelectorProps) {
  return (
    <div className='relative overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-4 shadow-[0_12px_34px_rgba(0,0,0,0.25)]'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(143,178,255,0.18),transparent_40%)]' />
      <div className='relative mb-4 flex items-start justify-between gap-3'>
        <div className='flex items-start gap-2.5'>
          <span className='mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85'>
            <Euro className='size-3.5' />
          </span>
          <div>
            <p className='text-sm font-semibold tracking-[0.05em] text-white/95 uppercase'>
              Interval buget
            </p>
            <p className='mt-1 text-xs leading-relaxed text-white/55'>
              Selectează intervalul orientativ în EUR.
            </p>
          </div>
        </div>
        <span className='shrink-0 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[11px] font-medium text-white/75'>
          {value}
        </span>
      </div>

      <div className='relative grid grid-cols-1 gap-2 sm:grid-cols-2'>
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type='button'
              onClick={() => onChange(option)}
              className={`group relative overflow-hidden rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-300 ${
                selected
                  ? "border-[#8fb2ff]/70 bg-[linear-gradient(135deg,rgba(143,178,255,0.28),rgba(143,178,255,0.08))] text-white shadow-[0_10px_24px_rgba(33,80,168,0.35)]"
                  : "border-white/15 bg-white/5 text-white/75 hover:border-white/35 hover:bg-white/10 hover:text-white"
              }`}
              aria-pressed={selected}
            >
              <span
                className={`absolute top-1/2 left-3 h-2 w-2 -translate-y-1/2 rounded-full transition ${
                  selected ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)]" : "bg-white/30 group-hover:bg-white/65"
                }`}
              />
              <span className='pl-4 font-medium'>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
