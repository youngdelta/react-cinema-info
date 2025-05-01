import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
	getMovieDetails,
	getMovieCredits,
	getMovieVideos,
	getMovieImages,
} from '../api/tmdb';
import { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';

function MovieDetail() {
	const { id } = useParams();
	const [showCarousel, setShowCarousel] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const { data: movieDetails, isLoading: isDetailsLoading } = useQuery({
		queryKey: ['movieDetails', id],
		queryFn: () => getMovieDetails(id),
	});

	const { data: credits, isLoading: isCreditsLoading } = useQuery({
		queryKey: ['movieCredits', id],
		queryFn: () => getMovieCredits(id),
	});

	const { data: videos, isLoading: isVideosLoading } = useQuery({
		queryKey: ['movieVideos', id],
		queryFn: () => getMovieVideos(id),
	});

	const { data: images, isLoading: isImagesLoading } = useQuery({
		queryKey: ['movieImages', id],
		queryFn: () => getMovieImages(id),
	});

	if (
		isDetailsLoading ||
		isCreditsLoading ||
		isVideosLoading ||
		isImagesLoading
	) {
		return <div>로딩 중...</div>;
	}

	const movie = movieDetails?.data || {};
	const director = credits?.data.crew?.find(
		(person) => person.job === 'Director'
	);
	const mainCast = credits?.data.cast?.slice(0, 5);
	const trailer = videos?.results?.find((video) => video.type === 'Trailer');
	const teaser = videos?.results?.find((video) => video.type === 'Teaser');
	const stills = images?.backdrops?.slice(0, 6) || [];
	console.log(trailer);

	const handleStillClick = (index) => {
		setSelectedImageIndex(index);
		setShowCarousel(true);
	};

	return (
		<div className="movie-detail">
			<div
				className="movie-backdrop"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
				}}
			>
				<div className="movie-backdrop-overlay">
					<div className="movie-header">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="movie-poster-large"
						/>
						<div className="movie-info-large">
							<h1>{movie.title}</h1>
							{movie.tagline && (
								<p className="movie-tagline">"{movie.tagline}"</p>
							)}
							<div className="movie-meta">
								<span>{movie.release_date?.split('-')[0] || ''}</span>
								<span>{movie.runtime}분</span>
								<span>평점: {movie.vote_average?.toFixed(1) || 0}</span>
							</div>
							<div className="movie-genres">
								{movie.genres?.map((genre) => (
									<span
										key={genre.id}
										className="genre-tag"
									>
										{genre.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="movie-content">
				<div className="movie-overview">
					<h2>줄거리</h2>
					<p>{movie.overview}</p>
				</div>

				{trailer && (
					<div className="movie-trailer">
						<h2>예고편</h2>
						<div className="trailer-container">
							<iframe
								width="100%"
								height="500"
								src={`https://www.youtube.com/embed/${trailer.key}`}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}

				{teaser && (
					<div className="movie-teaser">
						<h2>티저 영상</h2>
						<div className="trailer-container">
							<iframe
								width="100%"
								height="500"
								src={`https://www.youtube.com/embed/${teaser.key}`}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}

				{stills.length > 0 && (
					<div className="movie-stills">
						<h2>스틸컷</h2>
						<div className="stills-grid">
							{stills.map((still, index) => (
								<div
									key={index}
									className="still-item"
									onClick={() => handleStillClick(index)}
								>
									<img
										src={`https://image.tmdb.org/t/p/w500${still.file_path}`}
										alt={`${movie.title} 스틸컷 ${index + 1}`}
										className="still-image"
									/>
								</div>
							))}
						</div>
					</div>
				)}

				{showCarousel && (
					<ImageCarousel
						images={stills}
						initialIndex={selectedImageIndex}
						onClose={() => setShowCarousel(false)}
					/>
				)}

				<div className="movie-cast">
					<h2>출연진</h2>
					<div className="cast-grid">
						{mainCast?.map((actor) => (
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

				{director && (
					<div className="movie-director">
						<h2>감독</h2>
						<Link
							to={`/person/${director.id}`}
							className="director-info"
						>
							<img
								src={
									director.profile_path
										? `https://image.tmdb.org/t/p/w200${director.profile_path}`
										: '/default-profile.png'
								}
								alt={director.name}
								className="director-photo"
							/>
							<div>
								<h3>{director.name}</h3>
								<p>{director.job}</p>
							</div>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default MovieDetail;
