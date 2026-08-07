export default function BackgroundGlow() {
  return (
    <>
      <div className="absolute top-52 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700 opacity-20 blur-[180px]" />

      <div className="absolute top-72 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-violet-500 opacity-30" />
    </>
  );
}
