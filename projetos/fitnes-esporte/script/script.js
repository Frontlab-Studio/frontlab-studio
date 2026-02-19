// MENU MOBILE
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const closeLinks = document.querySelectorAll('.close-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

closeLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.fade-in, .reveal-left, .reveal-right, .reveal-bottom');
hiddenElements.forEach((el) => observer.observe(el));

// CALCULADORA IMC (FUNCIONAL)
function calculateIMC() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const resultBox = document.getElementById('result');
    const valueText = document.getElementById('imc-value');
    const msgText = document.getElementById('imc-msg');

    if (!height || !weight) {
        alert("Por favor, preencha altura e peso!");
        return;
    }

    // Cálculo IMC: Peso / (Altura * Altura)
    const imc = weight / (height * height);
    const imcFormatted = imc.toFixed(1);

    valueText.innerText = imcFormatted;

    let message = "";
    if (imc < 18.5) {
        message = "Abaixo do peso ideal. Foco em hipertrofia e nutrição.";
    } else if (imc < 24.9) {
        message = "Peso ideal. Foco em performance e definição.";
    } else if (imc < 29.9) {
        message = "Levemente acima. Foco em cardio e força.";
    } else {
        message = "Acima do peso. Vamos transformar isso em força!";
    }

    msgText.innerText = message;
    resultBox.classList.add('active');
}