document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // --- PRE-LOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
        initAnimations(); 
        initSkills(); // Initialize the new skills section
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // --- GSAP ADVANCED ANIMATIONS ---
    function initAnimations() {
        const heroTl = gsap.timeline({
            defaults: { duration: 1.2, ease: "power3.out" },
            onComplete: () => {
                if (document.getElementById('hero-dynamic-title')) {
                    new Typed('#hero-dynamic-title', {
                        strings: ["FULL STACK DEVELOPER", "C & C++ PROGRAMMER", "DSA PROBLEM SOLVER"],
                        typeSpeed: 60,
                        backSpeed: 30,
                        backDelay: 2000,
                        loop: true
                    });
                }
            }
        });

        heroTl.fromTo('.gradient-blob', { scale: 0 }, { scale: 1, duration: 2, ease: 'elastic.out(1, 0.5)' }, 0)
              .fromTo('.hero-main-title', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0 }, 0.5)
              .fromTo('.hero-subtitle', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 0.8)
              .fromTo('.hero-main-description', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, 1.0)
              .fromTo('.hero-buttons .btn', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.15 }, 1.2);

        const sections = gsap.utils.toArray('main > section');
        sections.forEach(section => {
            if (section.id === 'hero') return;
            
            gsap.fromTo(section, { autoAlpha: 0, y: 50 }, {
                autoAlpha: 1, y: 0, duration: 1,
                scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
            });
        });

        const timelineItems = gsap.utils.toArray('.timeline-item');
        timelineItems.forEach(item => {
            const isOdd = timelineItems.indexOf(item) % 2 === 0;
            gsap.fromTo(item, { autoAlpha: 0, x: isOdd ? -100 : 100 }, {
                autoAlpha: 1, x: 0, duration: 0.8,
                scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
            });
        });
    }

    // --- PROJECT FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.tech.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // =================== NEW: SKILLS INTERACTION LOGIC ===================
    function initSkills() {
        const skillData = {
            react: { icon: 'fa-brands fa-react', title: 'React.js', proficiency: 90, description: 'Building dynamic, responsive, and component-based user interfaces for scalable web applications.' },
            js: { icon: 'fa-brands fa-js', title: 'JavaScript (ES6+)', proficiency: 95, description: 'Utilizing modern features like async/await, modules, and new syntax to write clean and efficient client-side logic.' },
            html5: { icon: 'fa-brands fa-html5', title: 'HTML5', proficiency: 98, description: 'Crafting semantic, accessible, and well-structured web pages is the foundation of everything I build.' },
            css3: { icon: 'fa-brands fa-css3-alt', title: 'CSS3', proficiency: 90, description: 'Styling with modern CSS, including Flexbox, Grid, custom properties, and animations for beautiful layouts.' },
            gsap: { icon: 'fa-solid fa-star', title: 'GSAP', proficiency: 80, description: 'Leveraging the GreenSock Animation Platform to create high-performance, complex animations and interactive experiences.' },
            node: { icon: 'fa-brands fa-node-js', title: 'Node.js', proficiency: 85, description: 'Developing fast and scalable server-side applications, creating RESTful APIs with the Express.js framework.' },
            express: { icon: 'fa-solid fa-server', title: 'Express.js', proficiency: 88, description: 'My go-to framework for building robust APIs and handling server logic efficiently within the Node.js ecosystem.' },
            mongodb: { icon: 'fa-solid fa-database', title: 'MongoDB', proficiency: 85, description: 'Working with NoSQL databases to store and manage data flexibly and at scale for full-stack applications.' },
            cpp: { icon: 'fa-solid fa-code', title: 'C++', proficiency: 95, description: 'My language of choice for competitive programming, honing my skills in algorithms, data structures, and performance optimization.' },
            dsa: { icon: 'fa-solid fa-sitemap', title: 'Data Structures & Algorithms', proficiency: 90, description: 'A strong theoretical and practical foundation is key to my problem-solving approach in all areas of development.' },
            git: { icon: 'fa-brands fa-git-alt', title: 'Git & GitHub', proficiency: 95, description: 'Using Git for version control in projects of all sizes, from solo work to collaborative team environments.' },
            vscode: { icon: 'fa-solid fa-laptop-code', title: 'VS Code', proficiency: 98, description: 'My primary code editor, customized with extensions and settings for maximum development productivity.' },
        };

        const skillItems = document.querySelectorAll('.skill-item');
        const detailsPanel = document.getElementById('skill-details-content');

        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                // Active state management
                skillItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const skillKey = item.dataset.skill;
                const data = skillData[skillKey];

                if (data) {
                    detailsPanel.innerHTML = `
                        <i class="fa-solid ${data.icon}"></i>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <span class="proficiency-label">Proficiency:</span>
                        <div class="proficiency-bar-bg">
                            <div class="proficiency-bar" style="width: 0%;"></div>
                        </div>
                    `;
                    // Animate the proficiency bar
                    setTimeout(() => {
                        const bar = detailsPanel.querySelector('.proficiency-bar');
                        if (bar) {
                            bar.style.width = `${data.proficiency}%`;
                        }
                    }, 100);

                    // Add fade-in animation
                    detailsPanel.classList.remove('animate-in');
                    void detailsPanel.offsetWidth; // Trigger reflow
                    detailsPanel.classList.add('animate-in');
                }
            });
        });
    }

    // --- MOBILE NAVIGATION TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && hamburger && navOverlay) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- ACTIVE LINK HIGHLIGHTING ON SCROLL ---
    const navLinksList = document.querySelectorAll('nav .nav-links a');
    const allSections = document.querySelectorAll('main > section');
    if (navLinksList.length > 0 && allSections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = 'hero';
            allSections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) { 
                    current = section.getAttribute('id');
                }
            });
            navLinksList.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').substring(1) === current) {
                    a.classList.add('active');
                }
            });
        });
    }

    // --- AUTO-UPDATE FOOTER YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});