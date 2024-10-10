import React, { forwardRef } from "react";

interface SmoothDivProps extends React.HTMLAttributes<HTMLDivElement> {}

const SmoothDiv = forwardRef<HTMLDivElement, SmoothDivProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props} // Spread all props to the div
        className={`transition-all duration-500 ease-in-out ${props.className || ''}`} // Smooth transition for all changes
        style={{
          ...style, // Merge custom styles from props
          transition: "height 1s ease, width 1s ease", // Smooth height and width transition
        }}
      >
        {children}
      </div>
    );
  }
);

export default SmoothDiv;
