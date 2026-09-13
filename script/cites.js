/*
-- THIS BULLSHIT CODE!!! --
*/

const canvas = document.getElementById('retroCanvas');
const ctx = canvas.getContext('2d');

let cityWindows = [];

function initCityWindows() {
    cityWindows = [];
    const buildingsCount = 7;
    
    for (let b = 0; b < buildingsCount; b++) {
        const buildingWins = [];
        const rows = 10;
        const cols = 10;
        
        for (let r = 0; r < rows; r++) {
            const rowWins = [];
            for (let c = 0; c < cols; c++) {
                rowWins.push({
                    active: Math.random() > 0.8,
                    timer: Math.floor(Math.random() * 1200)
                });
            }
            buildingWins.push(rowWins);
        }
        cityWindows.push(buildingWins);
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

function draw() {
    const w = canvas.width;
    const h = canvas.height;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#06020c');
    bgGrad.addColorStop(0.5, '#130826');
    bgGrad.addColorStop(1, '#090412');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * (h * 0.45);
        ctx.fillStyle = (i % 3 === 0) ? '#00f0ff' : '#ffffff';
        ctx.fillRect(Math.floor(sx), Math.floor(sy), 2, 2);
    }

    const sunX = w * 0.68;
    const sunY = h * 0.28;
    const sunRadius = Math.min(w, h) * 0.11;

    const glowGrad = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 2.5);
    glowGrad.addColorStop(0, 'rgba(255, 60, 30, 0.4)');
    glowGrad.addColorStop(0.5, 'rgba(200, 20, 60, 0.15)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    const sunGrad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
    sunGrad.addColorStop(0, '#ff7700');
    sunGrad.addColorStop(0.5, '#ff2233');
    sunGrad.addColorStop(1, '#aa0033');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    drawMountainRange(w, h);

    const valleyY = h * 0.5; 
    const crestY = h * 0.78;

    ctx.strokeStyle = 'rgba(0, 180, 220, 0.25)';
    ctx.lineWidth = 1;
    for (let y = valleyY; y < crestY; y += 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    drawCity(w, valleyY);

    drawRoadWithElevation(w, h, valleyY, crestY);

    drawForegroundObjects(w, h, crestY);
}

function drawMountainRange(w, h) {
    const baseYSky = h * 0.56;
    ctx.strokeStyle = '#8a5cf6';
    ctx.lineWidth = 1.5;

    drawMountainCluster(w * 0, baseYSky, w * 0.3, h * 0.28);
    drawMountainCluster(w * 0.1, baseYSky, w * 0.3, h * 0.35);
    drawMountainCluster(w * 0.56, baseYSky, w * 0.32, h * 0.26);
    drawMountainCluster(w * 0.72, baseYSky, w * 0.35, h * 0.32);
}

function drawMountainCluster(startX, baseY, width, height) {
    const peakX = startX + width * 0.5;
    const peakY = baseY - height;

    ctx.beginPath();
    ctx.moveTo(startX, baseY);
    ctx.lineTo(peakX, peakY);
    ctx.lineTo(startX + width, baseY);
    ctx.stroke();

    const lines = 7;
    for (let i = 1; i <= lines; i++) {
        const ratio = i / lines;
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(startX + width * (0.5 * (1 - ratio)), baseY - height * (1 - ratio) * 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(peakX, peakY);
        ctx.lineTo(peakX + width * 0.5 * ratio, baseY - height * (1 - ratio) * 0.2);
        ctx.stroke();
    }
}

function drawCity(w, valleyY) {
    const centerX = w * 0.48;
    const buildings = [
        { offset: -160, width: 35, height: 60 },
        { offset: -120, width: 45, height: 110 },
        { offset: -70,  width: 55, height: 160 },
        { offset: -10,  width: 65, height: 210 },
        { offset: 60,   width: 70, height: 190 },
        { offset: 135,  width: 40, height: 100 },
        { offset: 180,  width: 35, height: 75 }
    ];

    buildings.forEach((b, bIdx) => {
        const x = centerX + b.offset;
        const y = valleyY - b.height;

        ctx.fillStyle = '#0a0518';
        ctx.fillRect(x, y, b.width, b.height);

        const winsGrid = cityWindows[bIdx] || [];
        const colStep = 8;
        const rowStep = 8;

        let rIdx = 0;
        for (let wy = y + 10; wy < valleyY - 5; wy += rowStep) {
            let cIdx = 0;
            for (let wx = x + 7; wx < x + b.width - 5; wx += colStep) {
                if (winsGrid[rIdx] && winsGrid[rIdx][cIdx]) {
                    const win = winsGrid[rIdx][cIdx];

                    win.timer--;
                    if (win.timer <= 0) {
                        win.active = !win.active;
                        win.timer = Math.floor(Math.random() * 1500) + 900; 
                    }

                    if (win.active) {
                        ctx.fillStyle = '#00f0ff';
                        ctx.fillRect(wx, wy, colStep - 1, rowStep - 2);
                    }
                }
                cIdx++;
            }
            rIdx++;
        }

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, b.width, b.height);

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.lineWidth = 1;

        for (let wx = x + 7; wx < x + b.width; wx += colStep) {
            ctx.beginPath();
            ctx.moveTo(wx, y);
            ctx.lineTo(wx, valleyY);
            ctx.stroke();
        }
        for (let wy = y + 10; wy < valleyY; wy += rowStep) {
            ctx.beginPath();
            ctx.moveTo(x, wy);
            ctx.lineTo(x + b.width, wy);
            ctx.stroke();
        }
    });
}

function drawRoadWithElevation(w, h, valleyY, crestY) {
    const centerX = w * 0.48;
    const bottomY = h;

    const wBottom = w * 0.42;
    const wCrest = w * 0.16;
    const wValley = w * 0.03;

    ctx.fillStyle = '#0d071e';
    ctx.beginPath();
    ctx.moveTo(centerX - wCrest/2, crestY);
    ctx.lineTo(centerX + wCrest/2, crestY);
    ctx.lineTo(centerX + wValley/2, valleyY);
    ctx.lineTo(centerX - wValley/2, valleyY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - wCrest/2, crestY); ctx.lineTo(centerX - wValley/2, valleyY);
    ctx.moveTo(centerX + wCrest/2, crestY); ctx.lineTo(centerX + wValley/2, valleyY);
    ctx.moveTo(centerX, crestY); ctx.lineTo(centerX, valleyY);
    ctx.stroke();

    ctx.fillStyle = '#080314';
    ctx.beginPath();
    ctx.moveTo(centerX - wBottom/2, bottomY);
    ctx.lineTo(centerX + wBottom/2, bottomY);
    ctx.lineTo(centerX + wCrest/2, crestY);
    ctx.lineTo(centerX - wCrest/2, crestY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 220, 255, 0.3)';
    ctx.lineWidth = 1;

    const steps = 14;
    for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const py = crestY + (bottomY - crestY) * Math.pow(progress, 1.8);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(w, py);
        ctx.stroke();
    }

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - wBottom/2, bottomY); ctx.lineTo(centerX - wCrest/2, crestY);
    ctx.moveTo(centerX + wBottom/2, bottomY); ctx.lineTo(centerX + wCrest/2, crestY);
    ctx.stroke();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        const p1 = i / 6;
        const p2 = (i + 0.5) / 6;
        const y1 = bottomY - (bottomY - crestY) * Math.pow(p1, 1.4);
        const y2 = bottomY - (bottomY - crestY) * Math.pow(p2, 1.4);

        ctx.beginPath();
        ctx.moveTo(centerX, y1);
        ctx.lineTo(centerX, y2);
        ctx.stroke();
    }
}

