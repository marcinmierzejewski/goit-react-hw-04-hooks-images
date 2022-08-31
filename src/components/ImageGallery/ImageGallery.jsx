import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, openModalWindow }) => {
  const { Gallery } = styles;

  return (
    <>
      {pictures.length > 0 ? (
        <ul className={Gallery} onClick={openModalWindow}>
          {pictures.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      ) : (
        ''
      )}
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
  openModalWindow: PropTypes.func.isRequired,
};
