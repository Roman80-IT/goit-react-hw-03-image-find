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
  // Ініціалізація стану компонента
  state = {
    query: '', // Пошуковий запит
    image: [], // Масив зображень
    totalImage: 0, // Загальна кількість зображень, які можна знайти
    page: 1, // Поточна сторінка результатів
    selectedImageUrl: '', // URL вибраного зображення для модального вікна
    load: false, // Прапорець завантаження (спіннера)
    error: false, // Прапорець помилки запиту
  };

  // Метод викликається при оновленні стану компонента
  async componentDidUpdate(_, prevState) {
    // Перевірка на зміну пошукового запиту або сторінки
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        // Позначаємо, що розпочалася загрузка та немає помилки
        this.setState({ load: true, error: false });
        // Виконуємо запит на отримання зображень з API
        const response = await getImages(this.state.query, this.state.page);
        // Оновлюємо стан компонента з отриманими результатами
        this.setState({
          image: [...this.state.image, ...response.data.hits],
          totalImage: response.data.totalHits,
        });
      } catch {
        // В разі помилки позначаємо, що сталася помилка
        this.setState({ error: true });
      } finally {
        // Завершуємо загрузку (при успішному або невдалому запиті)
        this.setState({ load: false });
      }
    }
  }

  // Обробник подання форми пошуку
  getQuery = e => {
    e.preventDefault();
    // Оновлюємо стан компонента з новим пошуковим запитом і скидаємо сторінку і результати
    this.setState({
      query: `${Date.now()}/${e.target.elements.query.value}`,
      page: 1,
      image: [],
      totalImage: 0,
    });
  };

  // Обробник натискання кнопки "Load more"
  onBtnClick = () => {
    // Збільшуємо номер сторінки
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // Обробник кліку на зображення для відкриття модального вікна
  getImageForModal = url => {
    // Встановлюємо URL вибраного зображення
    this.setState({ selectedImageUrl: url });
  };

  // Обробник закриття модального вікна
  onModalClose = () => {
    // Закриваємо модальне вікно
    this.setState({ selectedImageUrl: '' });
  };

  // Рендеринг компонента
  render() {
    return (
      <Layout>
        {/* Компонент для введення пошукового запиту */}
        <Searchbar onSubmit={this.getQuery}></Searchbar>
        {this.state.image.length !== 0 && (
          /* Компонент для відображення галереї зображень */
          <ImageGallery
            image={this.state.image}
            onImageClick={this.getImageForModal}
          ></ImageGallery>
        )}

        {this.state.load && <Loader></Loader>}

        {this.state.image.length !== 0 &&
          this.state.totalImage > PER_PAGE * this.state.page && (
            /* Компонент кнопки "Load more" */
            <Button onClick={this.onBtnClick}></Button>
          )}

        {/* Компонент для відображення повідомлень про помилки або пустий результат */}
        <Message
          error={this.state.error}
          empty={
            this.state.image.length === 0 &&
            this.state.query !== '' &&
            !this.state.load
          }
        ></Message>
        {/* Компонент для модального вікна */}
        <Modal
          url={this.state.selectedImageUrl}
          query={this.state.query}
          onModalClose={this.onModalClose}
        ></Modal>
        {/* Глобальні стилі */}
        <GlobalStyle></GlobalStyle>
      </Layout>
    );
  }
}
