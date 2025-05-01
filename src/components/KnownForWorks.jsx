import { Link } from 'react-router-dom';
import '../App.css';

function KnownForWorks({ works }) {
	// 영화 작품만 필터링
	// media_type이 'movie'이거나 media_type이 없는 경우(기본값이 movie인 경우) 포함
	const movieWorks = works.filter(
		(work) => work.media_type === 'movie' || !work.media_type
	);
	const tvWorks = works.filter((work) => work.media_type === 'tv');

	const renderWorks = (works, title) => {
		if (works.length === 0) return null;

		return (
			<div className="media-section">
				<h4>{title}</h4>
				<div className="works-grid">
					{works.slice(0, 15).map((work) => (
						<Link
							to={`/${work.media_type === 'tv' ? 'tv' : 'movie'}/${work.id}`}
							key={work.id}
							className="work-card"
						>
							<img
								src={
									work.poster_path
										? `https://image.tmdb.org/t/p/w200${work.poster_path}`
										: '/default-poster.png'
								}
								alt={work.title || work.name}
								className="work-poster"
							/>
							<div className="work-title">{work.title || work.name}</div>
						</Link>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="known-for-works">
			{renderWorks(movieWorks, '영화')}
			{renderWorks(tvWorks, 'TV 프로그램')}
		</div>
	);
}

export default KnownForWorks;
