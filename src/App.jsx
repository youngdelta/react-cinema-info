import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import ThemeSwitch from './components/ThemeSwitch';
import './App.css';

const queryClient = new QueryClient();

function App() {
	// const isHovered = useHoverStore((state) => state.isHovered);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="app">
					{/* {isHovered && <div className="blur-overlay" />} */}
					<ThemeSwitch />
					<nav className="nav">
						<Link
							to="/"
							className="nav-link"
						>
							홈
						</Link>
						<Link
							to="/popular"
							className="nav-link"
						>
							인기 영화
						</Link>
						<Link
							to="/top-rated"
							className="nav-link"
						>
							최고 평점
						</Link>
						<Link
							to="/upcoming"
							className="nav-link"
						>
							개봉 예정
						</Link>
						<Link
							to="/search"
							className="nav-link"
						>
							검색
						</Link>
					</nav>
					<main className="main-content">
						<Routes>
							<Route
								path="/"
								element={<Home />}
							/>
							<Route
								path="/popular"
								element={<Popular />}
							/>
							<Route
								path="/top-rated"
								element={<TopRated />}
							/>
							<Route
								path="/upcoming"
								element={<Upcoming />}
							/>
							<Route
								path="/movie/:id"
								element={<MovieDetail />}
							/>
							<Route
								path="/search"
								element={<Search />}
							/>
						</Routes>
					</main>
				</div>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
