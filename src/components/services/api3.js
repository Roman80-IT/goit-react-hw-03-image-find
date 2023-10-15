import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38932805-d594196d8ad5a18d00bd574f9';
export const PER_PAGE = 12;

// export const getImages = async (query, page) => {
// const queryParams = `key=${API_KEY}&q=${query}&image_type=photo`;

// const { data } = await axios.get(`${BASE_URL}?${queryParams}`);

// const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
// const parcedQuery = query.slice(separatorIndex + 1, query.length);
//   return axios.get(

//   const { data } = await axios.get(
//     `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
//   );
//   return data;
// };

// export async function getImages(query, page) {
//   const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
//   const parcedQuery = query.slice(separatorIndex + 1, query.length);
//   return axios.get(
//     `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
//   );
// };

//////////////////////////////////////////

export const getImages = async (query, page) => {
  const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
  const parcedQuery = query.slice(separatorIndex + 1, query.length);

  const { data } = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
  );
  return data.hits;
};

//////////////////////////////////////////

// export async function getImages(query, page) {
//   const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
//   const parcedQuery = query.slice(separatorIndex + 1, query.length);
//   return axios.get(
//     `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
//   );
// }

//////////////////////////////////////////

//? const parcedQuery = query.slice(separatorIndex + 1, query.length);
//* `query` - це рядок, який містить текстовий запит для пошуку зображень. (Наприклад: "cat/2" ("cat" - це фактичний запит для пошуку, а "2" - номер сторінки).

//* `separatorIndex` - це змінна, яка містить індекс символу "/", який розділяє фактичний запит для пошуку та номер сторінки.
//* У нашому прикладі separatorIndex буде рівним 3, оскільки "/" знаходиться на четвертій позиції (індекс 3, якщо рахувати з нуля) у рядку "cat/2".

//* parcedQuery - це змінна, яка буде містити рядок, який починається з символа "/", тобто у нашому прикладі це буде "2".
//* Ця змінна створюється за допомогою методу `slice`.

//* Метод `slice` використовується для вирізання частини рядка. У нашому випадку query.slice(separatorIndex + 1, query.length) робить наступне:

//* separatorIndex + 1 вказує на позицію після символа "/", тобто на початок числової частини (у нашому прикладі, це "2").
//* query.length вказує на кінець рядка, щоб вибрати усі символи після позиції separatorIndex + 1.
//* Отже, результатом виразу query.slice(separatorIndex + 1, query.length) у нашому прикладі буде рядок "2", який містить номер сторінки для подальшого використання.
