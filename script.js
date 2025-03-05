const tg = window.Telegram.WebApp;
tg.ready();

let details = 0;
let fuel = 0;
const detailsDisplay = document.getElementById("details");
const progressBar = document.getElementById("progressBar");
const clickButton = document.getElementById("clickButton");
const elonText = document.getElementById("elon-text");
const rocket = document.getElementById("rocket");
const fuelSound = document.getElementById("fuelSound");

detailsDisplay.textContent = `${details}/100`;
progressBar.max = 100;
progressBar.value = details;

clickButton.addEventListener("click", () => {
    if (details < 100) {
        details += 1;
        detailsDisplay.textContent = `${details}/100`;
        progressBar.value = details;
        tg.HapticFeedback.impactOccurred("light");

        rocket.classList.add("clicked");
        setTimeout(() => rocket.classList.remove("clicked"), 300);

        if (details >= 100) {
            elonText.textContent = "Неплохо, новичок! Двигатель на месте. Теперь залей топливо (0/300)!";
            clickButton.textContent = "Add Fuel!";
            detailsDisplay.textContent = `${fuel}/300`;
            detailsDisplay.classList.remove("details-stage");
            detailsDisplay.classList.add("fuel-stage");
            progressBar.max = 300;
            progressBar.value = fuel;
        }
    } else {
        fuel += 1;
        detailsDisplay.textContent = `${fuel}/300`;
        progressBar.value = fuel;
        tg.HapticFeedback.impactOccurred("light");

        rocket.classList.add("clicked");
        setTimeout(() => rocket.classList.remove("clicked"), 300);

        if (fuelSound) fuelSound.play(); // Воспроизведение звука

        if (fuel >= 300) {
            elonText.textContent = "Топливо готово! Готов к тестовому полёту?";
            clickButton.textContent = "Launch!";
            clickButton.disabled = true;
            rocket.src = "rocket_launch.png"; // Замена на изображение взлёта
            rocket.classList.add("launch");
            setTimeout(() => {
                rocket.style.display = "none"; // Скрываем после анимации
                elonText.textContent = "Поздравляю! Ты запустил ракету!";
            }, 1000);
        }
    }
});