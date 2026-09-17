# Ridwoanul Hoque Rafi - Personal Developer Portfolio

A modern, responsive, production-quality personal portfolio website engineered for **Ridwoanul Hoque Rafi**, an **Aspiring Full-Stack Web Developer**.

Built strictly with clean, maintainable, beginner-friendly technologies: **HTML5**, **Tailwind CSS**, and modular **Vanilla JavaScript**.

---

## 🌟 Key Features

- **Dark Developer Aesthetic**: Deep navy/slate palette (`#030712`, `#0b0f19`), neon blue/purple gradient accents, soft glows, and subtle glassmorphic surfaces.
- **Developer-Focused Profile**:
  - Focus on responsive web design, clean semantic code, and modern JavaScript.
  - Honest skill levels (no exaggerated senior claims; Python and Django clearly demarcated as in-progress learning).
  - Highlighting real projects, frontend craftsmanship, and active daily problem-solving.
- **Interactive Project Showcase**:
  - Category filtering (`All`, `Frontend`, `Full Stack`, `Practice`) with animated card transitions.
  - Interactive **Project Details Modal** complete with deep-dive technical overviews, key features, engineering challenges, solutions, and live/code repository links.
  - Fully accessible dialog with Escape key listeners, outside click backdrop dismissal, and focus trapping.
- **Client-Side Validated Contact Form**:
  - Live field validation (name, email format regex, subject length, and message length).
  - Clear inline error feedback and animated success indicators.
  - Pre-structured for 1-click integration with Formspree, EmailJS, or custom REST API backends.
- **Sticky Glassmorphic Navigation**:
  - Smooth scrolling with offset adjustment.
  - Intersection Observer scroll spy highlighting the active section.
  - Responsive mobile drawer menu with aria controls.
  - Scroll progress bar at the top of the viewport.
- **CV Download**:
  - One-click PDF download for `Ridwoanul_Hoque_Rafi_CV.pdf` with interactive toast notification.
- **Back-to-Top Floating Button**: Appears smoothly once scrolled past 400px.
- **SEO & Accessibility**: Complete Open Graph metadata, semantic HTML5 landmarks, WAI-ARIA labels, visible keyboard focus rings, and high contrast text ratios.

---

## 📂 Project Structure

```
/
├── index.html                   # Complete semantic, accessible HTML5 single-page application
├── assets/
│   ├── images/
│   │   ├── favicon.svg          # Modern glowing monogram logo (RHR)
│   │   ├── hero-visual.svg      # Abstract developer workspace visual with floating stats
│   │   ├── project-foodie.svg   # Foodie Hub preview illustration
│   │   ├── project-blog.svg     # Blog CMS dashboard preview illustration
│   │   ├── project-taskflow.svg # TaskFlow Kanban board preview illustration
│   │   └── project-portfolio.svg# DevPortfolio architecture preview illustration
│   ├── icons/                   # Custom icon store (utilizes Lucide icons via CDN)
│   └── cv/
│       └── Ridwoanul_Hoque_Rafi_CV.pdf # Standard PDF resume ready for recruiters
├── css/
│   └── style.css                # Custom animations, glassmorphism, scrollbars, and keyframes
├── js/
│   └── script.js                # Modular vanilla JavaScript for nav, modal, filters, and validation
└── README.md                    # Documentation, customization guide, and deployment instructions
```

---

## 🚀 How to Run Locally

You do not need to install heavy build tools or npm dependencies. You can preview this site instantly in any modern web browser.

### Option 1: Direct File Open
Double-click `index.html` or drag it into Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Using Python Local Server (Recommended)
Open your terminal in this directory and run:
```bash
python -m http.server 3000
```
Then visit: `http://localhost:3000` in your browser.

### Option 3: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right click `index.html` and select **"Open with Live Server"**.

---

## 🛠️ How to Customize

### 1. Update Contact Information & Social URLs
In `index.html`, search for `contact@example.com`, `https://github.com`, and `https://linkedin.com` to insert your actual links:
- Email: `mailto:your-email@gmail.com`
- GitHub: `https://github.com/your-username`
- LinkedIn: `https://linkedin.com/in/your-username`

### 2. Connect the Contact Form to Receive Real Emails
The contact form currently validates all inputs on the client side and provides visual feedback. To have submissions sent directly to your inbox:

#### Method A: Formspree (Free & Fastest)
1. Sign up at [formspree.io](https://formspree.io) and create a form.
2. In `js/script.js` (around line 370), replace the `setTimeout` block with:
```javascript
fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
}).then(response => {
  if (response.ok) {
    // Show success message
  }
});
```

#### Method B: EmailJS
Include the EmailJS SDK in `index.html` and invoke `emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form)` in the submit handler.

### 3. Add or Modify Projects
All project data used by the details modal is organized cleanly in `js/script.js` inside the `projectsData` array:
```javascript
{
  id: 'your-project-id',
  title: 'Project Title',
  subtitle: 'Short subtitle',
  category: 'frontend', // 'frontend', 'fullstack', or 'practice'
  image: 'assets/images/your-image.svg',
  description: 'Full overview...',
  features: ['Feature 1', 'Feature 2'],
  technologies: ['HTML5', 'Tailwind', 'Python'],
  challenges: 'Key challenge description...',
  solutions: 'Solution implemented...',
  demoUrl: 'https://your-demo-url.com',
  repoUrl: 'https://github.com/your-repo'
}
```

### 4. Updating Your Resume (CV)
Replace `assets/cv/Ridwoanul_Hoque_Rafi_CV.pdf` with your updated PDF file whenever your qualifications expand. Keep the filename the same or update the `href` in `index.html`.

---

## 🌐 Free Deployment Guide

### Option 1: GitHub Pages (Recommended)
1. Create a repository on GitHub (e.g. `portfolio`).
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings** > **Pages**.
4. Set source to `Deploy from a branch`, select `main` and root `/`, and click **Save**.
5. Your portfolio is live at `https://yourusername.github.io/portfolio/`!

### Option 2: Vercel or Netlify
1. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Connect your GitHub repository.
3. Keep default settings (no build command needed) and click **Deploy**.

---

## 📄 License & Attribution

Designed and engineered for **Ridwoanul Hoque Rafi**.  
© 2026 Ridwoanul Hoque Rafi. All rights reserved.
