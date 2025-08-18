# FluidDynamics Learning Hub

A modern, interactive HTML application for learning fluid dynamics with a snap-section highway design optimized for fast consumption and deep learning.

## Features

### 🎯 Above-the-fold Dashboard (0-6s attention window)
- **Hero Animation**: Fluid dynamics visualization with smooth motion
- **Learning Path Tiles**: 6 color-coded modules with progress rings
- **Quick Tools Toolbar**: Reynolds calculator, unit converter, Moody chart

### 🛣️ Snap-Section Highway
- Viewport-height sections with smooth scroll-snap behavior
- Micro-scrolls instead of marathon scrolling
- Each section focuses on one module with clear progress indicators

### 📱 Slide-Out Lesson Panels
- Right-side drawer panels for focused deep dives
- Breadcrumb navigation and lesson outlines
- Sticky navigation footer with prev/next controls
- No cognitive "lost-in-scroll" cost

### 🎴 Micro-Learning Cards
- 3-minute read chunks (~300 words)
- Toggleable "Show me the maths" sections
- 60-second inline quizzes with immediate feedback
- Constant forward motion feeling

### 🗺️ Persistent Mini-Map Navigation
- Left-edge navigation rail with colored dots
- Hover tooltips and click-to-jump functionality
- Real-time progress tracking
- Visual orientation without menu overload

### ⚡ Instant-Gratification Widgets
- **Fundamentals**: Dimensional analysis quiz with real-time Π-group generation
- **CFD**: Mesh quality slider with wall-function error visualization
- **Experiments**: Live PIV demo with WebGL visualization
- Interactive elements in every section header

### 🚀 Performance Optimizations
- Service worker for offline functionality
- Intelligent prefetching of upcoming content
- Lazy loading of heavy simulations and widgets
- IntersectionObserver-based content management

## Learning Modules

### 1. Fundamentals Track (F-series)
- F-01: Continuum hypothesis & fluid properties
- F-02: Hydrostatics: pressure fields, buoyancy
- F-03: Flow kinematics: streamlines, pathlines, vorticity
- F-04: Integral conservation laws
- F-05: Differential analysis & Navier–Stokes equations
- F-06: Dimensional analysis & similarity
- F-07: Potential flow & superposition
- F-08: Viscous flow & boundary layers
- F-09: Turbulence basics

### 2. CFD Hub (C-series)
- Discretisation methods (FDM, FVM, FEM, LBM)
- Meshing & grid quality
- Turbulence modelling (RANS, LES, DES, DNS)
- Multiphase & moving-mesh techniques
- High-order & GPU acceleration
- Data-driven CFD with ML
- Verification & validation
- Toolkits & code labs
- Post-processing & visualization

### 3. Experimental Methods (E-series)
- Particle-image velocimetry (PIV)
- Laser Doppler velocimetry (LDV)
- Wind & water tunnel testing
- Flow visualization techniques
- Uncertainty analysis
- Real datasets for practice

### 4. Advanced Theory (A-series)
- Compressible & gas dynamics
- Multiphase flows
- Non-Newtonian rheology
- Reacting flows & combustion
- Magnetohydrodynamics

### 5. Applications Gallery (G-series)
- Aerospace applications
- Energy & environment
- Biomedical engineering
- Marine engineering
- Industrial processes

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure with accessibility features
- **Tailwind CSS**: Utility-first styling with custom configurations
- **Vanilla JavaScript**: Modern ES6+ with modular architecture
- **Service Worker**: Offline functionality and caching
- **IntersectionObserver API**: Performance-optimized content loading
- **CSS Grid/Flexbox**: Responsive layouts
- **Custom CSS Animations**: Smooth transitions and micro-interactions

### Browser Support
- Modern browsers with ES6+ support
- Progressive enhancement for older browsers
- Responsive design for mobile, tablet, and desktop
- Accessibility features with proper ARIA labels and keyboard navigation

### Performance Features
- Lazy loading of heavy content
- Prefetching of upcoming sections
- Service worker caching
- Optimized animations with `prefers-reduced-motion`
- Efficient scroll-snap implementation

## Usage

1. Open `index.html` in a modern web browser
2. Navigate using the mini-map rail or scroll through sections
3. Click "Expand Module" to open detailed lesson panels
4. Interact with widgets and complete quizzes
5. Track progress through visual indicators

## Design Philosophy

The application follows the "fast-consuming" principle:
- **Snap sections** prevent endless scrolling fatigue
- **Micro-cards** keep content digestible
- **Interactive widgets** provide immediate engagement
- **Aggressive caching** ensures snappy performance
- **Visual hierarchy** guides attention effectively

Perfect for busy engineers who want to speed-run fluid dynamics while covering comprehensive material.