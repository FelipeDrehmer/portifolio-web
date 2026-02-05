const loadPage = () => {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true,
        multiplier: 1,
        class: 'is-reveal'
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) {
            activeLink.classList.add('active');
            }
        }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => observer.observe(section));

};

document.addEventListener('DOMContentLoaded', () => {
    loadPage();
});
