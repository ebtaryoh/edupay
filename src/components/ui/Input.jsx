import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({ className = "", type = "text", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <input
        type={isPassword && showPassword ? "text" : type}
        className={`w-full h-12 rounded-xl border border-[#5E5E5E] px-4
                    ${isPassword ? "pr-12" : ""}
                    outline-none
                    focus:ring-2 focus:ring-[#2F2AD9]/30 focus:border-[#2F2AD9]
                    placeholder:text-[#CCCCCC] ${className}`}
        {...props}
      />

      {/* 👁 Eye icon (only for password) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2
                     text-[#949494] hover:text-[#2F2AD9] transition"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}
