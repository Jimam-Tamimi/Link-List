"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing chevron icons
import { v4 as uuidv4 } from 'uuid';

interface Option {
  value: string;
  label: string;
  icon?: ReactNode; // Optional icon property for each option
}

interface SelectProps {
  options: Option[];
  defaultValue?: Option; // Optional default value for the select
  label: String; // Optional default value for the select
  iconLabel?: ReactNode; 
  onSelect?: (option: Option) => void;
}

const Select: React.FC<SelectProps> = ({ options, defaultValue, onSelect, label, iconLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultValue || null
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); // Call the onSelect callback if provided
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [labelId, setLabelId] = useState(uuidv4().slice(0, 10));
  
  
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm" htmlFor="1">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between input"
        >
          <div className="flex items-center justify-center">
            {selectedOption?.icon ? (
              <span className="mr-3">{selectedOption.icon}</span>
            ) : iconLabel ? 
            <span className="mr-3">{iconLabel}</span> : ''}
            {selectedOption ? selectedOption.label : "Select an option"}
          </div>
          <motion.span
            className="ml-2"
            animate={{ rotate: isOpen ? 180 : 0 }} // Animate rotation on open/close
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="absolute z-10 w-full transition-none border-none input bg-[#ffffff75] dark:bg-[#00000075] backdrop-blur-[10px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <motion.li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  whileHover={{ x: 10 }}
                  className={`flex items-center py-2 cursor-pointer ${
                    selectedOption?.value === option.value
                      ? "!translate-x-[10px]"
                      : ""
                  }`}
                >
                  {option.icon && <span className="mr-3">{option.icon}</span>}{" "}
                  {/* Render icon if it exists */}
                  {option.label}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
