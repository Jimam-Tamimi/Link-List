"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

interface Option {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectProps {
  options: Option[];
  defaultValue?: Option | null;
  label: string;
  iconLabel?: ReactNode;
  error?: string;
  onSelect?: (option: Option) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultValue,
  onSelect,
  label,
  iconLabel,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(defaultValue || null);
  const [searchQuery, setSearchQuery] = useState<string>(selectedOption?.label || ""); // Search starts with the selected option label if available
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setSearchQuery(option.label); // Set search query to the selected label
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full relative ">
      <label className="block mb-2 text-sm" htmlFor="select">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center justify-between input"
          onClick={() => setIsOpen(true)} // Ensure the dropdown opens when clicking anywhere on the button/input
        >
          <div className="flex items-center w-full">
            {/* Show the selected option's icon or a default icon beside the input text */}
            {selectedOption?.icon ? (
              <span className="mr-3">{selectedOption.icon}</span>
            ) : iconLabel ? (
              <span className="mr-3">{iconLabel}</span>
            ) : null}
            <input
              type="text"
              className="bg-transparent outline-none w-full"
              placeholder="Select an option"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)} // Open dropdown on focus
            />
          </div>
          <motion.span
            className="ml-2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown />
          </motion.span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-10 w-full transition-none border-none input bg-[#ffffff75] dark:bg-[#00000075] backdrop-blur-[10px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.ul>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
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
                      {option.icon && <span className="mr-3">{option.icon}</span>}
                      {option.label}
                    </motion.li>
                  ))
                ) : (
                  <motion.li className="py-2 px-2 text-gray-500">
                    No options found
                  </motion.li>
                )}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p
        className={`text-red-500 font-bold tracking-wide text-sm ${
          error ? "visible" : "invisible"
        } mt-1 transition-all duration-100 ease-in-out`}
      >
        {error ? error : "_"}
      </p>
    </div>
  );
};

export default Select;
