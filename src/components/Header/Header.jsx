import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { FiX, FiMenu } from 'react-icons/fi';
import './Header.css';

const Header = () => {
    const getInitialTheme = () => {
        if (typeof window === 'undefined') return 'light';
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo" aria-label="Logo KL">
                    <h1 className="logo-text">
                        <span className="logo-k" aria-hidden="true">K</span>
                        <span className="logo-l" aria-hidden="true">L</span>
                    </h1>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li><a href="#hero">Accueil</a></li>
                        <li><a href="#projects">Projets</a></li>
                        <li><a href="#competences">Compétences</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>

                <button
                    className={`hamburger ${menuOpen ? 'is-open' : ''}`}
                    aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
                <button
                    className={`theme-toggle ${theme === 'dark' ? 'is-active' : ''}`}
                    aria-label="Basculer le thème"
                    aria-pressed={theme === 'dark'}
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>

            </div>
            {/* Mobile menu overlay */}
            <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'show' : ''}`} role="dialog" aria-modal="true">
                <ul className="mobile-menu__list" onClick={closeMenu}>
                    <li><a href="#hero">Accueil</a></li>
                    <li><a href="#projects">Projets</a></li>
                    <li><a href="#competences">Compétences</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;