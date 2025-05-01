import { create } from 'zustand';

const useStore = create((set) => ({
	// 검색 관련 상태
	searchQuery: '',
	setSearchQuery: (query) => set({ searchQuery: query }),

	// 페이지네이션 관련 상태
	currentPage: 1,
	totalPages: 0,
	setCurrentPage: (page) => set({ currentPage: page }),
	setTotalPages: (total) => set({ totalPages: total }),

	// 호버 관련 상태
	isHovered: false,
	setIsHovered: (hovered) => set({ isHovered: hovered }),
}));

export default useStore;
