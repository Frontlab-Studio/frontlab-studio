document.addEventListener("DOMContentLoaded", () => {
    // Lógica da Intro
    const intro = document.getElementById('ai-intro');
    const hub = document.getElementById('hub-main');

    // Simula o tempo de "decodificação" (2.5 segundos)
    setTimeout(() => {
        intro.style.opacity = '0';

        // Remove a div da intro do DOM para limpar memória
        setTimeout(() => {
            intro.remove();
            hub.classList.remove('hub-hidden');
        }, 1000); // Tempo da transição de opacidade

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
            // Verifica qual botão foi clicado para definir a direção
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
            // O cascata de delay para a animação não acontecer toda de uma vez
            slice.style.transitionDelay = `${i * 0.05}s`;
            overlay.appendChild(slice);

            // Dispara a animação puxando a fatia para dentro da tela
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

        // Aguarda a transição terminar antes de mudar de página
        setTimeout(() => {
            window.location.href = url;
        }, 1300);
    }
    // --- SEÇÃO 2: MANIFESTO (KINETIC TYPOGRAPHY E TERMINAL) ---

    const kLeft = document.querySelector('.k-left .k-text');
    const kRight = document.querySelector('.k-right .k-text');

    // Efeito Cinético: Move os textos horizontalmente no scroll da página
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        // O multiplicador 0.05 garante aquele movimento suave e legível
        if (kLeft) kLeft.style.transform = `translateX(${scrollY * -0.05}px)`;
        if (kRight) kRight.style.transform = `translateX(${scrollY * 0.05}px)`;
    });

    // Efeito Terminal (Máquina de Escrever)
    const terminalText = "Nós somos a cura. Código puro. Performance extrema. Design que converte.";
    const typewriterElement = document.getElementById('typewriter-manifesto');
    let isTypingStarted = false;

    function typeWriter(text, i) {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            // Randomização de milissegundos para simular o ritmo de uma pessoa digitando
            setTimeout(() => {
                typeWriter(text, i + 1);
            }, Math.random() * 50 + 30);
        }
    }

    // Otimização: Só inicia a animação quando a seção aparece na tela
    const observerManifesto = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTypingStarted) {
                isTypingStarted = true;
                typeWriter(terminalText, 0);
            }
        });
    }, { threshold: 0.5 }); // O disparo acontece quando 50% do bloco entra no viewport

    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
        observerManifesto.observe(manifestoSection);
    }
    // --- SEÇÃO 3: ACELERADOR PAGESPEED ---

    const speedCounter = document.getElementById('speed-counter');
    let counterStarted = false;

    // Função de animação com física de desaceleração (EaseOut)
    function animateCounter(targetElement, targetValue, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Curva matemática: Rápido no início, freia no final
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            targetElement.innerText = Math.floor(easeOut * targetValue);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                targetElement.innerText = targetValue; // Garante que termine em 100 cravado
            }
        };
        window.requestAnimationFrame(step);
    }

    // Dispara apenas quando o núcleo estiver visível na tela
    const observerMachine = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // threshold 0.6 significa que 60% da seção precisa estar na tela
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                animateCounter(speedCounter, 100, 2500); // Demora 2.5 segundos para chegar no 100
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
            // Pega as dimensões e posição do cartão na tela
            const rect = tiltCard.getBoundingClientRect();

            // Posição do mouse relativa ao canto superior esquerdo do cartão
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Atualiza as variáveis CSS para o efeito Spotlight seguir o mouse
            tiltCard.style.setProperty('--mouse-x', `${x}px`);
            tiltCard.style.setProperty('--mouse-y', `${y}px`);

            // Calcula a rotação 3D (multiplicador 15 define a intensidade da inclinação)
            // Valores divididos por rect.width e height normalizam entre -0.5 e 0.5
            const rotateX = ((y / rect.height) - 0.5) * -15;
            const rotateY = ((x / rect.width) - 0.5) * 15;

            // Aplica a transformação com um leve "lift" (scale 1.02)
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Quando o mouse sai, o cartão volta suavemente para a posição original
        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
    // --- SEÇÃO 5: TERMINAL DE BOOT (FOOTER) ---

const bootSequenceDiv = document.getElementById('boot-sequence');
const terminalCommands = document.getElementById('terminal-commands');
let bootStarted = false;

// Array com os falsos logs de inicialização do sistema
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
        // Cria o delay matemático para parecer um sistema processando
        delay += Math.random() * 200 + 100; 
        
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = log;
            bootSequenceDiv.appendChild(p);
            
            // Quando terminar o último log, revela os botões de comando
            if (index === bootLogs.length - 1) {
                setTimeout(() => {
                    terminalCommands.classList.remove('hidden-cmd');
                    terminalCommands.classList.add('show-cmd');
                }, 500);
            }
        }, delay);
    });
}

// Observer para o rodapé
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

