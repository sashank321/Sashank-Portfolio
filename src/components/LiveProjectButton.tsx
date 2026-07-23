type LiveProjectButtonProps = {
  label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Ghost/outline pill button. Rounded-full, border-2 #D7E2EA,
 * hover fills the background at 10% opacity.
 */
export default function LiveProjectButton({
  label = "Live Project",
  className = "",
  ...rest
}: LiveProjectButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-300 hover:bg-[#D7E2EA]/10 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      {label}
    </button>
  );
}
