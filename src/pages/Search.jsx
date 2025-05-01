import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useHoverStore from '../store/useHoverStore';
import useSearchStore from '../store/useSearchStore';

function Search() {
	// 검색어 상태를 전역 스토어에서 가져옴
	const { searchQuery, setSearchQuery } = useSearchStore();
	// 현재 페이지 번호와 전체 페이지 수를 설정하는 함수를 Zustand 스토어에서 가져옴
	const { currentPage, setTotalPages } = useHoverStore();

	const searchTxtRef = useRef(null);

	const { data, isLoading, error, refetch } = useQuery({
		// 검색 쿼리와 현재 페이지를 기반으로 한 고유 쿼리 키
		queryKey: ['searchMovies', searchQuery, currentPage],
		// TMDB API를 호출하여 영화 검색을 수행하는 함수
		queryFn: () => searchMovies(searchQuery, currentPage),
		// 자동 실행 비활성화 (수동으로 refetch 호출 필요)
		enabled: false,
		// 검색 성공 시 전체 페이지 수를 저장
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
					ref={searchTxtRef}
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
