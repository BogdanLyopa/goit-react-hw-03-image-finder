import React, { Component } from 'react';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import galleryApi from './galleryApi';
import Modal from './Components/Modal';
import Button from './Components/Button';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles.css';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      pictures: [],
    });
  };

  fetchHits = () => {
    const { page, searchQuery } = this.state;

    const options = {
      searchQuery,
      page,
    };

    this.setState({ isLoading: true });
    galleryApi
      .fetchHits(options)
      .then(({ data }) => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...data.hits],
          page: prevState.page + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = event => {
    this.setState({
      largeImage: event.target.dataset.img,
    });
    this.toggleModal();
  };

  render() {
    const { pictures, isLoading, showModal, largeImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        )}

        <ImageGallery pictures={pictures} onOpenModal={this.onOpenModal} />
        {pictures.length > 0 && !isLoading && (
          <Button loadMore={this.fetchHits} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
