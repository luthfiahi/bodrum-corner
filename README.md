# Bodrum Corner — Official Website

## Authentic Turkish Restaurant in Bali

A premium static website showcasing Bodrum Corner's identity, signature menu, gallery, and contact information. Built with vanilla HTML, CSS, and JavaScript following a comprehensive design system.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling (Variables, Flexbox, Grid) |
| JavaScript (ES6+) | Interactions (modular) |
| Google Fonts | Playfair Display + Poppins |
| Lucide Icons | Icon library (outline style) |
| GitHub Pages | Hosting & deployment |

## Project Structure

```
bodrum-corner/
├── index.html            # Single page — all sections
├── assets/
│   ├── images/           # All images (hero, menu, gallery, reviews, etc.)
│   ├── icons/            # Icon assets (if any custom icons)
│   └── logo/             # Logo files (favicon, logo.png, logo.svg)
├── css/
│   ├── variables.css     # CSS custom properties (colors, spacing, fonts, etc.)
│   ├── style.css         # Main stylesheet (all components)
│   └── responsive.css    # Media queries (tablet 768px, desktop 1024px)
├── js/
│   ├── main.js           # Entry point — initializes all modules
│   ├── navbar.js         # Sticky navbar, mobile toggle, active menu, reviews slider
│   ├── gallery.js        # Lightbox (open/close, prev/next, keyboard navigation)
│   └── animation.js      # Scroll-triggered fade-in/slide-up (Intersection Observer)
└── README.md
```

## Sections

1. **Hero** — Fullscreen with CTA buttons
2. **About** — Restaurant story + feature highlights
3. **Signature Menu** — Grid of menu cards with prices
4. **Gallery** — Masonry grid with lightbox preview
5. **Reviews** — Auto-sliding testimonial cards
6. **Contact** — Address, hours, WhatsApp, Google Maps
7. **Footer** — Links, social media, copyright

## Setup & Run

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/bodrum-corner.git
   ```

2. Open `index.html` in your browser — no build tools needed.

3. To preview locally:
   ```bash
   # Using Python
   python3 -m http.server 8080

   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

## Deployment

1. Push to GitHub (`main` branch)
2. Go to **Settings → Pages**
3. Source: `main` branch, root directory
4. Connect custom domain (optional)

## Reference Documents

| Document | Description |
|----------|-------------|
| MASTER_DEVELOPMENT_PROMPT.md | Master rules for AI-assisted development |
| PRD-001 | Product Vision |
| PRD-002 | Design System |
| PRD-003 | Information Architecture & UX |
| PRD-004 | UI Components Specification |
| PRD-005 | Frontend Technical Architecture |
| PRD-006 | Development Roadmap |

## License

Proprietary — Bodrum Corner. All rights reserved.

Wed Jul 29 22:11:26 UTC 2026
