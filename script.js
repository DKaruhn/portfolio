const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
        ev.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks?.classList.remove('open');
        }
    });
});

(function () {
    const lines = [
        'const dev = "Darren Karuhn";',
        'initPortfolio(dev);'
    ];

    const TYPE_DELAY = 40;
    const LINE_PAUSE = 400;

    const intro = document.getElementById('intro');
    const out = document.getElementById('introType');
    const caret = document.querySelector('.intro__caret');

    if (!intro || !out) return;

    document.body.classList.add('is-intro');

    async function typeLine(text) {
        for (let i = 0; i < text.length; i++) {
            out.textContent += text[i];
            await new Promise(r => setTimeout(r, TYPE_DELAY));
        }
    }

    async function run() {
        for (let line of lines) {
            out.textContent = "";
            await typeLine(line);
            await new Promise(r => setTimeout(r, LINE_PAUSE));
        }

        caret.style.animation = 'caret-blink 0.8s infinite';
        setTimeout(() => {
            intro.classList.add('intro--leave');
            document.body.classList.remove('is-intro');
            setTimeout(() => intro.remove(), 800);
        }, 600);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('load', run);
    } else {
        intro.style.display = 'none';
        document.body.classList.remove('is-intro');
    }
})();