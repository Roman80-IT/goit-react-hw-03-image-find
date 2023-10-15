import { Component } from 'react';

import { PER_PAGE, getImages } from './services/api';

import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Layout } from './Layout/Layout.styled';
import { Modal } from './Modal/Modal';
import { Message } from './Message/Message';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    image: [],
    totalImage: 0,
    page: 1,
    selectedImageUrl: '',
    load: false,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
      //     try {
      //       this.setState({ load: true, error: false });
      //       const responce = await getImages(this.state.query, this.state.page);
      //       this.setState({
      //         image: [...this.state.image, ...responce.data.hits],
      //         totalImage: responce.data.totalHits,
      //       });
      //     } catch {
      //       this.setState({ error: true });
      //     } finally {
      //       this.setState({ load: false });
      //     }
    }
  }

  fetchImages = async () => {
    // const { query, page } = this.state;

    try {
      this.setState({ loading: true, error: false });

      const response = await getImages(this.state.query, this.state.page);

      //   await axios.get(
      //   `${BASE_URL}?key=${API_KEY}&q=${query}&per_page=${PER_PAGE}&page=${page}`
      // );

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        totalImages: response.data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: true });
      // this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  getQuery = e => {
    e.preventDefault();
    this.setState({
      query: `${Date.now()}/${e.target.elements.query.value}`,
      page: 1,
      image: [],
      totalImage: 0,
    });
  };

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImageForModal = url => {
    this.setState({ selectedImageUrl: url });
  };

  onModalClose = () => {
    this.setState({ selectedImageUrl: '' });
  };

  render() {
    const showImg = Array.isArray(this.state.image) && this.state.image.length;

    return (
      <Layout>
        <Searchbar onSubmit={this.getQuery}></Searchbar>
        {showImg && (
          <ImageGallery
            image={this.state.image}
            onImageClick={this.getImageForModal}
          ></ImageGallery>
        )}

        {this.state.load && <Loader></Loader>}

        {showImg && this.state.totalImage > PER_PAGE * this.state.page && (
          <Button onClick={this.onBtnClick}></Button>
        )}

        <Message
          error={this.state.error}
          empty={
            this.state.image.length === 0 &&
            this.state.query !== '' &&
            !this.state.load
          }
        ></Message>
        <Modal
          url={this.state.selectedImageUrl}
          query={this.state.query}
          onModalClose={this.onModalClose}
        ></Modal>
        <GlobalStyle></GlobalStyle>
      </Layout>
    );
  }
}
