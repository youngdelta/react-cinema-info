import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';
import useStore from '../store/useStore';

function Popular() {
	const { currentPage, setCurrentPage, setTotalPages } = useStore();

	useEffect(() => {
		return () => {
			setCurrentPage(1);
		};
	}, []);

	const { data, isLoading, error } = useQuery({
		queryKey: ['popularMovies', currentPage],
		queryFn: () => getPopularMovies(currentPage),
		onSuccess: (data) => {
			setTotalPages(data.total_pages);
		},
	});

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>에러가 발생했습니다: {error.message}</div>;

	return (
		<div className="popular">
			<h1>인기 영화</h1>
			<div className="movie-grid">
				{data.results.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
					/>
				))}
			</div>
			<Pagination totalPages={data.total_pages} />
		</div>
	);
}

export default Popular;
