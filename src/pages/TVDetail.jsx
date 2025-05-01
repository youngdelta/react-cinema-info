import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
	getTVDetails,
	getTVCredits,
	getTVVideos,
	getTVImages,
} from '../api/tmdb';
import '../App.css';

function TVDetail() {
	const { id } = useParams();

	const { data: tv, isLoading: isLoadingDetails } = useQuery({
		queryKey: ['tvDetails', id],
		queryFn: () => getTVDetails(id),
	});

	const { data: credits, isLoading: isLoadingCredits } = useQuery({
		queryKey: ['tvCredits', id],
		queryFn: () => getTVCredits(id),
	});

	const { data: videos, isLoading: isLoadingVideos } = useQuery({
		queryKey: ['tvVideos', id],
		queryFn: () => getTVVideos(id),
	});

	const { data: images, isLoading: isLoadingImages } = useQuery({
		queryKey: ['tvImages', id],
		queryFn: () => getTVImages(id),
	});

	if (
		isLoadingDetails ||
		isLoadingCredits ||
		isLoadingVideos ||
		isLoadingImages
	) {
		return (
			<div className="tv-detail">
				<div className="loading-message">로딩 중...</div>
			</div>
		);
	}

	if (!tv) {
		return (
			<div className="tv-detail">
				<div className="error-message">
					TV 프로그램 정보를 찾을 수 없습니다.
				</div>
			</div>
		);
	}

	const trailer = videos?.results?.find(
		(video) => video.type === 'Trailer' && video.site === 'YouTube'
	);
	const teaser = videos?.results?.find(
		(video) => video.type === 'Teaser' && video.site === 'YouTube'
	);
	const stills = images?.backdrops?.slice(0, 6) || [];

	return (
		<div className="tv-detail">
			<div className="tv-backdrop">
				<div
					className="tv-backdrop-overlay"
					style={{
						backgroundImage: tv.backdrop_path
							? `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`
							: 'none',
					}}
				>
					<div className="tv-header">
						<img
							src={
								tv.poster_path
									? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
									: '/default-poster.png'
							}
							alt={tv.name}
							className="tv-poster-large"
						/>
						<div className="tv-info-large">
							<h1>{tv.name}</h1>
							{tv.tagline && <p className="tv-tagline">{tv.tagline}</p>}
							<div className="tv-meta">
								<span>{tv.first_air_date?.split('-')[0]}</span>
								<span>{tv.episode_run_time?.[0]} 분</span>
								<span>시즌 {tv.number_of_seasons}개</span>
								<span>에피소드 {tv.number_of_episodes}개</span>
							</div>
							<div className="tv-genres">
								{tv.genres?.map((genre) => (
									<span
										key={genre.id}
										className="genre-tag"
									>
										{genre.name}
									</span>
								))}
							</div>
							{tv.overview && (
								<div className="tv-overview">
									<h2>개요</h2>
									<p>{tv.overview}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="tv-content">
				{trailer && (
					<div className="tv-trailer">
						<h2>예고편</h2>
						<div className="trailer-container">
							<iframe
								src={`https://www.youtube.com/embed/${trailer.key}`}
								title="예고편"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}

				{teaser && (
					<div className="tv-teaser">
						<h2>티저</h2>
						<div className="trailer-container">
							<iframe
								src={`https://www.youtube.com/embed/${teaser.key}`}
								title="티저"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}

				{stills.length > 0 && (
					<div className="tv-stills">
						<h2>스틸컷</h2>
						<div className="stills-grid">
							{stills.map((still, index) => (
								<div
									key={index}
									className="still-item"
								>
									<img
										src={`https://image.tmdb.org/t/p/w500${still.file_path}`}
										alt={`스틸컷 ${index + 1}`}
										className="still-image"
									/>
								</div>
							))}
						</div>
					</div>
				)}

				{credits?.cast && credits.cast.length > 0 && (
					<div className="tv-cast">
						<h2>출연진</h2>
						<div className="cast-grid">
							{credits.cast.slice(0, 12).map((actor) => (
								<Link
									to={`/person/${actor.id}`}
									key={actor.id}
									className="cast-card"
								>
									<img
										src={
											actor.profile_path
												? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
												: '/default-profile.png'
										}
										alt={actor.name}
										className="cast-photo"
									/>
									<h3>{actor.name}</h3>
									<p>{actor.character}</p>
								</Link>
							))}
						</div>
					</div>
				)}

				{tv.seasons && tv.seasons.length > 0 && (
					<div className="tv-seasons">
						<h2>시즌 정보</h2>
						<div className="seasons-grid">
							{tv.seasons.map((season) => (
								<div
									key={season.id}
									className="season-card"
								>
									<img
										src={
											season.poster_path
												? `https://image.tmdb.org/t/p/w200${season.poster_path}`
												: '/default-poster.png'
										}
										alt={season.name}
										className="season-poster"
									/>
									<div className="season-info">
										<h3>{season.name}</h3>
										<p>에피소드 {season.episode_count}개</p>
										{season.air_date && <p>방영일: {season.air_date}</p>}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{tv.created_by && tv.created_by.length > 0 && (
					<div className="tv-creators">
						<h2>제작진</h2>
						<div className="creators-grid">
							{tv.created_by.map((creator) => (
								<Link
									to={`/person/${creator.id}`}
									key={creator.id}
									className="creator-card"
								>
									<img
										src={
											creator.profile_path
												? `https://image.tmdb.org/t/p/w200${creator.profile_path}`
												: '/default-profile.png'
										}
										alt={creator.name}
										className="creator-photo"
									/>
									<h3>{creator.name}</h3>
									<p>제작자</p>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default TVDetail;
