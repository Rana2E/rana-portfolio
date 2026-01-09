# Portfolio Website

A single-page portfolio website built with React + Vite + Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Hero section with Aurora background placeholder
│   ├── AboutMe.jsx           # About section with two-column layout
│   ├── QuickStats.jsx        # Stats section with animated counter placeholder
│   ├── Projects.jsx          # Projects grid section
│   ├── ProjectCard.jsx       # Reusable project card component
│   ├── JustForFun.jsx        # Fun projects section
│   ├── Playground.jsx        # Playground with circular gallery placeholder
│   ├── TechSocialLoop.jsx    # Tech/Social icons looping section
│   ├── ThingsICantBuild.jsx  # 404 section
│   └── Footer.jsx            # Footer component
├── App.jsx                   # Main app component assembling all sections
├── main.jsx                  # Entry point
└── index.css                 # Tailwind CSS imports
```

## Features

- Dark theme by default
- Responsive design
- Clean, semantic HTML
- Performance-conscious structure
- Animation placeholders with TODO comments for easy customization

## Next Steps

1. Replace placeholder content with your actual information
2. Add images to the About Me section
3. Implement animations (see TODO comments in components)
4. Add your project data to the Projects section
5. Customize colors and styling as needed

