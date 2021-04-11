import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ pictures, onOpenModal }) => {
  return (
    <ul className="ImageGallery">
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          src={picture.webformatURL}
          largeImageURL={picture.largeImageURL}
          tags={picture.tags}
          onOpen={onOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
