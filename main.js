/* ==========================================================================
   AÏDO Landing Page Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Promo Banner Dismissal
    const promoBanner = document.getElementById('promoBanner');
    const closePromo = document.getElementById('closePromo');
    if (promoBanner && closePromo) {
        closePromo.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }

    // 2. Language Dropdown Toggle
    const langBtn = document.getElementById('langBtn');
    const langSelector = langBtn?.parentElement;
    if (langBtn && langSelector) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langSelector.classList.remove('open');
        });
    }

    // 3. Interactive Chat Category Switcher
    const tabBtns = document.querySelectorAll('#categoryTabs .tab-btn');
    const chatFlows = document.querySelectorAll('#chatMessages .chat-flow');
    
    if (tabBtns.length > 0 && chatFlows.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                tabBtns.forEach(b => b.classList.remove('active'));
                chatFlows.forEach(f => f.classList.remove('active'));
                
                // Add active to current
                btn.classList.add('active');
                const category = btn.getAttribute('data-category');
                const activeFlow = document.getElementById(`flow-${category}`);
                if (activeFlow) {
                    activeFlow.classList.add('active');
                    
                    // Restart animations for messages
                    const messages = activeFlow.querySelectorAll('.message');
                    messages.forEach((msg, idx) => {
                        msg.style.animation = 'none';
                        // Trigger reflow
                        msg.offsetHeight;
                        msg.style.animation = '';
                        msg.style.animationDelay = `${idx * 0.15}s`;
                    });
                }
            });
        });
    }

    // 4. Video Modal Popup
    const playBtn = document.getElementById('playVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.getElementById('closeVideoBtn');
    const modalOverlay = document.getElementById('videoModalOverlay');

    if (playBtn && videoModal) {
        playBtn.addEventListener('click', () => {
            videoModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });

        const hideModal = () => {
            videoModal.classList.remove('open');
            document.body.style.overflow = '';
        };

        if (closeVideo) closeVideo.addEventListener('click', hideModal);
        if (modalOverlay) modalOverlay.addEventListener('click', hideModal);
    }

    // 5. Carousel Data & Functionality for "2 ways to help"
    const carouselData = {
        own: {
            subtitle: "A helping hand, whenever they need it.",
            slides: [
                {
                    num: "01",
                    title: "Stuck on a question?",
                    desc: "They shake AÏDO, read the question out loud, and AÏDO guides them towards the solution step-by-step.",
                    img: "assets/hero_robot.png"
                },
                {
                    num: "02",
                    title: "Step-by-step guidance",
                    desc: "Instead of giving the direct answer, AÏDO breaks down the problem and prompts them to think.",
                    img: "assets/child_notebook.png"
                },
                {
                    num: "03",
                    title: "Positive reinforcement",
                    desc: "AÏDO celebrates their success with encouraging voice prompts and colorful light displays.",
                    img: "assets/bravo_moment.png"
                },
                {
                    num: "04",
                    title: "Focus on the paper",
                    desc: "No screen distractions. Children keep their eyes on their notebook and pencil.",
                    img: "assets/learning_context.png"
                }
            ]
        },
        guided: {
            subtitle: "A joint session, for shared progress.",
            slides: [
                {
                    num: "01",
                    title: "Set goals together",
                    desc: "Establish daily tasks and homework sessions from the parent companion app.",
                    img: "assets/parent_phone.png"
                },
                {
                    num: "02",
                    title: "Real-time insights",
                    desc: "AÏDO lets you know when your child is stuck so you can step in at the right moment.",
                    img: "assets/robot_side_lights.png"
                },
                {
                    num: "03",
                    title: "Mastered concepts",
                    desc: "See what concepts they mastered and where they need a little more practice.",
                    img: "assets/learning_context.png"
                },
                {
                    num: "04",
                    title: "Keep in touch",
                    desc: "Send motivational voice messages directly to your child's AÏDO from your phone.",
                    img: "assets/parent_phone.png"
                }
            ]
        }
    };

    let currentMode = 'own';
    let currentSlideIdx = 0;

    const modeBtns = document.querySelectorAll('#modeSwitch .mode-btn');
    const carouselSubTitle = document.getElementById('carouselSubTitle');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    function renderCarousel() {
        const data = carouselData[currentMode];
        
        // Update Section Subtitle
        if (carouselSubTitle) {
            carouselSubTitle.textContent = data.subtitle;
        }

        // Render Slides
        if (carouselTrack) {
            carouselTrack.innerHTML = '';
            data.slides.forEach((slide, idx) => {
                const slideEl = document.createElement('div');
                slideEl.className = `carousel-slide ${idx === currentSlideIdx ? 'active' : ''}`;
                slideEl.setAttribute('data-slide', idx);
                slideEl.innerHTML = `
                    <div class="slide-num">${slide.num}</div>
                    <h4 class="slide-title">${slide.title}</h4>
                    <p class="slide-desc">${slide.desc}</p>
                    <div class="slide-image-placeholder" style="background-image: url('${slide.img}');"></div>
                `;
                carouselTrack.appendChild(slideEl);
            });
        }

        // Render Dots
        if (carouselDotsContainer) {
            carouselDotsContainer.innerHTML = '';
            data.slides.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.className = `dot ${idx === currentSlideIdx ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    goToSlide(idx);
                });
                carouselDotsContainer.appendChild(dot);
            });
        }
    }

    function goToSlide(idx) {
        const slides = document.querySelectorAll('#carouselTrack .carousel-slide');
        const dots = document.querySelectorAll('#carouselDots .dot');
        
        if (slides.length > 0 && dots.length > 0) {
            slides[currentSlideIdx].classList.remove('active');
            dots[currentSlideIdx].classList.remove('active');

            currentSlideIdx = idx;

            slides[currentSlideIdx].classList.add('active');
            dots[currentSlideIdx].classList.add('active');
        }
    }

    // Next/Prev Events
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const data = carouselData[currentMode];
            let nextIdx = currentSlideIdx + 1;
            if (nextIdx >= data.slides.length) {
                nextIdx = 0; // Wrap around
            }
            goToSlide(nextIdx);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const data = carouselData[currentMode];
            let prevIdx = currentSlideIdx - 1;
            if (prevIdx < 0) {
                prevIdx = data.slides.length - 1; // Wrap around
            }
            goToSlide(prevIdx);
        });
    }

    // Mode Toggle Events
    if (modeBtns.length > 0) {
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentMode = btn.getAttribute('data-mode');
                currentSlideIdx = 0; // Reset index on switch
                renderCarousel();
            });
        });
    }

    // Initial render of Carousel
    renderCarousel();

    // 6. Accordion Functionality for FAQs
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isOpen = item.classList.contains('open');
            
            // Close other items (optional, but clean)
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
