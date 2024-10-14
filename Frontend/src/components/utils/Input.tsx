import React, { InputHTMLAttributes, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  containerStyle?: React.CSSProperties;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoaded?: boolean;
  error?: string;
}

// Use forwardRef to pass ref to the input element
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClass,
      containerStyle,
      label,
      isLoaded = true,
      leftIcon,
      rightIcon,
      error,
      ...props
    },
    ref
  ) => {
    const defaultIconSize = 20;

    // Function to determine icon size
    const getIconSize = (icon: React.ReactNode) => {
      if (React.isValidElement(icon) && icon.props.size) {
        return icon.props.size; // Use passed size if available
      }
      return defaultIconSize; // Fallback to default size
    };

    return (
      <>
        <div
          className={`w-full flex flex-col   items-start justify-center   ${containerClass}`}
          style={containerStyle}
        >
          <>
            {label && (
              <label className="block mb-2 text-sm" htmlFor={props.id}>
                {label}{" "}
                {props.required ? <span className="text-red-500">*</span> : ""}
              </label>
            )}
            {isLoaded ? (
              <div className="relative flex items-center w-full">
                {leftIcon && (
                  <span
                    className="absolute z-10 flex items-center left-3"
                    style={{
                      minWidth: defaultIconSize,
                      minHeight: defaultIconSize,
                    }}
                  >
                    {React.isValidElement(leftIcon) ? (
                      React.cloneElement(leftIcon, {
                        size: getIconSize(leftIcon), // Get icon size
                      } as any)
                    ) : (
                      <span style={{ fontSize: getIconSize(leftIcon) }}>
                        {leftIcon}
                      </span>
                    )}
                  </span>
                )}
                <input
                  ref={ref} // Attach ref here
                  className={`input w-full ${props.className}`}
                  placeholder={props.placeholder || label}
                  style={{
                    paddingLeft: leftIcon ? `${defaultIconSize + 20}px` : "",
                    paddingRight: rightIcon ? `${defaultIconSize + 20}px` : "",
                  }} // Adjust padding based on icon presence
                  {...props}
                />
                {rightIcon && (
                  <span
                    className="absolute z-10 flex items-center right-3"
                    style={{
                      minWidth: defaultIconSize,
                      minHeight: defaultIconSize,
                    }}
                  >
                    {React.isValidElement(rightIcon) ? (
                      React.cloneElement(rightIcon, {
                        size: getIconSize(rightIcon), // Get icon size
                      } as any)
                    ) : (
                      <span style={{ fontSize: getIconSize(rightIcon) }}>
                        {rightIcon}
                      </span>
                    )}
                  </span>
                )}
              </div>
            ) : (
              <Skeleton
                className="w-full h-[40px]"
                containerClassName="w-full  block"
              />
            )}
            <p
              className={`text-red-500 font-bold tracking-wide text-xs mt-1 ${
                error ? "visible" : "invisible"
              } mt-1 transition-all duration-100 ease-in-out `}
            >
              {error ? error : "_"}
            </p>
          </>
        </div>
      </>
    );
  }
);

// Rename the display name for better debugging
Input.displayName = "Input";

export default Input;
