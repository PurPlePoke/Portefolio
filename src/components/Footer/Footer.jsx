import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">

                
                <div className="footer-text">
                    <p>&copy; {currentYear} Killian Lawson - Etudiant BUT MMI. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;