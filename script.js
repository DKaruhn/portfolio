// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            ev.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks?.classList.remove('open');
        }
    });
});

//Intro
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lines = [
        'const dev = "Darren Karuhn";',
        'initPortfolio(dev);'
    ];

    const TYPE_DELAY = prefersReduced ? 0 : 26;
    const LINE_PAUSE = prefersReduced ? 0 : 420;
    const END_PAUSE  = prefersReduced ? 80 : 520;
    const EXIT_DELAY = prefersReduced ? 120 : 600;

    function qs(id){ return document.getElementById(id); }

    function endIntro() {
        const intro = document.getElementById('intro');
        if (!intro) return;
        intro.classList.add('intro--leave');
        document.body.classList.remove('is-intro');
        const onEnd = () => { intro.removeEventListener('transitionend', onEnd); intro.remove(); };
        intro.addEventListener('transitionend', onEnd);
        setTimeout(() => { if (intro && intro.parentNode) intro.remove(); }, 1200); // Fallback
    }

    async function typeLine(el, text){
        for (let i = 0; i < text.length; i++){
            el.textContent += text[i];
            if (TYPE_DELAY) await new Promise(r => setTimeout(r, TYPE_DELAY));
        }
    }

    async function runIntro(){
        const intro = document.getElementById('intro');
        const out   = qs('introType');
        const caret = document.querySelector('.intro__caret');
        if (!intro || !out || !caret) return;

        document.body.classList.add('is-intro');

        for (let li = 0; li < lines.length; li++){
            await typeLine(out, (li ? '\n' : '') + lines[li]);
            if (LINE_PAUSE) await new Promise(r => setTimeout(r, LINE_PAUSE));
        }

        if (END_PAUSE) await new Promise(r => setTimeout(r, END_PAUSE));
        out.classList.add('intro__submit');

        caret.style.animation = 'none';
        // Force reflow to restart animation
        void caret.offsetWidth;
        caret.style.animation = 'caret-blink .35s step-end 6';

        setTimeout(endIntro, EXIT_DELAY);
    }

    window.addEventListener('DOMContentLoaded', () => {
        const intro = document.getElementById('intro');
        if (!intro) return;

        if (prefersReduced) {
            const out = qs('introType');
            out.textContent = lines.join('\n');
            setTimeout(endIntro, 100);
            return;
        }

        runIntro().catch(endIntro);
    });
})();

