import React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full max-w-lg rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition focus:border-furia focus:ring-1 focus:ring-furia focus:outline-none ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";