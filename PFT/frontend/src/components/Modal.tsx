import React from "react";
import modalPropsType from "../interfaces/modalPropsType";

const CustomModal:React.FC<modalPropsType> = ({ open, onClose, onConfirm, title, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 mb-40 bg-opacity-50 cursor-pointer">
      <div className="bg-white p-6 text-black rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-950 text-white rounded-md cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-950 text-white  rounded-md cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;