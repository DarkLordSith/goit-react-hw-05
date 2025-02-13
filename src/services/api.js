import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjA3MzU4NmMyYTJjNGRhNjM3ZjRlMDlkOWFlNjUzOSIsIm5iZiI6MTczNjAwMjQ5OS44NzY5OTk5LCJzdWIiOiI2Nzc5NGJjM2MxMWVlNjFkZDg3NGRhYWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.alx1HlTzAXjlTam4qMF4hOC3BNkaRdsoq_s5QU7yehM";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return response.data;
};

export const fetchMovieCast = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return response.data.results;
};
