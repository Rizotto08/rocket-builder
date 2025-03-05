const tg = window.Telegram.WebApp;
tg.ready();

let details = 0;
const detailsDisplay = document.getElementById("details");
const clickButton = document.getElementById("clickButton");
const elonText = document.getElementById("elon-text");
const rocket = document.getElementById("rocket");

detailsDisplay.textContent = details;

clickButton.addEventListener("click", () => {
    details += 1;
    detailsDisplay.textContent = details;
    tg.HapticFeedback.impactOccurred("light");

    // Анимация ракеты
    rocket.classList.add("clicked");
    setTimeout(() => rocket.classList.remove("clicked"), 300);

    if (details >= 100) {
        elonText.textContent = "Неплохо, новичок! Двигатель на месте. Теперь залей топливо (0/300)!";
        clickButton.textContent = "Add Fuel!";
        clickButton.disabled = true; // Можно убрать, если хочешь продолжать
    }
});