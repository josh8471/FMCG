import React from "react";

const AreaBtn = ({
  label,
  onClick,
  icon: Icon,
  variant = "primary",
  type = "button",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {Icon && <Icon size={12} />}
      {label}
    </button>
  );
};

export default AreaBtn;
