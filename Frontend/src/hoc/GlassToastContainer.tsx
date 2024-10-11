import React from "react";
import { ToastContainer } from "react-toastify";
const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
export default function GlassToastContainer() {
  return (
    <>
      <ToastContainer
    

        draggable
      />
    </>
  );
}