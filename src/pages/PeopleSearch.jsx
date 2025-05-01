import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchPeople } from '../api/tmdb';
import useStore from '../store/useStore';
import Pagination from '../components/Pagination';
import KnownForWorks from '../components/KnownForWorks';
import '../App.css';

function PeopleSearch() {
	const {
		searchPeople: findPeople,
		setSearchPeople,
		currentPage,
		setTotalPages,
	} = useStore();

	const searchInputRef = useRef(null);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['searchPeople', findPeople, currentPage],
		queryFn: () => searchPeople(findPeople, currentPage),
		enabled: false,
		onSuccess: (data) => {
			setTotalPages(data.total_pages);
		},
	});

	const handleSearch = (e) => {
		e.preventDefault();
		if (findPeople.trim()) {
			refetch();
		}
	};

	if (isLoading)
		return (
			<div className="people-search">
				<div className="loading-message">로딩 중...</div>
			</div>
		);

	if (error)
		return (
			<div className="people-search">
				<div className="error-message">
					에러가 발생했습니다: {error.message}
				</div>
			</div>
		);

	return (
		<div className="people-search">
			<h1>배우/감독 검색</h1>
			<form
				onSubmit={handleSearch}
				className="search-form"
			>
				<input
					type="text"
					value={findPeople}
					ref={searchInputRef}
					onChange={(e) => setSearchPeople(e.target.value)}
					placeholder="배우나 감독의 이름을 입력하세요"
					className="search-input"
				/>
				<button
					type="submit"
					className="search-button"
				>
					검색
				</button>
			</form>
			{data && (
				<>
					<div className="people-grid">
						{data.results.map((person) => (
							<Link
								to={`/person/${person.id}`}
								key={person.id}
								className="person-card"
							>
								<img
									src={
										person.profile_path
											? `https://image.tmdb.org/t/p/w300${person.profile_path}`
											: '/default-profile.png'
									}
									alt={person.name}
									className="person-photo"
								/>
								<div className="person-info">
									<h3>{person.name}</h3>
									<p>{person.known_for_department}</p>
									{person.known_for && (
										<KnownForWorks works={person.known_for} />
									)}
								</div>
							</Link>
						))}
					</div>
					<Pagination totalPages={data.total_pages} />
				</>
			)}
		</div>
	);
}

export default PeopleSearch;
