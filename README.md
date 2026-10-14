# Italian Input Lab

A simple static Italian activity directory built with HTML and Bulma. Each topic has its own placeholder page; no exercises have been implemented yet.

## Structure
- `index.html`: activity directory and cards.
- `activities/<topic>/index.html`: independent pages for each activity.
- `assets/styles.css`: shared custom styling.
- Bulma 1.0.4 is loaded from jsDelivr; an internet connection is required for framework styling.

## Preview
Run `python3 -m http.server 8000` from the repository root and open http://localhost:8000.

## GitHub Pages
In repository Settings → Pages, select Deploy from a branch, then main and / (root). Relative links support the /italian/ project path.

## Add or update an activity
Edit its own HTML file inside `activities/`. To add a topic, copy a placeholder directory, change its title and description, and add a matching card in `index.html`. Keep the two-level directory depth for existing shared asset links.
