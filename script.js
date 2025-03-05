const tg = window.Telegram.WebApp;
tg.ready();

let details = 0;
let fuel = 0;
const detailsDisplay = document.getElementById("details");
const clickButton = document.getElementById("clickButton");
const elonText = document.getElementById("elon-text");
const rocket = document.getElementById("rocket");

detailsDisplay.textContent = `${details}/100`; // Изначально показываем детали

clickButton.addEventListener("click", () => {
    if (details < 100) {
        details += 1;
        detailsDisplay.textContent = `${details}/100`;
        tg.HapticFeedback.impactOccurred("light");

        // Анимация ракеты
        rocket.classList.add("clicked");
        setTimeout(() => rocket.classList.remove("clicked"), 300);

        if (details >= 100) {
            elonText.textContent = "Неплохо, новичок! Двигатель на месте. Теперь залей топливо (0/300)!";
            clickButton.textContent = "Add Fuel!";
            detailsDisplay.textContent = `${fuel}/300`; // Переключаем на топливо
        }
    } else {
        fuel += 1;
        detailsDisplay.textContent = `${fuel}/300`;
        tg.HapticFeedback.impactOccurred("light");

        rocket.classList.add("clicked");
        setTimeout(() => rocket.classList.remove("clicked"), 300);

        if (fuel >= 300) {
            elonText.textContent = "Топливо готово! Готов к тестовому полёту?";
            clickButton.textContent = "Launch!";
            clickButton.disabled = true; // Можно убрать, если хочешь добавить запуск
        }
    }
});