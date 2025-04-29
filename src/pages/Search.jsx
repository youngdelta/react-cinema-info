import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useHoverStore from '../store/useHoverStore';

function Search() {
	const [searchQuery, setSearchQuery] = useState('');
	const { currentPage, setTotalPages } = useHoverStore();

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['searchMovies', searchQuery, currentPage],
		queryFn: () => searchMovies(searchQuery, currentPage),
		enabled: false,
		onSuccess: (data) => {
			setTotalPages(data.total_pages);
		},
	});

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			refetch();
		}
	};

	if (isLoading) return <div>로딩 중...</div>;
	if (error) return <div>에러가 발생했습니다: {error.message}</div>;

	return (
		<div className="search">
			<h1>영화 검색</h1>
			<form
				onSubmit={handleSearch}
				className="search-form"
			>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="영화 제목을 입력하세요"
					className="search-input"
				/>
				<button
					type="submit"
					className="search-button"
				>
					검색
				</button>
			</form>
			{data && (
				<>
					<div className="movie-grid">
						{data.results.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
							/>
						))}
					</div>
					<Pagination totalPages={data.total_pages} />
				</>
			)}
		</div>
	);
}

export default Search;
