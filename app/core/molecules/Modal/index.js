import React from 'react';
import ReactModal from 'react-modal';
import { CloseIcon } from 'core';
import './index.css';

type Props = {
  onRequestClose(event: Event): mixed,
  children: React$Element,
  otherProps: any,
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 10000,
  },
  content: {
    position: 'relative',
    width: '340px',
    height: 'auto',
    top: '30%',
    left: '0',
    right: '0',
    bottom: '0',
    transform: 'perspective(1px) translateY(-30%)',
    border: 'none',
    background: 'white',
    overflow: 'initial',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '30px',
    margin: '0 auto',
    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.05), 0 10px 10px 0 rgba(0, 0, 0, 0.25)',
  },
};

const Modal = ({ onRequestClose, children, ...otherProps }: Props) => (
  <ReactModal
    {...otherProps}
    onRequestClose={onRequestClose}
    style={modalStyles}
  >
    <button styleName="close" onClick={onRequestClose} type="button">
      <CloseIcon />
    </button>
    {children}
  </ReactModal>
);

export default Modal;
