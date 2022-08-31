import axios from 'axios';

export const fetchPhotos = async (searchP, currentPage) => {

  const API_KEY = '1424879-278d005ef871cdc02a09416fb';
  const params = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page: currentPage,
  });

  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchP}&${params}`
  );
  const responseData = response.data.hits;
  return responseData;
};
