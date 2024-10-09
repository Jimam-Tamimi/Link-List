import React from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "transparent";  
  leftIcon?: React.ReactNode; // Can be an Image component or a text icon
  rightIcon?: React.ReactNode; // Can be an Image component or a text icon
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  size?: "sm" | "sx" | "md" | "lg" | "full"; // Added size option
  rounded?: "none" | "sm" | "md" | "lg" | "full"; // Added rounded-full option
  className?: string; // Added to allow additional styles
  isDarkMode?: boolean; // New prop to determine if dark mode is active
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingComponent,
  size = "md", // Default size
  rounded = "md", // Default rounded
  className = "", // Default empty className
}) => {
  const baseStyle =
    "  font-semibold focus:outline-none transition-all duration-300 ease-in-out rounded-none";
  // Define sizes and rounded styles
  const sizeStyles = {
    sx: "text-xs py-2 px-3", // Small extra size
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg py-4 px-8",
    full: "w-full text-lg py-4 px-8",
  };

  // Original rounded styles
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full", // Added rounded-full option
  };

  // Adjusted styles for button variants
  const styles = {
    primary: `${sizeStyles[size]} ${baseStyle}  ${roundedStyles[rounded]}  primary-btn-hover-animation text-white   hover:shadow-[#ff004040]  `, 
    transparent: `${sizeStyles[size]} ${baseStyle}  ${
      roundedStyles[rounded]
    } bg-transparent dark:shadow-gray-700 text-black border border-gray-500 
     dark:text-white dark:border-gray-200   `,
     secondary: `${sizeStyles[size]} ${baseStyle}  ${
      roundedStyles[rounded]
    } bg-blue-500 dark:shadow-gray-700 text-white      `,
  };

  // Icon size calculation based on button size
  const iconSize =
    size === "sm" ? 16 : size === "sx" ? 14 : size === "lg" ? 20 : size === "full" ? 21 : 18; // Adjusting sizes for responsiveness

    
    const animationStyles = `
    transform transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-lg 
    active:scale-95 active:opacity-80   
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${className}  
        flex justify-center   items-center outline-none ${styles[variant]} 
        ${animationStyles} 
        
      `}
    >
      {isLoading ? (
        loadingComponent || <ClipLoader size={20} color="#ffffff" />
      ) : (
        <>
          {leftIcon && (
            <span
              className="mr-3 flex items-center"
              style={{ minWidth: iconSize, minHeight: iconSize }}
            >
              {React.isValidElement(leftIcon) ? (
                React.cloneElement(leftIcon, {
                  width: iconSize,
                  height: iconSize,
                } as any)
              ) : (
                <span style={{ fontSize: iconSize }}>{leftIcon}</span>
              )}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              className="ml-3 flex items-center "
              style={{ minWidth: iconSize, minHeight: iconSize }}
            >
              {React.isValidElement(rightIcon) ? (
                React.cloneElement(rightIcon, {
                  minWidth: iconSize,
                  minHeight: iconSize,
                } as any)
              ) : (
                <span style={{ fontSize: iconSize }}>{rightIcon}</span>
              )}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
