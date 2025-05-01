import { useState, useEffect } from 'react';
import '../App.css';

function ThemeSwitch() {
	const [isDark, setIsDark] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		return (
			savedTheme === 'dark' ||
			(!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	return (
		<div className="theme-switch-wrapper">
			<label
				className="theme-switch"
				htmlFor="checkbox"
			>
				<input
					type="checkbox"
					id="checkbox"
					checked={isDark}
					onChange={(e) => setIsDark(e.target.checked)}
				/>
				<div className="slider round">
					<span className="slider-icon">{isDark ? '🌙' : '☀️'}</span>
				</div>
			</label>
		</div>
	);
}

export default ThemeSwitch;
