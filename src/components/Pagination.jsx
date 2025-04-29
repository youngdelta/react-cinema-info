import { useCallback } from 'react';
import useHoverStore from '../store/useHoverStore';

function Pagination({ totalPages }) {
	const { currentPage, setCurrentPage } = useHoverStore();

	const handlePageChange = useCallback((newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	}, []);

	return (
		<div className="pagination">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				이전
			</button>
			<span>
				{currentPage} / {totalPages}
			</span>
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				다음
			</button>
		</div>
	);
}

export default Pagination;
