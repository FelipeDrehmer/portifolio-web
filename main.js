const loadPage = () => {

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smoothMobile: false, 
        multiplier: 1,
        lerp: 0.1, 
    });

    // ========== ANIMAÇÕES DE ENTRADA (GSAP) ==========
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(".inicio-decoration-square", { opacity: 0, scale: 0, rotation: -90 });
    gsap.set(".inicio-main-container", { opacity: 0, y: 50 });
    gsap.set(".inicio-scroll-arrow", { opacity: 0, y: -20 });
    gsap.set(".inicio-text-detail", { opacity: 0, y: 30 });

    tl.to(".inicio-decoration-square", { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.8 
    })
    .to(".inicio-main-container", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8 
    }, "-=0.4") 
    .to(".inicio-scroll-arrow", { 
        opacity: 1, 
        y: 0, 
        duration: 0.5 
    }, "-=0.3")
    .to(".inicio-text-detail", { 
        opacity: 1, 
        y: 0, 
        duration: 0.6 
    }, "-=0.3");

    // ========== FIM DAS ANIMAÇÕES ==========

    // Botão Ver Projetos
    const btnProjetos = document.getElementById('btn-projetos');
    if (btnProjetos) {
        btnProjetos.addEventListener('click', () => {
            const projetosSection = document.querySelector('#projetos');
            if (projetosSection) {
                scroll.scrollTo(projetosSection);
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scroll.scrollTo(targetSection);
            }
        });
    });

    scroll.on('scroll', (args) => {
        const scrollY = args.scroll.y;
        const windowHeight = window.innerHeight;

        // ========== ESCONDER/MOSTRAR HEADER ==========
        const header = document.querySelector('header');
        const scrollThreshold = 100; // Só começa a esconder após 100px
        
        if (scrollY > lastScrollY && scrollY > scrollThreshold) {
            // Scroll para baixo - esconde
            header.classList.add('header-hidden');
        } else {
            // Scroll para cima - mostra
            header.classList.remove('header-hidden');
        }
        lastScrollY = scrollY;

        // ========== NAVEGACAO ATIVA ==========
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop - windowHeight / 2 && 
                scrollY < sectionTop + sectionHeight - windowHeight / 2) {
                
                navLinks.forEach(link => link.classList.remove('active'));
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    window.addEventListener('load', () => {
        scroll.update();
    });

    window.addEventListener('resize', () => {
        scroll.update();
    });

    // ========== MODAL ==========
    const modalButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    // Abrir modal
    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar modal pelo botão X
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar modal clicando fora
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

};

document.addEventListener('DOMContentLoaded', () => {
    loadPage();
});
