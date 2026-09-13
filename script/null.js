window.addEventListener('click', (e) => {
    const container = document.getElementById('ripple-container');
    if (!container) return;

    const circle = document.createElement('div');
    circle.classList.add('ripple-circle');
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    circle.addEventListener('animationend', () => {
        circle.remove();
    });

    container.appendChild(circle);
});