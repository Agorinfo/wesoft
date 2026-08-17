import Link from "next/link";
import type { CmsButton as ButtonData } from "@/types/content";

const variants = {
  primary: "!border-0 !bg-[var(--blue)] !text-white hover:!bg-[var(--blue-2)]",
  secondary: "!border !border-[var(--blue)] !bg-transparent !text-[var(--blue)]",
  ghost: "!border-white/60 !bg-transparent !text-white",
  light: "!border-0 !bg-white !text-[var(--blue)]",
};

export function CmsButton({ button, className = "" }: { button?: ButtonData | null; className?: string }) {
  if (!button?.label || !button.href) return null;
  const external = button.linkType === "external" || /^https?:\/\//.test(button.href);
  const classes = `inline-flex min-h-[50px] items-center justify-center rounded border-0 px-[31px] text-base font-semibold tracking-[.02em] transition duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${variants[button.style || "primary"]} ${className}`;
  if (external) return <a className={classes} href={button.href} target={button.openInNewTab ? "_blank" : undefined} rel={button.openInNewTab ? "noreferrer" : undefined}>{button.label}</a>;
  return <Link className={classes} href={button.href}>{button.label}</Link>;
}
