import axios from 'axios';

export const fetchPictures = async (page, search, nextSearch) => {
  const API_KEY = '1424879-278d005ef871cdc02a09416fb';
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: {page},
    });
    if (nextSearch  !==  search) {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextSearch}&${params}`
        
      );
      
      const responseData = response.data.hits;
      return responseData
      
    } 
}