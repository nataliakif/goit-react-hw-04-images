import { useState, useEffect } from 'react';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import API from '../services/api';
import { Circles } from 'react-loader-spinner';
import styles from './ImageGallery/ImageGallery.module.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [id, setId] = useState();
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
    const getImages = () => {
      if (page === 1) {
        setImages([]);
      }
      API.fetchImages(query, page)
        .then(response => {
          if (response.totalHits === 0) {
            return Promise.reject(
              new Error(`Nothing was found by query ${query}`)
            );
          } else {
            setImages(images => [...images, ...response.hits]);
            setStatus('resolved');
            setTotalHits(response.totalHits);
            setShowModal(false);
          }
        })
        .catch(error => {
          setStatus('rejected');
          setError(error);
        });
    };
    getImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handleFormSubmit = query => {
    setQuery(query);
  };
  const onGalleryClick = id => {
    setId(id);
    setShowModal(true);
  };
  const toggleModal = () => {
    setShowModal(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  const modalData = () => {
    const image = images.find(image => image.id === this.state.id);
    return image;
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />;
      {status === 'loading' && (
        <div className={styles['Spinner']}>
          <Circles color="#3f51b5" height={80} width={80} ariaLabel="loading" />
        </div>
      )}
      {status === 'rejected' && (
        <p className={styles['ImageGallery__rejected']}>{error.message}</p>
      )}
      {status === 'resolved' && totalHits > 12 && (
        <>
          <ImageGallery images={images} onClick={onGalleryClick} />
          <Button onClick={handleLoadMore} />
        </>
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          src={modalData().largeImageURL}
          alt={modalData().tags}
        />
      )}
    </>
  );
}
