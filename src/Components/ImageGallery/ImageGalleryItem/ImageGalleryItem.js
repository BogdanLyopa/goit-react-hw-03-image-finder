const ImageGalleryItem = ({ src, largeImageURL, tags, onOpen }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={tags}
        className="ImageGalleryItem-image"
        data-img={largeImageURL}
        onClick={onOpen}
      />
    </li>
  );
};

export default ImageGalleryItem;
