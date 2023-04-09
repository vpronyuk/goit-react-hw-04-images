import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ requestedImg, onSelect }) {
  return (
    <ul className="ImageGallery">
      {requestedImg.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onSelect={() => onSelect(largeImageURL)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  requestedImg: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
