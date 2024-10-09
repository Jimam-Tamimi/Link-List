import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode; 
}

const Input: React.FC<InputProps> = ({
  containerClass,
  containerStyle,
  label,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Default icon size
  const defaultIconSize = 20;

  // Function to determine icon size
  const getIconSize = (icon: React.ReactNode) => {
    if (React.isValidElement(icon) && icon.props.size) {
      return icon.props.size; // Use passed size if available
    }
    return defaultIconSize; // Fallback to default size
  };

  return (
    <div className={`w-full flex flex-col items-start justify-center ${containerClass}`} style={containerStyle}>
      {label && (
        <label className="block mb-2 text-sm" htmlFor={props.id}>
          {label} {props.required ? <span className="text-red-500">*</span> : ""}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            className="absolute left-3 flex z-10 items-center"
            style={{ minWidth: defaultIconSize, minHeight: defaultIconSize }}
          >
            {React.isValidElement(leftIcon) ? (
              React.cloneElement(leftIcon, {
                size: getIconSize(leftIcon), // Get icon size
              } as any)
            ) : (
              <span style={{ fontSize: getIconSize(leftIcon) }}>{leftIcon}</span>
            )}
          </span>
        )}
        <input
          {...props}
          className={`input w-full ${props.className}`}
          placeholder={props.placeholder || label}
          style={{
            paddingLeft: leftIcon ? `${defaultIconSize + 20}px` : '',
            paddingRight: rightIcon ? `${defaultIconSize + 20}px` : '',
          }} // Adjust padding based on icon presence
        />
        {rightIcon && (
          <span
            className="absolute right-3 z-10 flex items-center"
            style={{ minWidth: defaultIconSize, minHeight: defaultIconSize }}
          >
            {React.isValidElement(rightIcon) ? (
              React.cloneElement(rightIcon, {
                size: getIconSize(rightIcon), // Get icon size
              } as any)
            ) : (
              <span style={{ fontSize: getIconSize(rightIcon) }}>{rightIcon}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
