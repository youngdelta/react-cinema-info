import { useQuery } from '@tanstack/react-query';
import {
	getTrendingMovies,
	getPopularMovies,
	getTopRatedMovies,
} from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import BannerSlider from '../components/BannerSlider';
import '../App.css';

function Home() {
	const { data: trendingMovies } = useQuery({
		queryKey: ['trending'],
		queryFn: () => getTrendingMovies(),
	});

	const { data: popularMovies } = useQuery({
		queryKey: ['popular'],
		queryFn: () => getPopularMovies(),
	});

	const { data: topRatedMovies } = useQuery({
		queryKey: ['topRated'],
		queryFn: () => getTopRatedMovies(),
	});

	return (
		<div className="home-container">
			<BannerSlider movies={trendingMovies?.results?.slice(0, 5) || []} />

			<section className="movie-section">
				<h2>믿고 보는 웰메이드 추천작</h2>
				<div className="movie-row">
					{trendingMovies?.results?.slice(0, 5).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
			</section>

			<section className="movie-section">
				<h2>실시간 인기 콘텐츠</h2>
				<div className="movie-row">
					{popularMovies?.results?.slice(0, 5).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
			</section>

			<section className="movie-section">
				<h2>오직 웨이브에서</h2>
				<div className="movie-row">
					{topRatedMovies?.results?.slice(0, 5).map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

export default Home;
