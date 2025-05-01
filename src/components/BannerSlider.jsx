import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function BannerSlider({ movies }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentIndex((prevIndex) =>
					prevIndex === movies.length - 1 ? 0 : prevIndex + 1
				);
				setIsTransitioning(false);
			}, 500);
		}, 5000);

		return () => clearInterval(timer);
	}, [movies.length]);

	if (!movies.length) return null;

	return (
		<div className="banner-slider">
			<div
				className={`banner-slide ${isTransitioning ? 'fade-out' : 'fade-in'}`}
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[currentIndex]?.backdrop_path})`,
				}}
			>
				<div className="banner-content">
					<h1>{movies[currentIndex]?.title || movies[currentIndex]?.name}</h1>
					<p>{movies[currentIndex]?.overview}</p>
					<Link
						to={`/movie/${movies[currentIndex]?.id}`}
						className="banner-button"
					>
						자세히 보기
					</Link>
				</div>
			</div>
			<div className="banner-indicators">
				{movies.map((_, index) => (
					<button
						key={index}
						className={`banner-indicator ${
							index === currentIndex ? 'active' : ''
						}`}
						onClick={() => {
							setIsTransitioning(true);
							setTimeout(() => {
								setCurrentIndex(index);
								setIsTransitioning(false);
							}, 500);
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default BannerSlider;
