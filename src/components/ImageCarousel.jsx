import { useState } from 'react';
import '../App.css';

function ImageCarousel({ images, onClose }) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const handlePrevImage = () => {
		setSelectedImageIndex((prev) =>
			prev === 0 ? images.length - 1 : prev - 1
		);
	};

	const handleNextImage = () => {
		setSelectedImageIndex((prev) =>
			prev === images.length - 1 ? 0 : prev + 1
		);
	};

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
					onClick={handlePrevImage}
				>
					‹
				</button>
				<button
					className="carousel-next"
					onClick={handleNextImage}
				>
					›
				</button>
				<div className="carousel-image-container">
					<img
						src={`https://image.tmdb.org/t/p/original${images[selectedImageIndex].file_path}`}
						alt={`스틸컷 ${selectedImageIndex + 1}`}
						className="carousel-image"
					/>
				</div>
				<div className="carousel-indicators">
					{images.map((_, index) => (
						<button
							key={index}
							className={`carousel-indicator ${
								index === selectedImageIndex ? 'active' : ''
							}`}
							onClick={() => setSelectedImageIndex(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ImageCarousel;
