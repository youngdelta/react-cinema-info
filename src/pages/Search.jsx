import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchMulti } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useStore from '../store/useStore';

function Search() {
	// 통합 스토어에서 필요한 상태와 함수들을 가져옴
	const { searchQuery, setSearchQuery, currentPage, setTotalPages } =
		useStore();

	const searchTxtRef = useRef(null);

	const { data, isLoading, error, refetch } = useQuery({
		// 검색 쿼리와 현재 페이지를 기반으로 한 고유 쿼리 키
		queryKey: ['searchMulti', searchQuery, currentPage],
		// TMDB API를 호출하여 영화 검색을 수행하는 함수
		queryFn: () => searchMulti(searchQuery, currentPage),
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

	if (isLoading) return <div className="loading-message">로딩 중...</div>;
	if (error)
		return (
			<div className="error-message">에러가 발생했습니다: {error.message}</div>
		);

	return (
		<div className="search">
			<h1>통합 검색</h1>
			<form
				onSubmit={handleSearch}
				className="search-form"
			>
				<input
					type="text"
					value={searchQuery}
					ref={searchTxtRef}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="영화나 TV 프로그램 제목을 입력하세요"
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
					<div className="search-results-grid">
						{data.results.map((item) => {
							if (item.media_type === 'person') return null;

							return (
								<Link
									to={`/${item.media_type}/${item.id}`}
									key={item.id}
									className="search-card"
								>
									<div className="search-card-image">
										<img
											src={
												item.poster_path
													? `https://image.tmdb.org/t/p/w500${item.poster_path}`
													: '/default-poster.png'
											}
											alt={item.title || item.name}
										/>
										<div className="media-type-badge">
											{item.media_type === 'tv' ? 'TV' : '영화'}
										</div>
									</div>
									<div className="search-card-info">
										<h3>{item.title || item.name}</h3>
										<p className="release-date">
											{item.release_date?.split('-')[0] ||
												item.first_air_date?.split('-')[0]}
										</p>
										<p className="overview">
											{item.overview
												? item.overview.length > 100
													? item.overview.slice(0, 100) + '...'
													: item.overview
												: '줄거리 없음'}
										</p>
									</div>
								</Link>
							);
						})}
					</div>
					<Pagination totalPages={data.total_pages} />
				</>
			)}
		</div>
	);
}

export default Search;
