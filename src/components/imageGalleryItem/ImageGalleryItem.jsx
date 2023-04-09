import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onSelect,
}) {
  const handleImgClick = () => {
    onSelect(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} onClick={handleImgClick} />
      {largeImageURL && (
        <div className="Overlay">
          <div className="Modal">
            <img src={largeImageURL} alt={tags} />
          </div>
        </div>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
