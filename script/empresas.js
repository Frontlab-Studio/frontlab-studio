document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const goodSide = document.getElementById("good-side");
    const sliderButton = document.getElementById("slider-button");

    slider.addEventListener("input", (e) => {
        const sliderPos = e.target.value;
        goodSide.style.clipPath = `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`;
        sliderButton.style.left = `${sliderPos}%`;
    });
});
