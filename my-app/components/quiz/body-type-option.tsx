export function OptionCard({
  children,
  onClick,
  selected = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      className={`option-card group w-full rounded-[12px] border px-4 py-3.5 text-left transition-all sm:px-5 sm:py-4 ${
        selected
          ? "border-[#2f6ebf] bg-[#eef4fb] shadow-sm"
          : "border-transparent bg-[#f5f5f5] hover:bg-[#eeeeee]"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
