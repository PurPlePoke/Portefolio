import React, { useMemo } from "react";
import "./Skills.css";
import { FaGlobe, FaPalette, FaDatabase } from "react-icons/fa6";
import { projects } from "../../data/projects";

export default function Skills() {
  const skills = useMemo(() => {
    // Technologies détectées depuis les projets
    const detectedTechs = new Set(
      projects.flatMap((p) => p.technologies || []).filter(Boolean)
    );

    // Technologies à ajouter explicitement (toujours affichées)
    const additionalTechs = {
      frontend: ["Angular"],
      backend: ["PHP", "Python", "Java"],
      design: ["Adobe Photoshop", "Illustrator", "InDesign", "Premiere Pro", "Figma"],
      threeD: ["Blender", "Fusion 360"],
      engines: ["Unity", "Unreal Engine"],
      data: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"],
      core: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Bootstrap", "Node.js", "Java"],
    };

    const merge = (...lists) => {
      const s = new Set();
      lists.flat().forEach((t) => s.add(t));
      return Array.from(s);
    };

    const pickDetected = (names) => names.filter((n) => detectedTechs.has(n));

    const categories = [
      {
        title: "Frontend",
        icon: FaGlobe,
        color: "var(--accent)",
        items: merge(pickDetected(additionalTechs.core), additionalTechs.frontend),
      },
      {
        title: "Back-end & Données",
        icon: FaDatabase,
        color: "var(--accent)",
        items: merge(pickDetected(["Node.js", ...additionalTechs.data]), additionalTechs.backend),
      },
      {
        title: "Design & Produit",
        icon: FaPalette,
        color: "var(--accent)",
        items: merge(pickDetected(["Figma"]), additionalTechs.design),
      },
      {
        title: "3D & CAO",
        icon: FaPalette,
        color: "var(--accent)",
        items: additionalTechs.threeD,
      },
      {
        title: "Game Engines",
        icon: FaGlobe,
        color: "var(--accent)",
        items: additionalTechs.engines,
      },
    ];

    return categories;
  }, []);

  return (
    <section className="skills" id="competences">
        <div className="skills__container">
            <div className="section__header">
                <div className="section__sidebar"></div>
                <span className="section-tag">EXPERTISE</span>
                <h2 className="section-title">Stack Technique & Compétences</h2>
                <p className="section-desc">
                  Un arsenal complet de technologies pour donner vie à vos projets les plus ambitieux.
                </p>
            </div>
            <div className="skills__grid">
              {skills.map((category, i) => {
                const IconComponent = category.icon;
                return (
                  <div className="skill-card" key={i}>
                    <div className="skill-header">
                      <span className="skill-icon" style={{ backgroundColor: category.color }}>
                        <IconComponent />
                      </span>
                      <h3>{category.title}</h3>
                    </div>

                    <div className="skill-items">
                      {category.items.map((item, k) => (
                        <span key={k} className="skill-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
    </section>
  );
}
