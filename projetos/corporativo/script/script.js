document.addEventListener('DOMContentLoaded', () => {

    // MENU MOBILE
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // WHATSAPP REDIRECT (OPÇÃO 1)
    const form = document.getElementById('form-whatsapp');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const numeroDestino = "5511999999999"; // Troque pelo número do cliente

        const mensagem = `*SOLICITAÇÃO DE CONSULTORIA*%0A%0A` +
            `*Nome:* ${nome}%0A` +
            `*Contato:* ${telefone}%0A%0A` +
            `Olá, gostaria de agendar uma consultoria privada com o Dr. Henrique.`;

        const url = `https://wa.me/${numeroDestino}?text=${mensagem}`;
        window.open(url, '_blank');
    });

    // HEADER SCROLL EFFECT
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = "rgba(245, 245, 240, 0.95)";
            header.style.padding = "15px 0";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
        } else {
            header.style.background = "transparent";
            header.style.padding = "30px 0";
            header.style.boxShadow = "none";
        }
    });
});