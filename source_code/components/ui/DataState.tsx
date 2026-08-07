"use client";

import Button from "./Button";

interface DataStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function DataState({
  title,
  description,
  buttonText,
  onButtonClick,
}: DataStateProps) {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10 text-4xl">
          🏆
        </div>

        <h3 className="text-2xl font-bold text-white">{title}</h3>

        {description && <p className="mt-3 text-zinc-400">{description}</p>}

        {buttonText && (
          <div className="mt-8">
            <Button variant="primary" size="md" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