function drawForegroundObjects(w, h, crestY) {
    drawWireRock(w * 0.18, h * 0.85, 45);
    drawWireRock(w * 0.78, h * 0.82, 35);
    drawWireBush(w * 0.26, h * 0.78, 40);
    drawWireBush(w * 0.86, h * 0.79, 35);
}

function drawWireRock(x, y, size) {
    ctx.strokeStyle = '#13ebfa';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x - size * 0.4, y - size * 0.7);
    ctx.lineTo(x + size * 0.5, y - size * 0.8);
    ctx.lineTo(x + size, y - size * 0.2);
    ctx.lineTo(x + size * 0.7, y + size * 0.3);
    ctx.lineTo(x - size * 0.5, y + size * 0.2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - size * 0.4, y - size * 0.7);
    ctx.lineTo(x, y - size * 0.1);
    ctx.lineTo(x + size * 0.7, y + size * 0.3);
    ctx.moveTo(x, y - size * 0.1);
    ctx.lineTo(x - size * 0.5, y + size * 0.2);
    ctx.moveTo(x, y - size * 0.1);
    ctx.lineTo(x + size * 0.5, y - size * 0.8);
    ctx.stroke();
}

function drawWireBush(x, y, height) {
    ctx.strokeStyle = '#9e56f6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - height * 0.4);
    ctx.lineTo(x - height * 0.4, y - height * 0.7);
    ctx.moveTo(x, y - height * 0.4);
    ctx.lineTo(x + height * 0.3, y - height * 0.8);
    ctx.moveTo(x, y - height * 0.2);
    ctx.lineTo(x - height * 0.3, y - height * 0.5);
    ctx.moveTo(x, y - height * 0.2);
    ctx.lineTo(x + height * 0.4, y - height * 0.4);
    ctx.stroke();
}

resize();
initCityWindows();
function animate() {
    draw();
    requestAnimationFrame(animate);
}
animate();