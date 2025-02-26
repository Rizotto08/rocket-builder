const tg = window.Telegram.WebApp;
tg.ready();

let details = 0;
const detailsDisplay = document.getElementById("details");
const clickButton = document.getElementById("clickButton");
const elonText = document.getElementById("elon-text");

detailsDisplay.textContent = details;

clickButton.addEventListener("click", () => {
    details += 1;
    detailsDisplay.textContent = details;
    tg.HapticFeedback.impactOccurred("light");

    if (details >= 100) {
        elonText.textContent = "Неплохо, новичок! Двигатель на месте. Теперь залей топливо, или эта штука так и останется декорацией.";
        clickButton.disabled = true; // блокируем кнопку до перехода на следующий уровень
        // Здесь можно добавить переход на уровень 2 (позже доработаем)
    }
});