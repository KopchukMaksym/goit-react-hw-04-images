import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';

export const Modal = ({ originUrl, closeModal }) => {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
  }, [closeModal]);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  const closeImgModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className={s.overlay} onClick={closeImgModal}>
      <div className={s.modal}>
        <img src={originUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  originUrl: PropTypes.string,
  closeModal: PropTypes.func,
};
