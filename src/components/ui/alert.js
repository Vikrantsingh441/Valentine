import React from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export const Alert = ({ children, className, onClose }) => {
  return (
    <div
      className={`alert d-flex align-items-start p-3 p-sm-4 rounded shadow-sm position-relative ${className}`}
      style={{ zIndex: "888", left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="flex-grow-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-link text-secondary p-0 ms-3"
          aria-label="Close"
        >
          <X size="20" className="d-block d-sm-none" />
          <X size="24" className="d-none d-sm-block d-md-none" />
          <X size="28" className="d-none d-md-block" />
        </button>
      )}
    </div>
  );
};

export const AlertTitle = ({ children }) => {
  return <h4 className="fw-bold mb-2 fs-4 fs-sm-4">{children}</h4>;
};

export const AlertDescription = ({ children }) => {
  return <p className="mb-0 text-muted fs-5 fs-sm-5">{children}</p>;
};

// PropTypes for better validation (optional)
Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

AlertTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

AlertDescription.propTypes = {
  children: PropTypes.node.isRequired,
};
