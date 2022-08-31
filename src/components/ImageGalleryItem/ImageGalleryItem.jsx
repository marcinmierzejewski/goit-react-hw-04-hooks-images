import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const { GalleryItem, GalleryItemImage } = styles;

  return (
    <li className={GalleryItem}>
      <img
        className={GalleryItemImage}
        src={webformatURL}
        alt=""
        data-source={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
