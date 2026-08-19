# Forge Fitness Club

**Author:** R Sai Dheeraj  
**Roll number:** 24ATA05269

A six-page gym and fitness club website built with plain HTML, CSS, and JavaScript. The design uses no photographs — every visual is CSS or inline SVG.

## Pages

| Page | What it does |
|------|--------------|
| `index.html` | Hero, program preview, coaching quote, call to action |
| `about.html` | Club story, values, timeline, founder profile |
| `programs.html` | Six program cards and a working BMI calculator |
| `trainers.html` | Coach profiles and coaching standards |
| `membership.html` | Three plans with plan selection |
| `contact.html` | Validated walkthrough/registration form |

## Features

- Responsive layout and mobile navigation
- Working BMI calculator with input validation
- Membership selection stored in `localStorage`
- Contact form validation for name, email, phone, goal, plan, and message
- Plan choice carried from membership page to contact form
- Client-side registration storage (last 25 requests) for demo purposes
- Keyboard-friendly controls, visible focus states, and reduced-motion support
- No external images, fonts, or libraries

## Run it

Open `index.html` directly in a browser.

For clean relative paths, serve the folder:

```bash
cd gym-website
python3 -m http.server 8081
```

Then open <http://localhost:8081>.

## Demo data

The website is frontend-only. There is no backend, payment gateway, or email service.

- Membership selection is saved under `forgePlan` in `localStorage`.
- Walkthrough requests are saved under `forgeRegistrations` in `localStorage`.
- Clearing site data removes the saved entries.

For a production version, connect the contact form to an API, add authentication, and process payments through a secure gateway.

## Design notes

- Palette: near-black, off-white, lime, and a small orange accent.
- Display type is system sans with tight tracking; body copy uses the same family for performance.
- All artwork — the rotating hero plate, icons, and card visuals — is CSS or inline SVG.

## Files

```text
gym-website/
├── index.html
├── about.html
├── programs.html
├── trainers.html
├── membership.html
├── contact.html
├── css/style.css
├── js/main.js
└── README.md
```

## Author

R Sai Dheeraj · 24ATA05269 · 2026
