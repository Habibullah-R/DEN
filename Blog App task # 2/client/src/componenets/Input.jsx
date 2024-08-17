import React from "react";

function Input({
  type = "text",
  className = "",
  value,
  placeholder,
  onChange,
  label,
  ...props
}) {
  return (
    <div className="w-full">
      {label && <label className="text-start">{label}</label>}
      <input
        type={type}
        className={`border-[1px] w-full bg-transparent border-gray-600 p-2 outline-none 
          rounded-md ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
