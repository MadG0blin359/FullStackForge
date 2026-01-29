# 🚀 Shawaiz Shahid | Portfolio

A modern, interactive personal portfolio website built with **React 19**, **Vite**, and **Tailwind CSS v4**. Features stunning space-themed animations, smooth scrolling navigation, and a responsive design that looks great on all devices.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🌌 Space-Themed Design** — Animated star field and meteor shower backgrounds
- **🌗 Dark/Light Mode** — Theme toggle with smooth transitions
- **📱 Fully Responsive** — Mobile-first design with hamburger menu navigation
- **⚡ Smooth Scrolling** — Single-page app with seamless section navigation
- **🎨 Modern UI** — Gradient borders, glassmorphism effects, and micro-animations
- **📄 CV Download** — Downloadable resume directly from the About section

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg
│   └── Front-End CV.pdf
├── src/
│   ├── components/
│   │   ├── MeteorBackground.jsx   # Animated meteor shower effect
│   │   ├── Navbar.jsx             # Fixed navigation with mobile menu
│   │   ├── StarBackground.jsx     # Twinkling star field animation
│   │   └── ThemeToggle.jsx        # Dark/light mode switcher
│   ├── pages/
│   │   ├── Home.jsx               # Hero section with CTA
│   │   ├── About.jsx              # Bio and service cards
│   │   ├── Skills.jsx             # Skills with progress bars
│   │   ├── Projects.jsx           # Filterable project gallery
│   │   └── Contact.jsx            # Contact form and social links
│   ├── lib/
│   │   ├── imageURL.js            # Image path utility
│   │   └── utils.js               # Tailwind merge helper (cn)
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles and custom utilities
├── index.html                     # App entry HTML
├── package.json
├── vite.config.js
└── vercel.json                    # Vercel deployment config
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 7 |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **Routing** | React Scroll (smooth scrolling) |
| **Icons** | Lucide React |
| **UI Components** | Radix UI (Toast), Class Variance Authority |
| **Deployment** | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MadG0blin359/FullStackForge.git
   cd FullStackForge/Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🎨 Customization

### Personal Information

Edit the following files to personalize the portfolio:

- **`src/pages/Home.jsx`** — Name and tagline
- **`src/pages/About.jsx`** — Bio and service descriptions
- **`src/pages/Skills.jsx`** — Skill categories and proficiency levels
- **`src/pages/Projects.jsx`** — Project data (images, descriptions, links)
- **`src/pages/Contact.jsx`** — Email, location, and social links
- **`public/Front-End CV.pdf`** — Your resume file

### Theming

Modify CSS variables in `src/index.css` to change:
- Primary accent colors
- Background gradients
- Animation speeds

## 🌐 Deployment

The project is configured for **Vercel** deployment. Simply connect your GitHub repository to Vercel, and it will auto-deploy on every push.

```bash
npm run build
# Output: dist/
```

## 📬 Contact

- **Email:** shawaizshahid312@gmail.com
- **GitHub:** [@MadG0blin359](https://github.com/MadG0blin359)
- **LinkedIn:** [Shawaiz Shahid](https://www.linkedin.com/in/shawaiz-shahid-2695181b5/)
- **Location:** Hyderabad, Pakistan

---

<p align="center">
  Made with ❤️ by <strong>Shawaiz Shahid</strong>
</p>
