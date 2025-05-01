import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
	baseURL: BASE_URL,
	params: {
		api_key: API_KEY,
		language: 'ko-KR',
	},
});

/**
 *
 * @param {*} page
 * @returns
 */
export const getPopularMovies = async (page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
	);
	return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
	);
	return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=${page}`
	);
	return response.data;
};

export const getMovieDetails = (movieId) => {
	return tmdbApi.get(`/movie/${movieId}`);
};

export const getMovieCredits = (movieId) => {
	return tmdbApi.get(`/movie/${movieId}/credits`);
};

export const searchMovies = async (query, page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`
	);
	return response.data;
};

export const getMovieVideos = async (movieId) => {
	const response = await axios.get(
		`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
	);
	return response.data;
};

export const getMovieImages = async (movieId) => {
	const response = await axios.get(
		`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
	);
	return response.data;
};

export async function getTrendingMovies() {
	const response = await fetch(
		`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR`
	);
	return response.json();
}
/* 
export async function getMovieDetails(movieId) {
	const response = await fetch(
		`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
	);
	return response.json();
}
 */
/* 
export async function getMovieCredits(movieId) {
	const response = await fetch(
		`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
	);
	return response.json();
}
 */
/* 
export async function getMovieVideos(movieId) {
	const response = await fetch(
		`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
	);
	return response.json();
}
 */
/* 
export async function searchMovies(query) {
	const response = await fetch(
		`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(
			query
		)}`
	);
	return response.json();
}
 */
/* 
export async function getMovieImages(movieId) {
	const response = await fetch(
		`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
	);
	return response.json();
}
 */
