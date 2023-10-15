import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38400655-50a1fa45dda9b327a83dd0d24';
export const PER_PAGE = 12;

export async function getImages(query, page) {
  const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
  const parcedQuery = query.slice(separatorIndex + 1, query.length);
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
  );
}

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
