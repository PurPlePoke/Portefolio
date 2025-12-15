# Portfolio React/Vite

Portfolio personnel (React 19 + Vite) avec pages projets détaillées, mode sombre, et données alimentées par Supabase (fallback local).

## Démarrage rapide

```bash
npm install
npm run dev
```

## Configuration Supabase

1) Crée un projet Supabase et copie **Project URL** et **anon public key**.
2) Active RLS sur la table `projects` puis ajoute la policy de lecture :

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
```

3) Table recommandée `projects` :
- id (int8, PK, auto)
- title (text)
- description (text)
- details (text)
- technologies (text[])
- image (text)
- github (text)
- demo (text)
- year (text)
- created_at (timestamptz default now())

4) Variables d’environnement (crée `.env` à partir de `.env.example`) :

```env
VITE_SUPABASE_URL=... 
VITE_SUPABASE_ANON_KEY=...
```

Sans `.env`, le site utilise les données locales de secours.

## Scripts
- `npm run dev` : démarrage local
- `npm run build` : build de production
- `npm run preview` : prévisualisation du build
- `npm run lint` : lint

## Sécurité minimale
- Ne commite jamais les clés (`.env` est ignoré par Git).
- N’utilise que la clé **anon** côté front (pas de `service_role`).
- RLS activé + policy de lecture seule sur `projects`; aucune écriture publique.
- Formulaire contact : prévoir anti-spam (honeypot/CAPTCHA) côté backend si tu ajoutes un envoi d’email.

## Fonctionnalités
- Mode sombre/clair avec persistance locale.
- Grille de projets cliquables vers `/projets/:id`.
- Page détail projet avec fallback en local si Supabase indisponible.
- Sections Hero, Compétences, Contact, Footer stylées et responsives.

## Structure
- `src/components` : Header, Hero, Projects, Skills, Contact, Footer
- `src/pages/details_projet.jsx` : fiche projet
- `src/data/projects.js` : données locales de secours
- `src/supabaseClient.js` : client Supabase (utilise les variables d’environnement)
