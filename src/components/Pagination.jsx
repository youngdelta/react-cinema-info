import useStore from '../store/useStore';

function Pagination({ totalPages }) {
	const { currentPage, setCurrentPage } = useStore();

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="pagination">
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
			>
				이전
			</button>
			<span>
				{currentPage} / {totalPages}
			</span>
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
			>
				다음
			</button>
		</div>
	);
}

export default Pagination;
