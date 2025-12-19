import React from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaRegFileLines } from 'react-icons/fa6';
import { RiCodeView } from "react-icons/ri";
import { GoArrowDown } from "react-icons/go";


const Hero = () => {
    return (
        <section className="hero" id="hero">
            {/* Background animé */}
            <div className="hero-background">
                <div className="bg-shape bg-shape-1"></div>
                <div className="bg-shape bg-shape-2"></div>
                <div className="bg-shape bg-shape-3"></div>
            </div>

            <div className="hero-container">
                {/* Partie Gauche */}
                <div className="hero-left">
                    <div className="hero-content">
                        <p className="hero-role"><RiCodeView />Développeur Web & Multimédia</p>
                        <h1 className="hero-name">Killian Lawson</h1>
                        <p className="hero-formation">Étudiant BUT MMI</p>
                        <p className="hero-description">
                            Je crée des expériences web immersives et innovantes. Spécialisé en développement frontend avec une passion pour le design interactif.
                        </p>
                        
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">
                                Découvrir mes projets
                            </a>
                            <a href="#contact" className="btn btn-secondary">
                                Me contacter
                            </a>
                        </div>

                        <div className="hero-socials">
                            <a href="https://github.com/PurPlePoke" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/killian-lawson" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:killianlawson77@gmail.com" className="social-link">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Partie Droite */}
                <div className="hero-right">
                    <div className="cv-card">
                        <div className="cv-header">
                            <FaRegFileLines className="cv-icon" />
                            <div className="cv-header-text">
                                <h3 className="cv-title">Mon CV</h3>
                                <p className="cv-subtitle">Scannez pour télécharger</p>
                            </div>
                        </div>
                        
                        <div className="qr-code">
                            <img src="/Portefolio/qr-cv.svg" alt="QR Code - CV" />
                        </div>

                        
                        <a href="https://drive.google.com/uc?export=download&id=1_OzkzzTxcbH5SgrVr5yZ2Ij59dfF4bpr" download className="btn btn-download">
                            <FaRegFileLines className="cv-icon-download" />
                            <span>Télécharger le CV</span>
                        </a> 

                        <p className="qr-instruction">
                            Scannez le QR code avec votre téléphone pour accéder à mon CV complet
                        </p>
                    </div>
                </div>
            </div>

            <div className='Scroll_down'>
                <p>Défilez vers le bas</p>
                <p><GoArrowDown /></p>
            </div>
        </section>
    );
};

export default Hero;