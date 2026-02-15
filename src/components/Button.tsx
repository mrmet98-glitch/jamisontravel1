import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
};

const styles = {
  base: "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50 disabled:cursor-not-allowed",
  size: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
  },
  variant: {
    primary: "bg-sky-500/90 hover:bg-sky-500 text-slate-950 shadow-soft",
    ghost: "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100",
    danger: "bg-rose-500/90 hover:bg-rose-500 text-slate-950 shadow-soft",
  },
};

export function Button({ variant="ghost", size="md", className="", ...props }: Props) {
  return (
    <button
      className={[
        styles.base,
        styles.size[size],
        styles.variant[variant],
        className
      ].join(" ")}
      {...props}
    />
  );
}
