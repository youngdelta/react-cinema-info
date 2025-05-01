import { useState, useEffect, useRef } from 'react';
import '../App.css';

function ImageCarousel({ images, onClose }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const [swipeDistance, setSwipeDistance] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const trackRef = useRef(null);

	const minSwipeDistance = 50;

	const handlePrev = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const onMouseDown = (e) => {
		setIsDragging(true);
		setTouchEnd(null);
		setTouchStart(e.clientX);
		setIsAutoPlaying(false);
	};

	const onMouseMove = (e) => {
		if (!isDragging) return;
		setTouchEnd(e.clientX);
		if (touchStart && touchEnd) {
			const distance = touchStart - e.clientX;
			setSwipeDistance(distance);
		}
	};

	const onMouseUp = () => {
		if (!isDragging) return;

		if (touchStart && touchEnd) {
			const distance = touchStart - touchEnd;
			const isLeftSwipe = distance > minSwipeDistance;
			const isRightSwipe = distance < -minSwipeDistance;

			if (isLeftSwipe) {
				handleNext();
			}
			if (isRightSwipe) {
				handlePrev();
			}
		}

		setIsDragging(false);
		setTouchStart(null);
		setTouchEnd(null);
		setSwipeDistance(0);
		setIsAutoPlaying(true);
	};

	const onMouseLeave = () => {
		if (isDragging) {
			setIsDragging(false);
			setTouchStart(null);
			setTouchEnd(null);
			setSwipeDistance(0);
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsTransitioning(false);
		}, 500);
		return () => clearTimeout(timer);
	}, [currentIndex]);

	useEffect(() => {
		let intervalId;
		if (isAutoPlaying) {
			intervalId = setInterval(() => {
				handleNext();
			}, 3000);
		}
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [isAutoPlaying, currentIndex]);

	return (
		<div className="carousel-overlay">
			<div className="carousel-container">
				<button
					className="carousel-close"
					onClick={onClose}
				>
					×
				</button>
				<button
					className="carousel-prev"
					onClick={handlePrev}
				>
					‹
				</button>
				<div className="carousel-image-container">
					<div
						className="carousel-track"
						ref={trackRef}
						onMouseDown={onMouseDown}
						onMouseMove={onMouseMove}
						onMouseUp={onMouseUp}
						onMouseLeave={onMouseLeave}
						style={{
							transform: `translateX(${swipeDistance}px)`,
							transition:
								swipeDistance === 0 ? 'transform 0.5s ease-in-out' : 'none',
							cursor: isDragging ? 'grabbing' : 'grab',
						}}
					>
						<div className="carousel-slide">
							<img
								src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`}
								alt={`스틸컷 ${currentIndex + 1}`}
								className="carousel-image"
							/>
						</div>
					</div>
				</div>
				<button
					className="carousel-next"
					onClick={handleNext}
				>
					›
				</button>
				<div className="carousel-indicators">
					{images.map((_, index) => (
						<button
							key={index}
							className={`carousel-indicator ${
								index === currentIndex ? 'active' : ''
							}`}
							onClick={() => {
								if (isTransitioning) return;
								setIsTransitioning(true);
								setCurrentIndex(index);
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ImageCarousel;
