import React from "react";
import API from "../../../api/apiRoutes.jsx";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a2332] p-6 rounded-lg w-96 max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
export default Modal