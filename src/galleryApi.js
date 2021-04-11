/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const fetchHits = ({ searchQuery = '', page = 1 }) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=20363130-273044db5e5ac809a489365f2&image_type=photo&orientation=horizontal&per_page=12`,
  );
};

export default { fetchHits };
