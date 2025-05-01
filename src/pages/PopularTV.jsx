import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getPopularTV } from '../api/tmdb';
import Pagination from '../components/Pagination';
import useStore from '../store/useStore';
import '../App.css';

function PopularTV() {
	const { currentPage, setTotalPages } = useStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ['popularTV', currentPage],
		queryFn: () => getPopularTV(currentPage),
		onSuccess: (data) => {
			setTotalPages(data.total_pages);
		},
	});

	if (isLoading) {
		return (
			<div className="tv-section">
				<div className="loading-message">로딩 중...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="tv-section">
				<div className="error-message">
					에러가 발생했습니다: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="tv-section">
			<h2>인기 TV 프로그램</h2>
			<div className="tv-grid">
				{data.results.map((tv) => (
					<Link
						to={`/tv/${tv.id}`}
						key={tv.id}
						className="tv-card"
					>
						<div className="tv-poster">
							<img
								src={
									tv.poster_path
										? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
										: '/default-poster.png'
								}
								alt={tv.name}
							/>
						</div>
						<div className="tv-info">
							<h3>{tv.name}</h3>
							<p className="tv-date">
								{tv.first_air_date?.split('-')[0] || '미정'}
							</p>
							<p className="tv-rating">
								평점: {tv.vote_average?.toFixed(1) || '평가 없음'}
							</p>
						</div>
					</Link>
				))}
			</div>
			<Pagination />
		</div>
	);
}

export default PopularTV;
