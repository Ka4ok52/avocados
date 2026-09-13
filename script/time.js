function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    document.getElementById('main-time').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('ms-time').textContent = `.${milliseconds}`;

    requestAnimationFrame(updateClock);
}

function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    document.getElementById('date-time').textContent = `${day}/${month}/${year}`;
}

function updateTheme() {
    const now = new Date();

    const secondsPassed = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    const totalSecondsInDay = 86400;

    const dayProgress = (secondsPassed / totalSecondsInDay) * 5;

    document.body.style.backgroundPosition = `0% ${dayProgress}%`;

    const hours = now.getHours();
    if (hours >= 7 && hours < 17) {
        document.body.style.color = '#0e0d17';
    } else {
        document.body.style.color = '#ffffff';
    }
}

requestAnimationFrame(updateClock);
setInterval(updateDate, 3600000);
updateDate();
setInterval(updateTheme, 1000);
updateTheme();
