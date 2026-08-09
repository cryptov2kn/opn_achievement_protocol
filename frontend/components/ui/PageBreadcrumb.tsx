"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function PageBreadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-base">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-medium text-zinc-500 transition-all duration-200 hover:text-violet-400 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.35)]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "font-semibold text-white"
                    : "font-medium text-zinc-500"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span className="text-zinc-700 transition-colors select-none">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
