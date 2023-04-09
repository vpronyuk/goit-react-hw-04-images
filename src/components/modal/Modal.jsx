import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

export default function Modal({ onClose, selectedImg }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={selectedImg} alt="Pixabay" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  selectedImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
