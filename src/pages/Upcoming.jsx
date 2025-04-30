import { useQuery } from '@tanstack/react-query';
import { getUpcomingMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useHoverStore from '../store/useHoverStore';
import { useEffect } from 'react';

function Upcoming() {
	const { currentPage, setCurrentPage, setTotalPages } = useHoverStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ['upcomingMovies', currentPage],
		queryFn: () => getUpcomingMovies(currentPage),
		onSuccess: (data) => {
			setTotalPages(data.total_pages);
		},
	});

	useEffect(() => {
		return () => {
			setCurrentPage(1);
		};
	}, []);

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>에러가 발생했습니다: {error.message}</div>;

	return (
		<div className="upcoming">
			<h1>개봉 예정 영화</h1>
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

export default Upcoming;
