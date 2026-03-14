export default function Divider() {
  return (
    <div className="flex items-center gap-4 ">
      <div className="h-px flex-1 bg-[#5E5E5E]" />
      <span className="text-sm text-[#949494]">OR</span>
      <div className="h-px flex-1 bg-[#5E5E5E]" />
    </div>
  );
}
