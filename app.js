// FluidDynamics Learning Hub - Main Application JavaScript

class FluidDynamicsApp {
    constructor() {
        this.currentSection = 'hero';
        this.panelOpen = false;
        this.init();
    }

    init() {
        this.setupScrollSnap();
        this.setupMiniMap();
        this.setupPanels();
        this.setupInteractiveWidgets();
        this.setupIntersectionObserver();
    }

    setupScrollSnap() {
        // Smooth scroll behavior for mini-map navigation
        const miniMapDots = document.querySelectorAll('.mini-map-dot');
        miniMapDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const sectionId = e.target.dataset.section;
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupMiniMap() {
        // Update active dot based on current section
        this.updateActiveDot(this.currentSection);
    }

    updateActiveDot(sectionId) {
        const dots = document.querySelectorAll('.mini-map-dot');
        dots.forEach(dot => {
            if (dot.dataset.section === sectionId) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        this.currentSection = sectionId;
    }

    setupPanels() {
        const expandBtns = document.querySelectorAll('.expand-btn');
        const closeBtn = document.getElementById('close-panel');
        const overlay = document.getElementById('panel-overlay');

        expandBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = e.target.dataset.module;
                this.openPanel(module);
            });
        });

        closeBtn.addEventListener('click', () => {
            this.closePanel();
        });

