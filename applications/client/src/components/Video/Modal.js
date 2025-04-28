// Modal.js
import React from "react";
import "./Modal.css"; // Create a CSS file for modal styles

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h3 className="modal-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
