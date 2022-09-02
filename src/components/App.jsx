import { useState, useEffect, useCallback } from 'react';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhotos } from 'api/fetchPhotos';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [nextSearch, setNextSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [error, setError] = useState(null);

  const updatePictures = useCallback(async newSearch => {

    try {
      if (search !== newSearch) {
        setPage(() => 1);
      }
      setIsLoading(() => true)
      const photos = await fetchPhotos(newSearch, page);
      const oldPictures = pictures;
      if (photos.length !== 0) {
        const newPictures = [...oldPictures, ...photos];
        if (search !== newSearch) {
          setPictures(() => photos);
        }
        if (search === newSearch) {
          setPictures(() => newPictures);
          setPage((oldPage) => oldPage + 1);
        }
      } else {
        alert('Sorry, no image matching');
      }
    } catch (error) {
      setError(() => error)
    } finally {
      setIsLoading(() => false)
    }
  }, [page, pictures, search]);

  const resetArray = searchPicture => {
    setSearch(() => searchPicture);
    setPictures(() => []);
    setPage(() => 1);
  };

  const changeSearchValue = ({ searchPicture }) => {
    resetArray(searchPicture);
    updatePictures(searchPicture);
  };

  const loadMorePictures = () => {
    updatePictures(nextSearch);
  };

  useEffect (() => {
    if (nextSearch !== search) {
      updatePictures(search);
      setNextSearch(search);
    }
  }, [search, nextSearch, updatePictures]);

  const openModalWindow = e => {
    const largeImg = e.target.dataset.source;
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setModalImg(() => largeImg);
    setIsModalOpen(() => true); 
  };

  const closeModalWindow = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    setIsModalOpen(() => false);
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          setIsModalOpen(() => false);
        }
      });
    }
  }, [isModalOpen])    

    return (
      <div>
        <SearchBar newSearch={changeSearchValue} />
        {error && <p>ERROR: Whoops O_o, something went wrong: {error.message}</p>}
         <ImageGallery
            pictures={pictures}
            openModalWindow={openModalWindow}
          />
        {isLoading && <Loader/>}
        {pictures.length !== 0 && 
          <Button text="Load more" func={loadMorePictures} />
        }
        {isModalOpen ? (
          <Modal modalImgLarge={modalImg} closeImg={closeModalWindow} />
        ) : (
          <></>
        )}
      </div>
    );
  }



// import { useState, useEffect } from 'react';

// import { SearchBar } from './SearchBar/SearchBar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
// import { fetchPhotos } from 'api/fetchPhotos';

// export class App extends Component {
//   state = {
//     pictures: [],
//     page: 1,
//     search: '',
//     nextSearch: '',
//     isLoading: false,
//     isModalOpen: false,
//     modalImg: null,
//     error: null,
//   };

//   updatePictures = async newSearch => {
//     const { page, pictures, search } = this.state;

//     try {
//       const photos = await fetchPhotos(newSearch, page);
//       const oldPictures = pictures;
//       if (photos.length !== 0) {
//         const newPictures = [...oldPictures, ...photos];
//         if (search !== newSearch) {
//           this.setState({ pictures: photos, page: 1 });
//         }
//         if (search === newSearch) {
//           this.setState({ pictures: newPictures, page: page + 1 });
//         }
//       } else {
//         alert('Sorry, no image matching');
//       }
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   resetArray = searchPicture => {
//     this.setState({
//       search: searchPicture,
//       isLoading: true,
//       pictures: [],
//       page: 1,
//     });
//   };

//   changeSearchValue = ({ searchPicture }) => {
//     this.resetArray(searchPicture);
//     this.updatePictures(searchPicture);
//   };

//   loadMorePictures = () => {
//     const { nextSearch } = this.state;
//     this.updatePictures(nextSearch);
//   };

//   async componentDidUpdate() {
//     const { search, nextSearch } = this.state;
//     if (nextSearch !== search) {
//       this.updatePictures(search);
//       this.setState({ nextSearch: search });
//     }
//   }

//   openModalWindow = e => {
//     const largeImg = e.target.dataset.source;
//     if (e.target.nodeName !== 'IMG') {
//       return;
//     }
//     this.setState({
//       modalImg: largeImg,
//       isModalOpen: true,
//     });
//   };

//   closeModalWindow = e => {
//     if (e.target.nodeName === 'IMG') {
//       return;
//     }
//     this.setState({ isModalOpen: false });
//   };

//   render() {
//     const { error, pictures, isLoading, isModalOpen, modalImg } = this.state;

//     if (isModalOpen) {
//       window.addEventListener('keydown', e => {
//         if (e.code === 'Escape') {
//           this.setState({ isModalOpen: false });
//         }
//       });
//     }

//     return (
//       <div>
//         <SearchBar newSearch={this.changeSearchValue} />
//         {error && <p>ERROR: Whoops O_o, something went wrong: {error.message}</p>}
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <ImageGallery
//             pictures={pictures}
//             openModalWindow={this.openModalWindow}
//           />
//         )}
//         {pictures.length !== 0 ? (
//           <Button text="Load more" func={this.loadMorePictures} />
//         ) : (
//           ''
//         )}
//         {isModalOpen ? (
//           <Modal modalImgLarge={modalImg} closeImg={this.closeModalWindow} />
//         ) : (
//           <></>
//         )}
//       </div>
//     );
//   }
// }
