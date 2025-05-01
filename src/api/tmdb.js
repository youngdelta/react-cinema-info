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

// 인물 검색 API
export const searchPeople = async (query, page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/search/person?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`
	);
	return response.data;
};

// 인물 상세 정보 API
export const getPersonDetails = async (personId) => {
	const response = await axios.get(
		`${BASE_URL}/person/${personId}?api_key=${API_KEY}&language=ko-KR`
	);
	return response.data;
};

// 인물의 출연작/제작 작품 API
export const getPersonCredits = async (personId) => {
	const response = await axios.get(
		`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}&language=ko-KR`
	);
	return response.data;
};

export const getTVDetails = async (id) => {
	const response = await fetch(
		`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR`
	);
	if (!response.ok) {
		throw new Error('TV 프로그램 정보를 가져오는데 실패했습니다.');
	}
	return response.json();
};

export const getTVCredits = async (id) => {
	const response = await fetch(
		`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`
	);
	if (!response.ok) {
		throw new Error('TV 프로그램 출연진 정보를 가져오는데 실패했습니다.');
	}
	return response.json();
};

export const getTVVideos = async (id) => {
	const response = await fetch(
		`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=ko-KR`
	);
	if (!response.ok) {
		throw new Error('TV 프로그램 영상을 가져오는데 실패했습니다.');
	}
	return response.json();
};

export const getTVImages = async (id) => {
	const response = await fetch(
		`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`
	);
	if (!response.ok) {
		throw new Error('TV 프로그램 이미지를 가져오는데 실패했습니다.');
	}
	return response.json();
};

export const searchMulti = async (query, page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`
	);
	return response.data;
};

export const getPopularTV = async (page = 1) => {
	const response = await axios.get(
		`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
	);
	return response.data;
};

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
