import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ modalImgLarge, closeImg }) => {
  const { Overlay, Modal } = styles;

  return (
    <div className={Overlay} onClick={closeImg}>
      <div className={Modal}>
        <img src={modalImgLarge} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalImgLarge: PropTypes.string.isRequired,
  closeImg: PropTypes.func.isRequired,
};
