import { useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ onClose, src, alt }) {
  useEffect(() => {
    const handleClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  const handleCloseClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles['Overlay']} onClick={handleCloseClick}>
      <div className={styles['Modal']}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
export default Modal;
