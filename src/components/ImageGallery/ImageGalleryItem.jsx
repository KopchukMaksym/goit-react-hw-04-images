import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ originUrl, image }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = () => {
    setModalOpen(true);
    setModalContent(originUrl);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <>
      {modalOpen && <Modal originUrl={modalContent} closeModal={closeModal} />}
      <li onClick={() => openModal(originUrl)} className={s.galleryItem}>
        <img src={image} alt="" className={s.imageItem} />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  props: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      originUrl: PropTypes.string.isRequired,
    })
  ),
};
