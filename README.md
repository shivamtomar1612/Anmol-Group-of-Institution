# New Anmol Group of Institutions

Production-ready static institutional website for New Anmol Group of Institutions, a private healthcare education institution in Dhalipur, Vikasnagar, Dehradun.

## About

The site presents the institution's verified healthcare education portfolio, learning approach, leadership, campus facilities, admissions information and contact details using the approved institutional content and supplied media.

## Website features

- Institutional homepage and About section
- Chairman's message, Vision & Mission and academic philosophy
- Nine-course catalogue with course-specific fee structure
- Admissions enquiry form with course pre-selection
- Campus, infrastructure and responsive photo gallery
- Learning, Faculty and Student Life sections
- Media, Events and News routes
- Prospectus download, map, phone, email and social links
- Responsive layouts, keyboard focus states, reduced-motion support and semantic headings
- Canonical metadata, Open Graph tags, sitemap, robots.txt and structured data

## Technology

This is a framework-free static site built with semantic HTML, modern CSS and small vanilla JavaScript modules. Media is served from the `dist/assets` directory. No runtime package manager or frontend build dependency is required.

## Preview locally

From this directory, serve `dist` with any static server. For example:

```powershell
python -m http.server 8770 --directory dist
```

Then open `http://127.0.0.1:8770/`.

## Running locally

The local preview command above is the complete development command for this static bundle. Python 3's built-in HTTP server is sufficient; no `npm install` step is required.

## Production build

There is no compilation step. The committed `dist` directory is the production build and can be published by any static host. Before publishing, run the route/link checks described in the project handoff and serve `dist` locally for a smoke test.

## Vercel deployment

This repository is a framework-free static site, so it does not need a `vercel.json`, serverless functions or API routes. In Vercel, use Framework Preset **Other**, Root Directory `.`, leave Install Command and Build Command empty, and set Output Directory to `dist`. No environment variables are required. Vercel should serve the committed static output directly, including nested route folders and `404.html`.

## Environment variables

No environment variables are required by the current static site. The admissions form prepares a local `mailto:` draft and does not use an API key or server endpoint. If an approved backend is added later, document its variable names in a local `.env.example` and keep credentials out of Git.

## Published routes

The bundle includes the homepage, About and Chairman pages, Vision & Mission, Academic course and fee pages, Campus and Gallery, Learning, Faculty, Student Life, Admissions and FAQ, Media, Events, News, Contact, Privacy Policy and a static 404 page.

## Enquiry submission path

The admissions form validates required fields in the browser and prepares a `mailto:` draft addressed to `admission@newanmolgroupofinstitutions.co.in`. It does not claim to store or send submissions. To connect a server endpoint later, replace the submit handler in `dist/admissions/index.html` with the institution's approved endpoint and keep the same validation and status messaging.

## Deployment

`dist` is the deployable static output. The `.openai/hosting.json` file identifies the connected Sites project. Do not commit credentials, API keys or local environment files. A future GitHub push can publish this repository as a static site using the provider's standard Pages workflow with `dist` as the publish directory.

## Content and media

Course, fee, institutional and contact content is rendered from the approved project inventory. Authentic campus, laboratory, faculty and student media is stored under `dist/assets`; images include dimensions and factual alt text, and the campus film uses a poster frame with controls and no autoplay.
