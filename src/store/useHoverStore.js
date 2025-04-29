import { create } from 'zustand';

const useHoverStore = create((set) => ({
	isHovered: false,
	setIsHovered: (value) => set({ isHovered: value }),
	currentPage: 1,
	setCurrentPage: (page) => set({ currentPage: page }),
	totalPages: 1,
	setTotalPages: (pages) => set({ totalPages: pages }),
}));

export default useHoverStore;
