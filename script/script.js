document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById('ai-intro');
    const hub = document.getElementById('hub-main');

    setTimeout(() => {
        intro.style.opacity = '0';

        setTimeout(() => {
            intro.remove();
            hub.classList.remove('hub-hidden');
        }, 1000);

    }, 2500);

    // --- SCRIPT DO CANVAS (Básico para o fundo, você pode usar o seu existente) ---
    const canvas = document.getElementById('tech-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
document.addEventListener("DOMContentLoaded", () => {

    const portals = document.querySelectorAll('.portal');

    portals.forEach(portal => {
        portal.addEventListener('click', function (e) {
            e.preventDefault();

            const targetUrl = this.getAttribute('href');
            const isB2B = this.classList.contains('b2b-portal');

            executeMirrorTransition(isB2B, targetUrl);
        });
    });

    function executeMirrorTransition(isB2B, url) {
        const overlay = document.createElement('div');
        overlay.classList.add('transition-overlay');
        document.body.appendChild(overlay);

        const numberOfSlices = 10;
        const directionClass = isB2B ? 'slice-left' : 'slice-right';

        for (let i = 0; i < numberOfSlices; i++) {
            let slice = document.createElement('div');
            slice.classList.add('neural-slice', directionClass);
            slice.style.top = `${i * 10}vh`;
            slice.style.transitionDelay = `${i * 0.05}s`;
            overlay.appendChild(slice);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (isB2B) {
                        slice.style.left = '-10%';
                    } else {
                        slice.style.right = '-10%';
                    }
                });
            });
        }

        setTimeout(() => {
            window.location.href = url;
        }, 1300);
    }
    // --- SEÇÃO 2: MANIFESTO (KINETIC TYPOGRAPHY E TERMINAL) ---

    const kLeft = document.querySelector('.k-left .k-text');
    const kRight = document.querySelector('.k-right .k-text');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        if (kLeft) kLeft.style.transform = `translateX(${scrollY * -0.05}px)`;
        if (kRight) kRight.style.transform = `translateX(${scrollY * 0.05}px)`;
    });

    const terminalText = "Nós somos a cura. Código puro. Performance extrema. Design que converte.";
    const typewriterElement = document.getElementById('typewriter-manifesto');
    let isTypingStarted = false;

    function typeWriter(text, i) {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            setTimeout(() => {
                typeWriter(text, i + 1);
            }, Math.random() * 50 + 30);
        }
    }

    const observerManifesto = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTypingStarted) {
                isTypingStarted = true;
                typeWriter(terminalText, 0);
            }
        });
    }, { threshold: 0.5 });

    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
        observerManifesto.observe(manifestoSection);
    }
    // --- SEÇÃO 3: ACELERADOR PAGESPEED ---

    const speedCounter = document.getElementById('speed-counter');
    let counterStarted = false;

    function animateCounter(targetElement, targetValue, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            targetElement.innerText = Math.floor(easeOut * targetValue);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                targetElement.innerText = targetValue;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Dispara apenas quando o núcleo estiver visível na tela
    const observerMachine = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                animateCounter(speedCounter, 100, 2500);
            }
        });
    }, { threshold: 0.6 });

    const machineSection = document.getElementById('maquinas');
    if (machineSection) {
        observerMachine.observe(machineSection);
    }
    // --- SEÇÃO 4: O ARQUITETO (3D TILT E SPOTLIGHT) ---

    const tiltCard = document.getElementById('tilt-card');

    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            tiltCard.style.setProperty('--mouse-x', `${x}px`);
            tiltCard.style.setProperty('--mouse-y', `${y}px`);

            const rotateX = ((y / rect.height) - 0.5) * -15;
            const rotateY = ((x / rect.width) - 0.5) * 15;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
    // --- SEÇÃO 5: TERMINAL DE BOOT (FOOTER) ---

const bootSequenceDiv = document.getElementById('boot-sequence');
const terminalCommands = document.getElementById('terminal-commands');
let bootStarted = false;

const bootLogs = [
    "[ OK ] Carregando Core do Frontlab Studio...",
    "[ OK ] Desativando bloqueadores de performance...",
    "[ OK ] Purgando templates de terceiros...",
    "[ OK ] Inicializando Engine de Conversão Extrema...",
    "[ OK ] Otimização PageSpeed alcançada: 100/100.",
    "[ OK ] Protocolos de segurança injetados.",
    "Buscando rotas de conexão disponíveis..."
];

function runBootSequence() {
    let delay = 0;
    
    bootLogs.forEach((log, index) => {
        delay += Math.random() * 200 + 100; 
        
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = log;
            bootSequenceDiv.appendChild(p);
            
            if (index === bootLogs.length - 1) {
                setTimeout(() => {
                    terminalCommands.classList.remove('hidden-cmd');
                    terminalCommands.classList.add('show-cmd');
                }, 500);
            }
        }, delay);
    });
}

const observerTerminal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !bootStarted) {
            bootStarted = true;
            runBootSequence();
        }
    });
}, { threshold: 0.3 });

const terminalFooter = document.getElementById('terminal-footer');
if (terminalFooter) {
    observerTerminal.observe(terminalFooter);
}
});
