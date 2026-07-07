# Dev Portfolio — 3D Developer Portfolio Website

A dark, glassmorphic developer portfolio built with **React (Vite)**, **React Three Fiber / Three.js**, **Framer Motion**, and **Tailwind CSS**. Includes an interactive 3D hero scene, animated sections, a scroll-spy navbar, and a validated contact form.

## Design

- **Palette:** near-black base (`#07070d`), electric blue (`#4f7cff`), violet (`#a855f7`), and a cyan accent (`#48e0e8`) for a neon dev-tool feel.
- **Type:** Space Grotesk for headings, Inter for body text, JetBrains Mono for labels — echoing an editor/terminal.
- **Signature motif:** section labels styled as code comments (`// 01. about`) and a "code window" card treatment (traffic-light dots on the photo frame), tying the whole site back to the subject: a developer's actual tools.

## Quick start

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Customize your content

Almost everything you'll want to change lives in **one file**:

```
src/constants/data.js
```

Edit this to update your name, roles, tagline, socials, education, skills, experience, projects, services, and certifications — the components read from here, so you don't need to touch component code for content changes.

### Your photo
Already wired in — `src/assets/profile.jpeg` is used in the About section (`src/components/About.jsx`). Swap the file (keep the same name) to replace it.

### Resume
Drop your PDF at `public/resume.pdf`. The Download Resume buttons already link to `/resume.pdf`.

### Colors / fonts
Edit `tailwind.config.js` (`theme.extend.colors` / `fontFamily`) and the Google Fonts `<link>` in `index.html`.

## Project structure

```
src/
  components/     # Navbar, Hero, About, Skills, Experience, Projects,
                   # Services, Certificates, Contact, Footer,
                   # Loader, ScrollProgress, BackToTop, CustomCursor
  canvas/
    HeroScene.jsx  # the 3D scene: floating "monitor", icons, stars, mouse-driven camera
  constants/
    data.js        # all editable content
  hooks/
    useActiveSection.js  # scroll-spy for the navbar
  assets/
    profile.jpeg    # your photo
```

## Deploying

**Vercel:** push to GitHub, import the repo in Vercel, framework preset "Vite" — `vercel.json` is already included for SPA routing.

**GitHub Pages:** run `npm run build`, then deploy the `dist/` folder (e.g. with the `gh-pages` package or GitHub Actions).

## Notes on scope

To keep this maintainable, a few "extra feature" ideas from a large spec (testimonials, blog preview, light/dark toggle, sound toggle, project filtering) were left out of this first pass so the core experience stays fast and polished. The structure (one component per section, all content in `data.js`) makes it straightforward to add any of them later — happy to build them out if you want them.

The contact form currently simulates sending (validates + shows a success state) — connect it to a real backend, [Formspree](https://formspree.io/), or [EmailJS](https://www.emailjs.com/) to actually deliver messages.
