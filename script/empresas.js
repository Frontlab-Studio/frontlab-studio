document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const goodSide = document.getElementById("good-side");
    const sliderButton = document.getElementById("slider-button");

    // Efeito do Raio-X
    slider.addEventListener("input", (e) => {
        const sliderPos = e.target.value;
        // Atualiza a máscara da imagem verde
        goodSide.style.clipPath = `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`;
        // Move o botão branco junto com o dedo
        sliderButton.style.left = `${sliderPos}%`;
    });
});