        overlay.addEventListener('click', () => {
            this.closePanel();
        });
    }

    openPanel(module) {
        const panel = document.getElementById('slide-panel');
        const overlay = document.getElementById('panel-overlay');
        const breadcrumb = document.getElementById('panel-breadcrumb');
        const content = document.getElementById('panel-content');

        // Update breadcrumb
        breadcrumb.textContent = this.getModuleName(module);

        // Load module content
        content.innerHTML = this.getModuleContent(module);

        // Show panel
        panel.classList.add('open');
        overlay.classList.remove('hidden');
        this.panelOpen = true;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closePanel() {
        const panel = document.getElementById('slide-panel');
        const overlay = document.getElementById('panel-overlay');

        panel.classList.remove('open');
        overlay.classList.add('hidden');
        this.panelOpen = false;

        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    getModuleName(module) {
        const names = {
            'fundamentals': 'Fundamentals Track',
            'advanced': 'Advanced Theory',
            'cfd': 'CFD Hub',
            'experimental': 'Experimental Methods',
            'applications': 'Applications Gallery',
            'playground': 'Interactive Playground',
            'resources': 'Resource Library'
        };
        return names[module] || 'Module';
    }

    getModuleContent(module) {
        const content = {
            'fundamentals': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Fundamentals Track</h2>
                <div class="space-y-4">
                    ${this.createLessonCard('F-01', 'Continuum hypothesis & fluid properties', 'Learn when and why we can treat fluids as continuous media', true)}
                    ${this.createLessonCard('F-02', 'Hydrostatics: pressure fields, buoyancy', 'Master pressure distribution and buoyant forces', true)}
                    ${this.createLessonCard('F-03', 'Flow kinematics: streamlines, pathlines, vorticity', 'Understand flow visualization and rotation measures', true)}
                    ${this.createLessonCard('F-04', 'Integral conservation laws (mass, momentum, energy)', 'Apply control volume analysis to real problems', false)}
                    ${this.createLessonCard('F-05', 'Differential analysis & Navier–Stokes equations', 'Derive and understand the fundamental equations', false)}
                    ${this.createLessonCard('F-06', 'Dimensional analysis & similarity (Π-theorem)', 'Master scaling laws and similitude', false)}
                    ${this.createLessonCard('F-07', 'Potential flow & superposition', 'Solve inviscid flow problems analytically', false)}
                    ${this.createLessonCard('F-08', 'Viscous flow & boundary layers', 'Understand viscous effects and transition', false)}
                    ${this.createLessonCard('F-09', 'Turbulence basics: spectra, Kolmogorov scales', 'Introduction to chaotic flow behavior', false)}
                </div>
            `,
            'cfd': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">CFD Hub</h2>
                <div class="space-y-4">
                    ${this.createLessonCard('C-01', 'Discretisation methods (FDM, FVM, FEM, LBM)', 'Compare numerical approaches for fluid equations', true)}
                    ${this.createLessonCard('C-02', 'Meshing & grid quality', 'Create and assess computational grids', true)}
                    ${this.createLessonCard('C-03', 'Turbulence modelling (RANS, LES, DES, DNS)', 'Model turbulent flows computationally', true)}
                    ${this.createLessonCard('C-04', 'Multiphase & moving-mesh', 'Handle complex interface problems', false)}
                    ${this.createLessonCard('C-05', 'High-order & GPU techniques', 'Accelerate computations with modern hardware', false)}
                    ${this.createLessonCard('C-06', 'Data-driven CFD (ML closures, PINNs, ROMs)', 'Apply machine learning to fluid problems', false)}
                    ${this.createLessonCard('C-07', 'Verification & validation, GCI, benchmarks', 'Ensure solution accuracy and reliability', false)}
                    ${this.createLessonCard('C-08', 'Toolkits & code labs', 'Hands-on with OpenFOAM, SU2, and commercial codes', false)}
                    ${this.createLessonCard('C-09', 'Post-processing & visualisation', 'Extract insights from simulation data', false)}
                </div>
            `,
            'experimental': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Experimental Methods</h2>
                <div class="space-y-4">
                    ${this.createLessonCard('E-01', 'Particle-image velocimetry (PIV)', 'Measure velocity fields optically', true)}
                    ${this.createLessonCard('E-02', 'Laser Doppler velocimetry (LDV)', 'Point-wise velocity measurements', false)}
                    ${this.createLessonCard('E-03', 'Wind- & water-tunnel testing', 'Controlled environment experimentation', false)}
                    ${this.createLessonCard('E-04', 'Flow visualisation techniques', 'Make the invisible visible', false)}
                    ${this.createLessonCard('E-05', 'Uncertainty analysis & error propagation', 'Quantify measurement reliability', false)}
                    ${this.createLessonCard('E-06', 'Downloadable raw data sets', 'Practice with real experimental data', false)}
                </div>
            `,
            'advanced': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Advanced Theory</h2>
                <div class="space-y-4">
                    ${this.createLessonCard('A-01', 'Compressible & gas dynamics', 'High-speed flow phenomena', true)}
                    ${this.createLessonCard('A-02', 'Multiphase / free-surface flows', 'Multiple fluid interactions', false)}
                    ${this.createLessonCard('A-03', 'Non-Newtonian rheology', 'Complex fluid behavior', false)}
                    ${this.createLessonCard('A-04', 'Reacting flows & combustion', 'Chemical reactions in flow', false)}
                    ${this.createLessonCard('A-05', 'Magnetohydrodynamics & geophysical fluids', 'Specialized applications', false)}
                </div>
            `,
            'applications': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Applications Gallery</h2>
                <div class="space-y-4">
                    ${this.createLessonCard('G-01', 'Aerospace – lift, buffet, jet-noise cases', 'Aircraft and spacecraft applications', true)}
                    ${this.createLessonCard('G-02', 'Energy & Environment', 'Wind-farm wakes, pollutant dispersion', true)}
                    ${this.createLessonCard('G-03', 'Biomedical – arterial flow, inhaler CFD', 'Medical device design', false)}
                    ${this.createLessonCard('G-04', 'Marine – hull resistance, propeller cavitation', 'Ship and underwater vehicle design', false)}
                    ${this.createLessonCard('G-05', 'Industrial – cyclones, HVAC, process piping', 'Manufacturing and building systems', false)}
                </div>
            `,
            'playground': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Interactive Playground</h2>
                <div class="space-y-6">
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-3">WebGL Potential Flow Solver</h3>
                        <div class="bg-white rounded border h-64 flex items-center justify-center">
                            <div class="text-gray-500">Interactive simulation will load here</div>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-3">Real-time Vortex Shedding</h3>
                        <div class="bg-white rounded border h-64 flex items-center justify-center">
                            <div class="text-gray-500">2D flow simulation will load here</div>
                        </div>
                    </div>
                </div>
            `,
            'resources': `
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Resource Library</h2>
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-gray-800 mb-2">Glossary</h3>
                            <p class="text-sm text-gray-600">Comprehensive fluid dynamics terminology</p>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-gray-800 mb-2">Formula Sheets</h3>
                            <p class="text-sm text-gray-600">Quick reference for key equations</p>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-gray-800 mb-2">Problem Sets</h3>
                            <p class="text-sm text-gray-600">Practice problems with solutions</p>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-gray-800 mb-2">Datasets</h3>
                            <p class="text-sm text-gray-600">Real experimental and simulation data</p>
                        </div>
                    </div>
                </div>
            `
        };
        return content[module] || '<p>Content loading...</p>';
    }

    createLessonCard(code, title, description, completed = false) {
        const statusIcon = completed ? '✅' : '⏳';
        const statusClass = completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200';
        
        return `
            <div class="lesson-card border rounded-lg p-4 ${statusClass} hover:shadow-md transition-shadow" data-lesson="${code}">
                <div class="flex items-start justify-between cursor-pointer" onclick="this.closest('.lesson-card').querySelector('.lesson-content').classList.toggle('hidden')">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="text-sm font-mono font-semibold text-gray-600">${code}</span>
                            <span class="text-lg">${statusIcon}</span>
                        </div>
                        <h3 class="font-semibold text-gray-800 mb-1">${title}</h3>
                        <p class="text-sm text-gray-600">${description}</p>
                    </div>
                    <div class="ml-4">
                        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium expand-lesson-btn">
                            ${completed ? 'Review' : 'Expand'} ↓
                        </button>
                    </div>
                </div>
                
                <!-- Expandable Content -->
                <div class="lesson-content hidden mt-4 pt-4 border-t border-gray-200">
                    ${this.getLessonContent(code)}
                </div>
            </div>
        `;
    }

    getLessonContent(code) {
        const content = {
            'F-01': `
                <div class="space-y-4">
                    <div class="bg-white rounded-lg p-4 border">
                        <h4 class="font-semibold text-gray-800 mb-3">Continuum Hypothesis & Fluid Properties</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            The continuum hypothesis is the foundational assumption in fluid mechanics that allows us to treat 
                            fluids as continuous media rather than collections of discrete molecules. This mathematical idealization 
                            enables the application of calculus and differential equations to fluid motion analysis.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Physical Basis:</strong> At molecular scales, fluids exhibit discrete behavior with molecules 
                            separated by mean free paths λ. However, when the characteristic length L of our problem is much 
                            larger than λ, we can define meaningful average properties at each point in space.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Fluid Properties:</strong> Under the continuum assumption, we define intensive properties 
                            (density ρ, pressure p, temperature T, viscosity μ) and extensive properties (mass m, volume V) 
                            that vary continuously in space and time.
                        </p>
                        
                        <button class="text-blue-600 text-sm hover:text-blue-800 math-toggle" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            Show me the maths →
                        </button>
                        <div class="hidden mt-3 p-3 bg-blue-50 rounded text-sm">
                            <strong>Knudsen Number:</strong> Kn = λ/L<br>
                            <strong>Validity Criteria:</strong><br>
                            • Kn < 0.01: Continuum regime (Navier-Stokes valid)<br>
                            • 0.01 < Kn < 0.1: Slip flow regime<br>
                            • 0.1 < Kn < 10: Transition regime<br>
                            • Kn > 10: Free molecular flow<br><br>
                            <strong>Mean Free Path:</strong> λ = μ√(πRT/2M)/p<br>
                            Where R = gas constant, T = temperature, M = molecular weight<br><br>
                            <strong>Density Definition:</strong> ρ = lim(δV→δV*) δm/δV<br>
                            Where δV* is the smallest volume for meaningful averaging
                        </div>
                    </div>
                    
                    <!-- Advanced Concepts -->
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Advanced Concepts</h4>
                        <div class="text-sm text-gray-700 space-y-2">
                            <p><strong>Non-Newtonian Fluids:</strong> Viscosity depends on shear rate (μ = μ(γ̇))</p>
                            <p><strong>Compressible Effects:</strong> Density varies with pressure and temperature</p>
                            <p><strong>Surface Tension:</strong> σ creates pressure jump across interfaces: Δp = σ(1/R₁ + 1/R₂)</p>
                            <p><strong>No-Slip Condition:</strong> Fluid velocity equals wall velocity at solid boundaries</p>
                        </div>
                    </div>
                    
                    <!-- Inline Quiz -->
                    <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Concept Check</h4>
                        <div class="quiz-question">
                            <p class="text-sm text-gray-700 mb-3">
                                At what altitude does the continuum hypothesis start breaking down for air flow around a satellite?
                                (Given: λ ≈ 70 km at 100 km altitude, satellite dimension L ≈ 2 m)
                            </p>
                            <div class="space-y-2">
                                <label class="flex items-center text-sm">
                                    <input type="radio" name="q1" value="a" class="mr-2">
                                    Sea level (Kn ≈ 10⁻⁷)
                                </label>
                                <label class="flex items-center text-sm">
                                    <input type="radio" name="q1" value="b" class="mr-2">
                                    Commercial flight altitude (Kn ≈ 10⁻⁶)
                                </label>
                                <label class="flex items-center text-sm">
                                    <input type="radio" name="q1" value="c" class="mr-2">
                                    Above 100 km altitude (Kn > 10)
                                </label>
                            </div>
                            <button class="mt-3 bg-yellow-600 text-white px-4 py-1 rounded text-sm hover:bg-yellow-700" onclick="this.closest('.quiz-question').querySelector('.quiz-result').classList.remove('hidden')">
                                Check Answer
                            </button>
                            <div class="quiz-result hidden mt-2 p-2 bg-green-100 rounded text-sm">
                                ✅ Correct! Above 100 km, Kn = 70000/2 = 35000 >> 10, requiring kinetic theory instead of continuum mechanics.
                            </div>
                        </div>
                    </div>
                </div>
            `,
            'F-02': `
                <div class="space-y-4">
                    <div class="bg-white rounded-lg p-4 border">
                        <h4 class="font-semibold text-gray-800 mb-3">Hydrostatics: Pressure Fields & Buoyancy</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            Hydrostatics analyzes fluids in mechanical equilibrium where net forces sum to zero. 
                            The absence of relative motion between fluid particles allows us to focus purely on pressure 
                            distribution and body forces, forming the foundation for understanding fluid statics.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Fundamental Principle:</strong> In a static fluid, pressure at any point acts equally 
                            in all directions (Pascal's principle). The pressure variation is determined solely by body 
                            forces, typically gravitational acceleration.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Engineering Applications:</strong> Hydrostatic pressure governs dam design, submarine 
                            hull strength, atmospheric pressure variation, and buoyancy calculations for floating structures.
                        </p>
                        
                        <button class="text-blue-600 text-sm hover:text-blue-800 math-toggle" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            Show me the maths →
                        </button>
                        <div class="hidden mt-3 p-3 bg-blue-50 rounded text-sm">
                            <strong>Hydrostatic Equation:</strong> ∇p = ρg⃗<br>
                            <strong>For constant density:</strong> dp/dz = -ρg (z-axis pointing up)<br>
                            <strong>Pressure at depth h:</strong> p = p₀ + ρgh<br>
                            <strong>Manometer equation:</strong> p₁ - p₂ = ρg(h₂ - h₁)<br><br>
                            <strong>Archimedes' Principle:</strong><br>
                            F⃗_b = -∫∫∫_V ρ_fluid g⃗ dV = -ρ_fluid g⃗ V_displaced<br>
                            <strong>Buoyant Force:</strong> |F_b| = ρ_fluid × V_displaced × g<br><br>
                            <strong>Stability Criteria:</strong><br>
                            • Stable: Metacenter above center of gravity<br>
                            • GM = KB + BM - KG > 0 (for floating bodies)
                        </div>
                    </div>
                    
                    <!-- Advanced Applications -->
                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Advanced Applications</h4>
                        <div class="text-sm text-gray-700 space-y-2">
                            <p><strong>Compressible Atmospheres:</strong> dp/dz = -ρ(p,T)g → Barometric formula</p>
                            <p><strong>Rotating Fluids:</strong> Include centrifugal force: ∇p = ρ(g⃗ + Ω⃗ × (Ω⃗ × r⃗))</p>
                            <p><strong>Surface Tension Effects:</strong> Young-Laplace equation: Δp = σ∇·n̂</p>
                            <p><strong>Hydrostatic Paradox:</strong> Pressure depends only on depth, not container shape</p>
                        </div>
                    </div>
                    
                    <!-- Interactive Problem -->
                    <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Engineering Problem</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            A concrete dam (ρ = 2400 kg/m³) has a triangular cross-section, 60m high and 50m wide at the base. 
                            Calculate the hydrostatic force on the dam face and its center of pressure when the reservoir is full.
                        </p>
                        <div class="grid grid-cols-2 gap-3 mb-3">
                            <input type="number" placeholder="Force (MN)" class="px-3 py-1 border rounded text-sm">
                            <input type="number" placeholder="y_cp (m from surface)" class="px-3 py-1 border rounded text-sm">
                        </div>
                        <button class="bg-yellow-600 text-white px-4 py-1 rounded text-sm hover:bg-yellow-700" onclick="this.nextElementSibling.classList.remove('hidden')">
                            Show Solution
                        </button>
                        <div class="hidden mt-3 p-3 bg-green-100 rounded text-sm">
                            <strong>Solution:</strong><br>
                            F = ρgh_c A = 1000 × 9.81 × 30 × (60×50) = 882.9 MN<br>
                            y_cp = h_c + I_xx/(h_c × A) = 30 + (50×60³/12)/(30×3000) = 40 m<br>
                            <em>The center of pressure is always below the centroid for submerged surfaces.</em>
                        </div>
                    </div>
                </div>
            `,
            'C-01': `
                <div class="space-y-4">
                    <div class="bg-white rounded-lg p-4 border">
                        <h4 class="font-semibold text-gray-800 mb-3">Discretization Methods Overview</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            Computational Fluid Dynamics requires converting continuous equations into discrete forms 
                            that computers can solve. Four main approaches dominate the field.
                        </p>
                        
                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div class="p-2 bg-blue-50 rounded">
                                <strong>FDM:</strong> Simple, structured grids
                            </div>
                            <div class="p-2 bg-green-50 rounded">
                                <strong>FVM:</strong> Conservative, flexible
                            </div>
                            <div class="p-2 bg-purple-50 rounded">
                                <strong>FEM:</strong> Complex geometries
                            </div>
                            <div class="p-2 bg-orange-50 rounded">
                                <strong>LBM:</strong> Mesoscopic approach
                            </div>
                        </div>
                        
                        <button class="text-blue-600 text-sm hover:text-blue-800 math-toggle mt-3" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            Show discretization equations →
                        </button>
                        <div class="hidden mt-3 p-3 bg-blue-50 rounded text-sm">
                            <strong>FDM Taylor Series:</strong> f'(x) ≈ [f(x+h) - f(x-h)]/2h<br>
                            <strong>FVM Integration:</strong> ∫∇·F dV = ∮F·n dA<br>
                            <strong>FEM Weak Form:</strong> ∫ψ(∇·F) dΩ = -∫∇ψ·F dΩ + ∮ψF·n dΓ
                        </div>
                    </div>
                </div>
            `,
            'F-03': `
                <div class="space-y-4">
                    <div class="bg-white rounded-lg p-4 border">
                        <h4 class="font-semibold text-gray-800 mb-3">Flow Kinematics: Streamlines, Pathlines & Vorticity</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            Flow kinematics describes the motion of fluid particles without considering the forces that cause 
                            the motion. We focus on velocity fields, flow visualization, and the mathematical description of 
                            fluid deformation and rotation.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Lagrangian vs Eulerian:</strong> Lagrangian follows individual particles (pathlines), 
                            while Eulerian describes flow at fixed points in space (streamlines). Both perspectives are 
                            essential for understanding complex flow phenomena.
                        </p>
                        <p class="text-sm text-gray-700 mb-3">
                            <strong>Vorticity:</strong> Measures local rotation of fluid elements. High vorticity regions 
                            indicate strong shear and are crucial for understanding turbulence, mixing, and energy dissipation.
                        </p>
                        
                        <button class="text-blue-600 text-sm hover:text-blue-800 math-toggle" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            Show me the maths →
                        </button>
                        <div class="hidden mt-3 p-3 bg-blue-50 rounded text-sm">
                            <strong>Velocity Field:</strong> v⃗(x⃗,t) = u(x,y,z,t)î + v(x,y,z,t)ĵ + w(x,y,z,t)k̂<br><br>
                            <strong>Streamlines:</strong> dx⃗/ds = v⃗/|v⃗| (instantaneous tangent to velocity)<br>
                            <strong>Pathlines:</strong> dx⃗/dt = v⃗(x⃗,t) (particle trajectory)<br>
                            <strong>Streaklines:</strong> Locus of particles passing through a point<br><br>
                            <strong>Vorticity:</strong> ω⃗ = ∇ × v⃗<br>
                            • ω_x = ∂w/∂y - ∂v/∂z<br>
                            • ω_y = ∂u/∂z - ∂w/∂x<br>
                            • ω_z = ∂v/∂x - ∂u/∂y<br><br>
                            <strong>Strain Rate Tensor:</strong> S_ij = ½(∂u_i/∂x_j + ∂u_j/∂x_i)<br>
                            <strong>Circulation:</strong> Γ = ∮_C v⃗·dl⃗ = ∫∫_S ω⃗·n̂ dS (Stokes theorem)
                        </div>
                    </div>
                    
                    <!-- Flow Visualization -->
                    <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Flow Visualization Techniques</h4>
                        <div class="grid grid-cols-2 gap-3 text-sm text-gray-700">
                            <div>
                                <p><strong>Streamlines:</strong> Tangent to velocity at each point</p>
                                <p><strong>Pathlines:</strong> Actual particle trajectories</p>
                                <p><strong>Streaklines:</strong> Dye injection visualization</p>
                            </div>
                            <div>
                                <p><strong>Timeline:</strong> Marked fluid elements at t₀</p>
                                <p><strong>Streamtubes:</strong> Bundle of streamlines</p>
                                <p><strong>Vortex lines:</strong> Tangent to vorticity vector</p>
                            </div>
                        </div>
                        <p class="text-xs text-gray-600 mt-2 italic">
                            Note: In steady flow, streamlines = pathlines = streaklines
                        </p>
                    </div>
                    
                    <!-- Interactive Quiz -->
                    <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 class="font-semibold text-gray-800 mb-3">Vorticity Analysis</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            For the 2D velocity field: u = 2xy, v = x² - y²<br>
                            Calculate the vorticity ω_z and identify the flow type.
                        </p>
                        <div class="space-y-2">
                            <label class="flex items-center text-sm">
                                <input type="radio" name="q3" value="a" class="mr-2">
                                ω_z = 0 (Irrotational flow)
                            </label>
                            <label class="flex items-center text-sm">
                                <input type="radio" name="q3" value="b" class="mr-2">
                                ω_z = -2y (Rotational flow)
                            </label>
                            <label class="flex items-center text-sm">
                                <input type="radio" name="q3" value="c" class="mr-2">
                                ω_z = 2x (Shear-dominated flow)
                            </label>
                        </div>
                        <button class="mt-3 bg-yellow-600 text-white px-4 py-1 rounded text-sm hover:bg-yellow-700" onclick="this.nextElementSibling.classList.remove('hidden')">
                            Show Analysis
                        </button>
                        <div class="hidden mt-3 p-3 bg-green-100 rounded text-sm">
                            <strong>Solution:</strong> ω_z = ∂v/∂x - ∂u/∂y = 2x - 2x = 0<br>
                            ✅ This is irrotational flow! Despite apparent "rotation," fluid elements don't spin.<br>
                            <em>This represents potential flow around a stagnation point.</em>
                        </div>
                    </div>
                </div>
            `;
        
        return content[code] || `
            <div class="bg-white rounded-lg p-4 border">
                <p class="text-sm text-gray-600">Content for ${code} will be available soon. This lesson includes:</p>
                <ul class="text-sm text-gray-600 mt-2 ml-4 list-disc">
                    <li>3-minute focused reading</li>
                    <li>Interactive examples</li>
                    <li>Quick comprehension quiz</li>
                    <li>Practical applications</li>
                </ul>
            </div>
        `;
    }

    setupInteractiveWidgets() {
        // Dimensional Analysis Quiz
        this.setupDimensionalAnalysis();
        
        // Mesh Quality Widget
        this.setupMeshQuality();
        
        // Quick Tools
        this.setupQuickTools();
    }

    setupDimensionalAnalysis() {
        const inputs = document.querySelectorAll('#fundamentals input[type="text"]');
        const button = document.querySelector('#fundamentals button');
        const result = document.getElementById('pi-groups-result');

        if (button) {
            button.addEventListener('click', () => {
                const values = Array.from(inputs).map(input => input.value.trim()).filter(v => v);
                
                // Enhanced dimensional analysis logic
                if (values.length >= 4) {
                    const variables = values.map(v => v.toLowerCase());
                    let piGroups = [];
                    
                    // Check for common fluid mechanics variables
                    if (variables.includes('ρ') || variables.includes('rho')) {
                        if (variables.includes('u') && variables.includes('l') && variables.includes('μ')) {
                            piGroups.push('Π₁ = ρUL/μ (Reynolds number)');
                        }
                        if (variables.includes('u') && variables.includes('l') && variables.includes('σ')) {
                            piGroups.push('Π₂ = ρU²L/σ (Weber number)');
                        }
                        if (variables.includes('u') && variables.includes('l') && variables.includes('g')) {
                            piGroups.push('Π₃ = U²/(gL) (Froude number)');
                        }
                    }
                    
                    if (piGroups.length > 0) {
                        result.innerHTML = `
                            <div class="text-left">
                                <div class="font-semibold text-green-600 mb-2">Generated Π-Groups:</div>
                                <div class="text-xs space-y-1">
                                    ${piGroups.map(group => `<div>• ${group}</div>`).join('')}
                                </div>
                                <div class="text-xs text-gray-500 mt-2 italic">
                                    Buckingham Π theorem: n - k = ${Math.max(0, values.length - 3)} dimensionless groups
                                </div>
                            </div>
                        `;
                    } else {
                        result.innerHTML = `
                            <div class="text-left">
                                <div class="font-semibold text-blue-600 mb-1">Basic Analysis:</div>
                                <div class="text-xs">
                                    Variables entered: ${values.length}<br>
                                    Expected Π-groups: ${Math.max(0, values.length - 3)}<br>
                                    <em>Enter standard variables (ρ, U, L, μ, σ, g) for detailed analysis</em>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    result.innerHTML = '<div class="text-red-600 text-sm">Please enter at least 4 variables for meaningful dimensional analysis</div>';
                }
            });
        }
    }

    setupMeshQuality() {
        const slider = document.getElementById('yplus-slider');
        const valueDisplay = document.getElementById('yplus-value');
        const errorBar = document.getElementById('error-bar');
        const errorText = document.getElementById('error-text');

        if (slider) {
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                valueDisplay.textContent = value.toFixed(1);

                // Calculate wall function error based on y+ value
                let errorPercent, errorCategory, errorColor;
                
                if (value < 1) {
                    errorPercent = 5;
                    errorCategory = 'Excellent';
                    errorColor = 'bg-green-500';
                } else if (value < 5) {
                    errorPercent = 10;
                    errorCategory = 'Good';
                    errorColor = 'bg-yellow-500';
                } else if (value < 30) {
                    errorPercent = 25;
                    errorCategory = 'Acceptable';
                    errorColor = 'bg-orange-500';
                } else {
                    errorPercent = Math.min(80, 20 + (value - 30) * 2);
                    errorCategory = 'Poor';
                    errorColor = 'bg-red-500';
                }

                errorBar.style.width = `${errorPercent}%`;
                errorBar.className = `h-2 rounded-full transition-all duration-300 ${errorColor}`;
                errorText.textContent = `${errorCategory} (${errorPercent.toFixed(0)}%)`;
            });
        }
    }

    setupQuickTools() {
        const toolButtons = document.querySelectorAll('.bg-white.px-4.py-2');
        toolButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const toolName = e.target.textContent.trim();
                alert(`${toolName} will open in a new panel. Feature coming soon!`);
            });
        });
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('.snap-section');
        
        // Main observer for navigation updates
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    this.updateActiveDot(entry.target.id);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        });

        // Prefetch observer for performance
        const prefetchObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.prefetchSectionContent(entry.target.id);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '200px 0px 200px 0px'
        });

        // Lazy load observer for heavy content
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.lazyLoadContent(entry.target);
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            navObserver.observe(section);
            prefetchObserver.observe(section);
            
            // Mark sections with heavy content for lazy loading
            if (section.dataset.heavyContent) {
                lazyLoadObserver.observe(section);
            }
        });
    }

    prefetchSectionContent(sectionId) {
        // Prefetch next section's content when approaching current section
        const sectionOrder = ['hero', 'fundamentals', 'advanced', 'cfd', 'experimental', 'applications', 'playground', 'resources'];
        const currentIndex = sectionOrder.indexOf(sectionId);
        const nextSection = sectionOrder[currentIndex + 1];
        
        if (nextSection && !this.prefetchedSections?.has(nextSection)) {
            this.prefetchedSections = this.prefetchedSections || new Set();
            this.prefetchedSections.add(nextSection);
            
            // Simulate prefetching module content
            setTimeout(() => {
                const moduleContent = this.getModuleContent(nextSection);
                // Content is now cached in memory
                console.log(`Prefetched content for ${nextSection}`);
            }, 100);
        }
    }

    lazyLoadContent(element) {
        // Lazy load heavy content like simulations, videos, or large datasets
        const lazyElements = element.querySelectorAll('[data-lazy-src]');
        lazyElements.forEach(el => {
            const src = el.dataset.lazySrc;
            if (src) {
                el.src = src;
                el.removeAttribute('data-lazy-src');
                el.classList.add('fade-in');
            }
        });

        // Initialize heavy interactive widgets only when visible
        const heavyWidgets = element.querySelectorAll('[data-heavy-widget]');
        heavyWidgets.forEach(widget => {
            this.initializeHeavyWidget(widget);
        });
    }

    initializeHeavyWidget(widget) {
        const widgetType = widget.dataset.heavyWidget;
        
        switch (widgetType) {
            case 'webgl-simulation':
                this.initWebGLSimulation(widget);
                break;
            case 'piv-demo':
                this.initPIVDemo(widget);
                break;
            case 'cfd-visualizer':
                this.initCFDVisualizer(widget);
                break;
        }
    }

    initWebGLSimulation(container) {
        // Placeholder for WebGL potential flow solver
        container.innerHTML = `
            <div class="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-64 flex items-center justify-center text-white">
                <div class="text-center">
                    <div class="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                    <div>Loading WebGL Simulation...</div>
                </div>
            </div>
        `;
        
        // Simulate loading time
        setTimeout(() => {
            container.innerHTML = `
                <div class="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-64 flex items-center justify-center text-white relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse-slow"></div>
                    <div class="text-center z-10">
                        <div class="text-lg font-semibold mb-2">Interactive Flow Simulation</div>
                        <div class="text-sm opacity-75">Click and drag to add flow sources</div>
                    </div>
                </div>
            `;
        }, 2000);
    }

    initPIVDemo(container) {
        // Placeholder for PIV camera demo
        container.innerHTML = `
            <div class="bg-gray-900 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-red-500/10 animate-pulse-slow"></div>
                <div class="text-white text-center z-10">
                    <div class="text-2xl mb-2">📹</div>
                    <div class="text-sm">30 FPS PIV Analysis</div>
                    <div class="text-xs opacity-75 mt-1">Particle tracking active</div>
                </div>
            </div>
        `;
    }

    initCFDVisualizer(container) {
        // Placeholder for CFD mesh quality visualizer
        container.innerHTML = `
            <div class="bg-white rounded border h-64 flex items-center justify-center relative">
                <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100"></div>
                <div class="text-center z-10">
                    <div class="text-lg font-semibold text-gray-800 mb-2">Mesh Quality Visualizer</div>
                    <div class="text-sm text-gray-600">Interactive 3D mesh analysis</div>
                </div>
            </div>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FluidDynamicsApp();
});

// Service Worker Registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}