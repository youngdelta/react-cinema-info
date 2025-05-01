import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPersonDetails, getPersonCredits } from '../api/tmdb';
import KnownForWorks from '../components/KnownForWorks';
import '../App.css';

function PersonDetail() {
	const { id } = useParams();

	const { data: person, isLoading: isLoadingPerson } = useQuery({
		queryKey: ['personDetails', id],
		queryFn: () => getPersonDetails(id),
	});

	const { data: credits, isLoading: isLoadingCredits } = useQuery({
		queryKey: ['personCredits', id],
		queryFn: () => getPersonCredits(id),
	});

	if (isLoadingPerson || isLoadingCredits) {
		return (
			<div className="person-detail">
				<div className="loading-message">로딩 중...</div>
			</div>
		);
	}

	if (!person) {
		return (
			<div className="person-detail">
				<div className="error-message">인물 정보를 찾을 수 없습니다.</div>
			</div>
		);
	}

	const actingCredits = credits?.cast || [];
	const directingCredits =
		credits?.crew?.filter((credit) => credit.job === 'Director') || [];

	return (
		<div className="person-detail">
			<div className="person-header">
				<div className="person-profile">
					<img
						src={
							person.profile_path
								? `https://image.tmdb.org/t/p/w500${person.profile_path}`
								: '/default-profile.png'
						}
						alt={person.name}
						className="person-photo-large"
					/>
				</div>
				<div className="person-info-large">
					<h1>{person.name}</h1>
					{person.birthday && (
						<p className="person-birthday">
							생년월일: {person.birthday}
							{person.deathday && ` - ${person.deathday}`}
						</p>
					)}
					{person.place_of_birth && (
						<p className="person-birthplace">출생지: {person.place_of_birth}</p>
					)}
					{person.biography && (
						<div className="person-biography">
							<h2>약력</h2>
							<p>{person.biography}</p>
						</div>
					)}
				</div>
			</div>

			<div className="person-content">
				{actingCredits.length > 0 && (
					<div className="credits-section">
						<h2>출연 작품</h2>
						<KnownForWorks works={actingCredits} />
					</div>
				)}

				{directingCredits.length > 0 && (
					<div className="credits-section">
						<h2>감독 작품</h2>
						<KnownForWorks works={directingCredits} />
					</div>
				)}
			</div>
		</div>
	);
}

export default PersonDetail;
