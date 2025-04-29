import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovieCredits, getMovieDetails } from '../api/tmdb';
// import useHoverStore from '../store/useHoverStore';

function MovieCard({ movie }) {
	const [isHovered, setIsHovered] = useState(false);
	const [layerPosition, setLayerPosition] = useState({ left: 0, top: 0 });
	const cardRef = useRef(null);

	const { data: credits } = useQuery({
		queryKey: ['movieCredits', movie.id],
		queryFn: () => getMovieCredits(movie.id),
		enabled: isHovered,
	});

	const { data: movieDetails } = useQuery({
		queryKey: ['movieDetails', movie.id],
		queryFn: () => getMovieDetails(movie.id),
		enabled: isHovered,
	});

	const director = credits?.data?.crew?.find(
		(person) => person.job === 'Director'
	);
	const mainCast = credits?.data?.cast?.slice(0, 3);

	const handleMouseMove = (e) => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const layerWidth = 800;
		const layerHeight = 600;
		const padding = 20;

		let left = e.clientX + padding;
		let top = e.clientY + padding;

		if (left + layerWidth > windowWidth) {
			left = e.clientX - layerWidth - padding;
		}

		if (top + layerHeight > windowHeight) {
			top = e.clientY - layerHeight - padding;
		}

		setLayerPosition({ left, top });
	};

	return (
		<div
			className="movie-card-container"
			ref={cardRef}
		>
			<div
				className="movie-card"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onMouseMove={handleMouseMove}
			>
				<Link
					to={`/movie/${movie.id}`}
					className="movie-link"
					style={{ color: 'black' }}
				>
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						className="movie-poster"
					/>
					<div className="movie-info">
						<h3>{movie.title}</h3>
						<p>평점: {movie.vote_average}</p>
						<p>개봉일: {movie.release_date}</p>
					</div>
				</Link>
			</div>
			{isHovered && (
				<div
					className="movie-details-layer"
					style={{
						left: `${layerPosition.left}px`,
						top: `${layerPosition.top}px`,
					}}
				>
					<div className="movie-details-backdrop">
						<img
							src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt={movie.title}
							className="movie-backdrop"
						/>
					</div>
					<div className="movie-details-content">
						<div className="movie-poster-small">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
							/>
						</div>
						<div className="movie-details-text">
							<h3>{movie.title}</h3>
							<p>평점: {movie.vote_average}</p>
							<p>개봉일: {movie.release_date}</p>
							{director && <p>감독: {director.name}</p>}
							{mainCast && mainCast.length > 0 && (
								<p>주연: {mainCast.map((actor) => actor.name).join(', ')}</p>
							)}
							<div className="movie-overview">
								<h4>줄거리</h4>
								<p>
									{movieDetails?.data?.overview || '줄거리 정보가 없습니다.'}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieCard;
