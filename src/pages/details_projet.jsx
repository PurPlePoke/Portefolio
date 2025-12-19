import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './details_projet.css';
import { projects as localProjects } from '../data/projects';
import { supabase } from '../supabaseClient';

const DetailsProjet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(localProjects.find((p) => p.id === Number(id)) || null);
    const [error, setError] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const loadScreenshots = async (folder) => {
        try {
            // Créer une liste de screenshots basée sur les patterns connus
            const screenshotsMap = {
                'screen_ACF2L': [
                    '/screen_ACF2L/Blanc/25_146_01.png',
                    '/screen_ACF2L/Blanc/25_146_02.png',
                    '/screen_ACF2L/Blanc/25_146_03.png',
                    '/screen_ACF2L/Blanc/25_146_04.png',
                    '/screen_ACF2L/Blanc/25_146_05.png',
                    '/screen_ACF2L/Noir/25_02_06.png',
                    '/screen_ACF2L/Noir/25_02_07.png',
                    '/screen_ACF2L/Noir/25_02_08.png',
                    '/screen_ACF2L/Noir/25_02_09.png',
                    '/screen_ACF2L/Noir/25_02_10.png',
                ],
                'Screen_BioData': [
                    '/Screen_BioData/25_148_01.png',
                    '/Screen_BioData/25_148_02.png',
                    '/Screen_BioData/25_148_03.png',
                    '/Screen_BioData/25_148_04.png',
                    '/Screen_BioData/25_148_05.png',
                ],
                'Screen_Etape_Projet': [
                    '/Screen_FindGrade/25_150_e1.png',
                    '/Screen_FindGrade/25_150_e2.png',
                    '/Screen_FindGrade/25_150_e3.png',
                ],
                'Screen_FindGrade': [
                    '/Screen_FindGrade/25_150_01.png',
                    '/Screen_FindGrade/25_150_02.png',
                    '/Screen_FindGrade/25_150_03.png',
                    '/Screen_FindGrade/25_150_04.png',
                    '/Screen_FindGrade/25_150_05.png',
                    '/Screen_FindGrade/25_150_06.png',
                    '/Screen_FindGrade/25_150_07.png',
                ],
                'Screen_NF': [
                    '/Screen_NF/25_145_01.png',
                    '/Screen_NF/25_145_02.png',
                    '/Screen_NF/25_145_03.png',
                    '/Screen_NF/25_145_04.png',
                    '/Screen_NF/25_145_05.png',
                    '/Screen_NF/25_145_06.png',
                ],
                'Screen_PRAMK': [
                    '/Screen_PRAMK/25_147_01.png',
                    '/Screen_PRAMK/25_147_02.png',
                    '/Screen_PRAMK/25_147_03.png',
                    '/Screen_PRAMK/25_147_04.png',
                    '/Screen_PRAMK/Accueil.png',
                ],
                'Screen_WebDoc': [
                    '/Screen_WebDoc/25_149_01.png',
                    '/Screen_WebDoc/25_149_02.png',
                    '/Screen_WebDoc/25_149_03.png',
                    '/Screen_WebDoc/25_149_04.png',
                    '/Screen_WebDoc/25_149_05.png',
                ],
            };
            setScreenshots(screenshotsMap[folder] || []);
            setCurrentImageIndex(0);
        } catch (err) {
            console.error('Erreur lors du chargement des screenshots:', err);
        }
    };

    useEffect(() => {
        const load = async () => {
            if (!supabase) return; // fallback to local data if no env
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', Number(id))
                .single();
            if (error) {
                setError('Impossible de charger ce projet depuis la base. Données locales affichées.');
                return;
            }
            setProject(data);
        };
        load();

        // Charger les screenshots depuis le dossier public
        if (project && project.screenshotFolder) {
            loadScreenshots(project.screenshotFolder);
        }
    }, [id, project?.screenshotFolder]);

    const nextImage = () => {
        if (screenshots.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
        }
    };

    const prevImage = () => {
        if (screenshots.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
        }
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    if (!project) {
        return (
            <div className="details-projet">
                <h2>Projet non trouvé</h2>
                <button onClick={() => navigate(-1)}>Retour</button>
            </div>
        );
    }

    return (
        <div className="details-projet">
            <div className="details-actions">
                <Link className="btn-retour" to="/">
                    ← Retour
                </Link>
            </div>

            <div className="projet-container">
                {screenshots.length > 0 ? (
                    <div className="projet-gallery">
                        <div className="gallery-main">
                            <img 
                                src={screenshots[currentImageIndex]} 
                                alt={`${project.title} - Screenshot ${currentImageIndex + 1}`} 
                                className="projet-image" 
                            />
                            {screenshots.length > 1 && (
                                <>
                                    <button className="gallery-nav gallery-nav--prev" onClick={prevImage}>
                                        ←
                                    </button>
                                    <button className="gallery-nav gallery-nav--next" onClick={nextImage}>
                                        →
                                    </button>
                                    <div className="gallery-counter">
                                        {currentImageIndex + 1} / {screenshots.length}
                                    </div>
                                </>
                            )}
                        </div>
                        {screenshots.length > 1 && (
                            <div className="gallery-thumbnails">
                                {screenshots.map((screenshot, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => goToImage(index)}
                                    >
                                        <img src={screenshot} alt={`Thumbnail ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <img src={project.image} alt={project.title} className="projet-image" />
                )}

                <div className="projet-info">
                    <h1>{project.title}</h1>
                    <p className="projet-date">{project.year}</p>

                    <div className="projet-description">
                        <h2>Description</h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{project.details || project.description}</p>
                    </div>

                    <div className="projet-technologies">
                        <h2>Technologies utilisées</h2>
                        <ul>
                            {project.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="projet-links">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-lien">
                                Code source
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-lien">
                                Démo en ligne
                            </a>
                        )}
                    </div>
                    {error && <p className="projet-date" style={{ color: 'var(--accent)' }}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default DetailsProjet;