## Pour set-up un environnement local

# 1. Create a new React + TypeScript app
npx create-react-app my-app --template typescript
cd my-app

# 2. Install Tailwind and dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Les commandes permettent de configurer Tailwind CSS, un framework qui permet de styliser l'interface utilisateur directment dans le JSX. 


# 3. Fichiers de configuration
Les fichiers ci-dessous sont crees quand on installe React :
- `tailwind.config.cjs` : la configuration qui definit les limites ou Tailwind doit agir.
- `src/index.css` : le moteur qui importe les libraires massives de Tailwind pour les mises en page.
- `src/index.tsx` : le pilote qui demarre l'application React et affiche la mise en forme.


