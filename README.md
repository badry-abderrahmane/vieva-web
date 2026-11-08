# vieva-web

Marketing site for Vieva Services (large-format printing, events, installation, supplies), Morocco.

- Plan and phases: [docs/PLAN.md](docs/PLAN.md)
- Design review (colors, layout): [docs/DESIGN-REVIEW.md](docs/DESIGN-REVIEW.md)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serves dist/
```

## Structure

```
index.html        page markup (desktop and mobile share it)
src/style.css     design tokens, layout, mobile rules
src/main.js       headline, GSAP motion, drawer, form preview
src/scene.js      three.js hero: printed tarp, vinyl roll, trophy, forex panels
public/logo.svg   vector recreation of the logo
public/brand/     reference screenshot of the supplied logo
```

Stack: Vite, three.js 0.128, GSAP 3.12. Fonts from Google Fonts (Bricolage Grotesque, Instrument Sans, JetBrains Mono, Poppins).

Status: phase 1 (home, desktop and mobile). The quote form is a preview and does not send anything yet.
