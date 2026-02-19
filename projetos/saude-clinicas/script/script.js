document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL (Animação High-End)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. LÓGICA DO SIMULADOR CLÍNICO
    const form = document.getElementById('clinical-form');
    const resultBox = document.getElementById('resultado-box');
    const aguaResultado = document.getElementById('agua-resultado');
    const mensagemResultado = document.getElementById('mensagem-resultado');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Captura os dados
        const peso = parseFloat(document.getElementById('peso').value);
        const rotina = document.getElementById('rotina').value;
        const foco = document.getElementById('foco').value;

        // Cálculo de Água: Base de 35ml por kg
        let mlPorKg = 35;
        if (rotina === 'ativo') mlPorKg = 40;
        if (rotina === 'intenso') mlPorKg = 45;

        const litrosAgua = ((peso * mlPorKg) / 1000).toFixed(1);

        // Lógica de recomendação de Protocolo
        let protocolo = "";
        if (foco === 'pele') {
            protocolo = "Recomendamos a avaliação para Soroterapia Antioxidante (Vitamina C + Glutationa) e protocolos de bioestimulação de colágeno, aliados à hidratação rigorosa.";
        } else if (foco === 'energia') {
            protocolo = "Sugerimos um Check-up Metabólico focado em deficiências vitamínicas (B12, D3) e modulação hormonal. Ideal para combater fadiga crônica.";
        } else if (foco === 'peso') {
            protocolo = "Indicamos o acompanhamento de Nutrologia Esportiva com exame de Bioimpedância para adequação de composição corporal e emagrecimento saudável.";
        }

        // Simula carregamento do sistema médico
        const btnSubmit = form.querySelector('button');
        const textoOriginalBtn = btnSubmit.innerText;
        btnSubmit.innerText = "Analisando Perfil...";
        btnSubmit.style.opacity = "0.7";

        setTimeout(() => {
            // Transição UI
            form.style.display = 'none';
            resultBox.classList.remove('resultado-hidden');

            // Exibe resultado
            aguaResultado.innerText = litrosAgua;
            mensagemResultado.innerText = protocolo;

        }, 1500); // 1.5s de loading para gerar valor percebido
    });
});