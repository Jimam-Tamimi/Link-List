
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  centered?: boolean;
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  fullScreen?: boolean;
  id?: string;
  keepMounted?: boolean;
  lockScroll?: boolean;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
  padding?: string;
  radius?: string | number;
  shadow?: string;
  size?: number | string;
  transitionProps?: {
    duration?: number;
    transition?: string;
  };
  trapFocus?: boolean;
  withCloseButton?: boolean;
  withOverlay?: boolean;
  withinPortal?: boolean;
  xOffset?: string | number;
  yOffset?: string | number;
  zIndex?: string | number;
  animationType?: 'pop' | 'slide' | 'scale' | 'fade'; // Add this line
}

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  title,
  children,
  centered = false,
  closeButtonProps,
  closeOnClickOutside = true,
  closeOnEscape = true,
  fullScreen = false,
  id,
  keepMounted = false,
  lockScroll = true,
  overlayProps,
  padding = 'md',
  radius = 'md',
  shadow = 'xl',
  size = 'md',
  transitionProps = { duration: 0.5, transition: 'pop' },
  trapFocus = true,
  withCloseButton = true,
  withOverlay = true,
  withinPortal = true,
  xOffset = '5vw',
  yOffset = '5vh',
  zIndex = 200,
  animationType = 'pop', // Default to 'pop'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened && lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [opened, lockScroll]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      onClose();
    }
  };

//   useFocusEffect(
//     React.useCallback(() => {
//       if (trapFocus && opened) {
//         const firstFocusableElement = modalRef.current?.querySelector<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
//         firstFocusableElement?.focus();
//       }
//     }, [trapFocus, opened])
//   );

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeOnEscape]);

  // Define animation variants
  const animationVariants = {
    pop: {
      hidden: { opacity: 0, scale: 0.7 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.7 },
    },
    slide: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.5 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  };

  return (
    <div>
      {opened && withOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          style={{ zIndex }}
          onClick={handleOverlayClick}
          {...overlayProps}
        />
      )}
      {opened && (
        <motion.div
          className={`fixed ${fullScreen ? 'inset-0' : `top-[${yOffset}] left-[${xOffset}]`} bg-white rounded-lg shadow-lg z-50`}
          style={{ padding }}
          ref={modalRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants[animationType]} // Use the selected animation variant
          transition={{ duration: transitionProps.duration, type: transitionProps.transition }}
        >
          {withCloseButton && (
            <button
              {...closeButtonProps}
              onClick={onClose}
              className="absolute top-2 right-2"
            >
              &times;
            </button>
          )}
          {title && <div className="text-xl font-bold mb-4">{title}</div>}
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default Modal;
