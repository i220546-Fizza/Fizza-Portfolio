# Fizza Sarfraz: Portfolio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide icons.

## Run it (Windows PowerShell / VS Code terminal)

Install Node.js 18 or newer from https://nodejs.org first, then:

```powershell
cd fizza-portfolio
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

Other commands:

```powershell
npm run typecheck   # TypeScript check
npm run build       # production build into /dist
npm run preview     # serve the production build locally
```

## Where to edit things

| What | File |
|---|---|
| Email, LinkedIn, Fiverr, GitHub, location, photo position | `src/data/site.ts` |
| Projects (links, screenshots, details) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Education | `src/data/education.ts` |
| About text | `src/components/sections/About.tsx` |

## Replace the profile photo

1. Copy your photo into the `public` folder, for example `public/profile.jpg` (portrait, about 4:5, at least 800 px wide).
2. In `src/data/site.ts` set `profileImage: "/profile.jpg"`.

## Project links

- In `src/data/projects.ts` set `github: "https://github.com/fizzasarfraz515/<repo>"` and, where one exists, `demo: "https://..."`. An empty `github` keeps that button disabled; an empty `demo` hides the Live Demo button.
- Optional screenshot: save it as `public/projects/<name>.png` and set `image: "/projects/<name>.png"`.
- PrepifyAI: add its real `highlights` and `tech`, then remove `detailsPending: true`.

## Profile photo

The photo is shown by one reusable component, `src/components/ui/ProfileImage.tsx`, in the hero (round) and in About (portrait).
To change it, replace `public/profile.jpg` with a new photo (portrait, about 4:5, at least 800 px wide). If the face looks off-centre after cropping, adjust `profileImageFocus` (x% y%) and `profileAvatarZoom` in `src/data/site.ts`.

## Contact form

The site has no server, so by default the form opens the visitor's email app with the message filled in and says so; nothing is sent automatically.
To send messages directly:

1. Create a free form endpoint (for example at https://formspree.io) that forwards to your email.
2. On Render, open your site, then Environment, and add `VITE_CONTACT_ENDPOINT` with the endpoint URL. Redeploy.
   (For local testing, copy `.env.example` to `.env` and set it there.)

## Deploy on Render (Static Site)

1. Push this project to a GitHub repository.
2. Sign in at https://dashboard.render.com (Continue with GitHub).
3. Click New, then Blueprint, and choose the repository. Render reads `render.yaml` and creates the static site `fizza-portfolio` with:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - SPA rewrite `/*` to `/index.html` (refreshing never gives a 404)
   - Auto-deploy on every push
4. Click Apply. After the build finishes, the site is live at `https://fizza-portfolio.onrender.com` (or a similar name if that one is taken).

Manual alternative: New, then Static Site, pick the repo, enter the build command and publish directory above, then under Redirects/Rewrites add a Rewrite from `/*` to `/index.html`.

To update the site later: edit, then `git add .`, `git commit -m "Update"`, `git push`. Render rebuilds automatically.

Custom domain: Render dashboard, your site, Settings, Custom Domains, Add Custom Domain, then create the DNS record Render shows at your registrar.
