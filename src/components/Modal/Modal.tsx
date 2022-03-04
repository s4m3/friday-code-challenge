import React from 'react';
import './Modal.css';

type ModalProps = {
  open: boolean,
  title: string,
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({open, title, children, onClose}: ModalProps) => {
  if (!open) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
