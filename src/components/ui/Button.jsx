export default function Button({ variant = "primary", className = "", ...props }) {
  const base =
    "w-full rounded-full py-4 text-center font-semibold transition active:scale-[0.99]";

  const styles = {
    primary: " bg-[#2C14DD] text-white hover:brightness-110",
    dark: "bg-[#0B0620] text-white hover:brightness-110",
    outline: "bg-white text-[#2F2AD9] border border-[#E8E8F5] hover:bg-[#F7F7FF]",
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
