Portfolio — Abdelkarim Naji
============================

Ceci est une version améliorée du portfolio : styles modernisés, meilleure accessibilité, modal accessible et micro-interactions.

Prévisualiser localement
------------------------
Ouvre un terminal dans le dossier du projet (`mon cv digital`) et lance l'un des serveurs suivants :

Python 3 :

```bash
python -m http.server 8000
```

Node.js (si installé) :

```bash
npx http-server -p 8000
```

Puis ouvre http://localhost:8000 dans ton navigateur.

Déploiement simple (GitHub Pages)
--------------------------------
1. Initialise un dépôt git si nécessaire :

```bash
git init
git add .
git commit -m "Initial commit: portfolio improvements"
```

2. Pousse sur GitHub et active GitHub Pages depuis les paramètres du dépôt (branche `main` ou `gh-pages`). Alternativement utilise `gh-pages` :

```bash
# installer une fois
npm install --save-dev gh-pages
# puis depuis package.json ajouter un script "deploy": "gh-pages -d ."
npm run deploy
```

Notes et recommandations
-----------------------
- Les modifications principales sont dans `index.html`, `style.css`, et `script.js`.
- Tester l'accessibilité: navigue au clavier (Tab/Shift+Tab), vérifie le focus trap de la modal et le bouton de retour en haut.
- Si tu veux, je peux aussi préparer une branche `gh-pages` et pousser les fichiers pour toi (il faudra tes identifiants GitHub).

Souhaites-tu que je crée un commit et prépare une branche de déploiement ?