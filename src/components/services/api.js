import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38932805-d594196d8ad5a18d00bd574f9';
export const PER_PAGE = 12;

// export async function getImages(query, page) {
//   const separatorIndex = query.indexOf('/'); // визначає індекс першого входження символу `/` в рядку `query`
//   const parcedQuery = query.slice(separatorIndex + 1, query.length);
//   return axios.get(
//     `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
//   );
// }

export const getImages = async (query, page) => {
  const separatorIndex = query.indexOf('/');
  const parcedQuery = query.slice(separatorIndex + 1, query.length);

  const data = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
  );
  return data;
};
