import { useEffect, useState } from 'react';
import '../../styles/styles.css';

import ImageGallery from 'components/imageGallery/ImageGallery';
import Searchbar from 'components/searchBar/Searchbar';
import Loader from 'components/loader/Loader';
import fetchImg from 'services/fetch';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';

export default function App() {
  const [requestedImg, setRequestedImg] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadImages() {
      setIsLoading(true);

      try {
        const imagesData = await fetchImg(userQuery, page, controller);

        if (!imagesData || imagesData.hits.length === 0) {
          throw new Error('No data from server!');
        }
        setRequestedImg(prevState => [...prevState, ...imagesData.hits]);
        setIsShowButton(page < Math.ceil(imagesData.totalHits / 12));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (userQuery.trim() !== '') {
      loadImages();
    }
    return () => {
      controller.abort();
    };
  }, [userQuery, page]);

  const onFormSubmit = query => {
    setUserQuery(query);
    setPage(1);
    setRequestedImg([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toogleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };

  const onSelectImg = largeImgURL => {
    setSelectedImg(largeImgURL);
    setIsShowModal(true);
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={onFormSubmit} />

      {requestedImg && requestedImg.length > 0 && (
        <>
          <ImageGallery requestedImg={requestedImg} onSelect={onSelectImg} />
          {isLoading && <Loader />}
          {isShowButton && <Button onClick={handleLoadMore} />}
        </>
      )}

      {isShowModal && (
        <Modal onClose={toogleModal} selectedImg={selectedImg}></Modal>
      )}
    </div>
  );
}
