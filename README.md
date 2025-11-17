# Fleet Monitor – Technical Assignment

This project is a small full-stack app for monitoring fleets and vessels, built as a technical assignment.

It consists of:

- **Backend** – Node.js + Express  
  - Loads static JSON files (`fleets`, `vessels`, `vesselLocations`) into memory.
  - Exposes REST APIs:
    - `GET /api/fleets` – list fleets with basic info (name, vessels count).
    - `GET /api/fleets/:id/vessels` – vessels of a specific fleet (including location).
    - `GET /api/vessels/search` – search vessels inside a fleet by `name`, `flag`, and/or `mmsi` (filters combined with AND).

- **Frontend** – React (SPA, Vite)
  - Main page: sortable table of fleets (always sorted, as required).
  - Fleet page:
    - Table of vessels (with server-side filtering by name, flag, MMSI).
    - Map showing all vessels’ locations for the selected fleet.
    - Clicking a marker opens a popup with vessel information and location details.

Map is implemented with **React-Leaflet** using OpenStreetMap tiles.

---
### 🎥 Project Walkthrough Video
A short technical overview of the project.

<a href="https://youtu.be/abvJRkGbg3s" target="_blank">
  <img src="https://img.shields.io/badge/Watch%20Video%20📺-on%20YouTube-red?logo=youtube" alt="Watch on YouTube">
</a>

---

## Project Structure

```text
root/
  server/
    app.js
    dataLoader.js
    data/
      fleets.json
      vessels.json
      vesselLocations.json
    package.json

  client/
    src/
      main.jsx
      App.jsx
      pages/
        FleetsPage.jsx
        FleetPage.jsx
      components/
        FleetMap.jsx
      App.css
    vite.config.js
    package.json
```
---
### :hammer_and_wrench: Stack & Tools :
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/github/github-original-wordmark.svg" title="Github" **alt="Github" width="60" height="60"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="60" height="60"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="60" height="60"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="express" **alt="express" width="60" height="60"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg" title="vscode" **alt="vscode" width="60" height="60"/>   
</div>

---

## Getting Started

**Backend (server)**
From the server folder:
```cd server
npm install
npm start
The API will run on http://localhost:5000
```

**Frontend (client)**
From the client folder:
```cd client
npm install
npm run dev
Vite will start a dev server (usually on http://localhost:5173)
```
