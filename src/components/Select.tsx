import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ label, className="", children, ...props }: Props) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-xs text-slate-300">{label}</div>}
      <select
        className={[
          "w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400/40",
          className
        ].join(" ")}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
