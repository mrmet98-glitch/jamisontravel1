import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, className="", ...props }: Props) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs text-slate-300">{label}</div>}
      <input
        className={[
          "w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm",
          "placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400/40",
          className
        ].join(" ")}
        {...props}
      />
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </label>
  );
}
