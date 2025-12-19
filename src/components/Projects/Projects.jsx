import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import { projects as localProjects } from '../../data/projects';
import { supabase } from '../../supabaseClient';

const Projects = () => {
    const [projects, setProjects] = useState(localProjects);
    const [filteredProjects, setFilteredProjects] = useState(localProjects);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('Tous');
    const [availableTechnologies, setAvailableTechnologies] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!supabase) return; // fallback to local data if no env
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('year', { ascending: false });
            if (error) {
                setError('Impossible de charger les projets distants. Affichage des données locales.');
                setProjects(localProjects);
            } else if (data) {
                setProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);
    // Extraire les technologies uniques et filtrer au premier rendu
    useEffect(() => {
        const techs = new Set();
        projects.forEach((project) => {
            project.technologies.forEach((tech) => {
                techs.add(tech);
            });
        });
        const sortedTechs = Array.from(techs).sort();
        setAvailableTechnologies(sortedTechs);
        setFilteredProjects(projects);
    }, [projects]);

    // Filtrer les projets quand le filtre change
    useEffect(() => {
        if (selectedFilter === 'Tous') {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter((project) =>
                project.technologies.includes(selectedFilter)
            );
            setFilteredProjects(filtered);
        }
    }, [selectedFilter, projects]);

    const handleFilterClick = (technology) => {
        setSelectedFilter(technology);
    };

    return (
        <section id="projects" className="projects">
            <div className="projects__container">
                <div className="section__header">
                    <span className="section-tag">PORTFOLIO</span>
                    <h2 className="section-title">Projets Web Interactifs</h2>
                    <p className="section-desc">Découvrez mes créations, de la conception à la réalisation. Chaque projet est une opportunité d'innover.</p>
                </div>
                {loading && <p className="section-desc">Chargement des projets...</p>}
                {error && <p className="section-desc" style={{ color: 'var(--accent)' }}>{error}</p>}
                <div className="projects__filters">
                    <button
                        className={selectedFilter === 'Tous' ? 'active' : ''}
                        onClick={() => handleFilterClick('Tous')}
                    >
                        Tous
                    </button>
                    {availableTechnologies.map((tech) => (
                        <button
                            key={tech}
                            className={selectedFilter === tech ? 'active' : ''}
                            onClick={() => handleFilterClick(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
                <div className="projects__grid">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            to={`/projets/${project.id}`}
                            className="projet-card projet-card--default"
                            aria-label={`Voir le détail de ${project.title}`}
                        >
                            <div className="projet-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="projet-content">
                                <div className="projet-header">
                                    <h3>{project.title}</h3>
                                    <span className="projet-arrow">→</span>
                                </div>
                                <p>{project.description}</p>
                                <div className="projet-tags">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;