interface LoadingStateProps {
  text?: string;
}

export default function LoadingState({
  text = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />

        <p className="mt-6 text-zinc-400">{text}</p>
      </div>
    </div>
  );
}
