import { Circle, icons, type LucideIcon } from "lucide-react";
import type { CmsIconValue } from "@/types/content";

type CmsIconProps = {
  icon?: CmsIconValue | null;
  className?: string;
  decorative?: boolean;
  label?: string;
};

function clamp(value: number | undefined, min: number, max: number, fallback: number) {
  return Math.min(max, Math.max(min, Number(value) || fallback));
}

export function CmsIcon({ icon, className, decorative = true, label }: CmsIconProps) {
  if (!icon?.name) return null;

  const color = /^#[0-9a-f]{6}$/i.test(icon.color || "") ? icon.color : "currentColor";
  const size = clamp(icon.size, 8, 160, 32);

  if (icon.library === "fontawesome-brands" && icon.path && /^0 0 \d+(?:\.\d+)? \d+(?:\.\d+)?$/.test(icon.viewBox || "")) {
    const paths = Array.isArray(icon.path) ? icon.path : [icon.path];
    return <svg
      className={className}
      viewBox={icon.viewBox}
      width={size}
      height={size}
      fill={color}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label || icon.name}
      role={decorative ? undefined : "img"}
    >
      {paths.map((path, index) => <path d={path} key={index} />)}
    </svg>;
  }

  const Icon = (icons[icon.name as keyof typeof icons] as LucideIcon | undefined) || Circle;

  return <Icon
    className={className}
    color={color}
    size={size}
    strokeWidth={clamp(icon.strokeWidth, 0.5, 4, 2)}
    aria-hidden={decorative || undefined}
    aria-label={decorative ? undefined : label || icon.name}
  />;
}
