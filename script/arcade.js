// Web Audio API Synthesizer for Authentic 1978 Sound FX
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.marchFreqs = [160, 140, 125, 110];
        this.marchIndex = 0;
    }
    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }
    playShoot() {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(900, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }
    playMarchStep() {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        const freq = this.marchFreqs[this.marchIndex];
        this.marchIndex = (this.marchIndex + 1) % 4;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }
    playInvaderExplode() {
        if (this.muted || !this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }
    playPlayerExplode() {
        if (this.muted || !this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.6;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }
    playUfoSound() {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(500, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }
}
const audio = new SoundSynth();
const SPRITES = {
    // Squid (Row 0 - Top 10 Points) - 8x8
    squid: [
        [
            "00011000",
            "00111100",
            "01111110",
            "11011011",
            "11111111",
            "00100100",
            "01011010",
            "10100101"
        ],
        [
            "00011000",
            "00111100",
            "01111110",
            "11011011",
            "11111111",
            "01011010",
            "10000001",
            "01000010"
        ]
    ],
    // Crab (Rows 1 & 2 - Middle 20 Points) - 11x8
    crab: [
        [
            "00100000100",
            "00010001000",
            "00111111100",
            "01101110110",
            "11111111111",
            "10111111101",
            "10100000101",
            "00011011000"
        ],
        [
            "00100000100",
            "10010001001",
            "10111111101",
            "11101110111",
            "11111111111",
            "01111111110",
            "00100000100",
            "01000000010"
        ]
    ],
    // Octopus (Rows 3 & 4 - Bottom 30 Points) - 12x8
    octopus: [
        [
            "000011110000",
            "011111111110",
            "111111111111",
            "111001100111",
            "111111111111",
            "000110011000",
            "001101101100",
            "110000000011"
        ],
        [
            "000011110000",
            "011111111110",
            "111111111111",
            "111001100111",
            "111111111111",
            "001100110000",
            "011001100110",
            "001100001100"
        ]
    ],
    // UFO (Mystery Bonus Ship) - 16x7
    ufo: [
        "0000011111100000",
        "0001111111111000",
        "0011111111111100",
        "0110110110110110",
        "1111111111111111",
        "0001110001110000",
        "0000100000100000"
    ],
    // Player Cannon - 13x8
    player: [
        "0000001000000",
        "0000011100000",
        "0000011100000",
        "0111111111110",
        "1111111111111",
        "1111111111111",
        "1111111111111",
        "1111111111111"
    ],
    // Alien Explosion Sprite - 13x8
    explosion: [
        "0000100010000",
        "0100010100010",
        "0010000000100",
        "0001000001000",
        "0000000000000",
        "0001000001000",
        "0010010100100",
        "0100100010010"
    ]
};
// Bunker Shield Template (22x16 pixel block grid)
const SHIELD_TEMPLATE = [
    "0001111111111111111000",
    "0011111111111111111100",
    "0111111111111111111110",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111111111111111111",
    "1111111000000001111111",
    "1111110000000000111111",
    "1111110000000000111111",
    "1111110000000000111111",
    "1111110000000000111111"
];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = 224;
const GAME_HEIGHT = 256;
let score = 0;
let highScore = parseInt(localStorage.getItem('space_invaders_hi') || '0', 10);
let lives = 3;
let credits = 0;
let gameOver = false;
let gameStarted = false;
const player = {
    x: 28,
    y: 216,
    width: 13,
    height: 8,
    speed: 1,
    movingLeft: false,
    movingRight: false,
    isExploding: false,
    explodeTimer: 0
};
let playerBullet = null;
let alienBullets = [];
let ufo = null;
let ufoTimer = 0;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 11;
let aliens = [];
let alienAnimFrame = 0;
let alienDirection = 1; // 1 = Right, -1 = Left
let alienStepTimer = 0;
let alienStepInterval = 50;
let alienExplosions = [];
let shields = [];
function drawSprite(spriteArray, startX, startY, color = '#ffffff') {
    ctx.fillStyle = color;
    for (let r = 0; r < spriteArray.length; r++) {
        for (let c = 0; c < spriteArray[r].length; c++) {
            if (spriteArray[r][c] === '1') {
                ctx.fillRect(Math.floor(startX + c), Math.floor(startY + r), 1, 1);
            }
        }
    }
}
function initShields() {
    shields = [];
    const shieldPositions = [32, 76, 120, 164];
    shieldPositions.forEach(sx => {
        const grid = [];
        for (let r = 0; r < SHIELD_TEMPLATE.length; r++) {
            const row = [];
            for (let c = 0; c < SHIELD_TEMPLATE[r].length; c++) {
                row.push(SHIELD_TEMPLATE[r][c] === '1' ? 1 : 0);
            }
            grid.push(row);
        }
        shields.push({ x: sx, y: 192, grid: grid });
    });
}
function initAliens() {
    aliens = [];
    const startX = 24;
    const startY = 64;
    const spacingX = 16;
    const spacingY = 14;
    for (let r = 0; r < ALIEN_ROWS; r++) {
        for (let c = 0; c < ALIEN_COLS; c++) {
            let type = 'octopus';
            let pts = 10;
            if (r === 0) {
                type = 'squid';
                pts = 30;
            } else if (r === 1 || r === 2) {
                type = 'crab';
                pts = 20;
            } else {
                type = 'octopus';
                pts = 10;
            }
            aliens.push({
                x: startX + c * spacingX,
                y: startY + r * spacingY,
                type: type,
                row: r,
                col: c,
                points: pts,
                alive: true,
                width: type === 'squid' ? 8 : (type === 'crab' ? 11 : 12),
                height: 8
            });
        }
    }
    alienStepInterval = 45;
}
function resetGame() {
    score = 0;
    lives = 3;
    gameOver = false;
    gameStarted = true;
    playerBullet = null;
    alienBullets = [];
    ufo = null;
    player.x = 28;
    player.isExploding = false;
    initAliens();
    initShields();
}
window.addEventListener('keydown', (e) => {
    audio.init();

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.movingLeft = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.movingRight = true;
    }

    if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'ArrowUp') {
        e.preventDefault();

        if (!gameStarted || gameOver) {
            resetGame();
        } else {
            firePlayerBullet();
        }
    }
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') player.movingLeft = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') player.movingRight = false;
});
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnFire = document.getElementById('btn-fire');

if (btnLeft) {
    btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); audio.init(); player.movingLeft = true; });
    btnLeft.addEventListener('touchend', () => player.movingLeft = false);
    btnLeft.addEventListener('mousedown', () => { audio.init(); player.movingLeft = true; });
    btnLeft.addEventListener('mouseup', () => player.movingLeft = false);
}

if (btnRight) {
    btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); audio.init(); player.movingRight = true; });
    btnRight.addEventListener('touchend', () => player.movingRight = false);
    btnRight.addEventListener('mousedown', () => { audio.init(); player.movingRight = true; });
    btnRight.addEventListener('mouseup', () => player.movingRight = false);
}

if (btnFire) {
    const handleFire = (e) => {
        if (e) e.preventDefault();
        audio.init();
        if (!gameStarted || gameOver) {
            resetGame();
        } else {
            firePlayerBullet();
        }
    };
    btnFire.addEventListener('touchstart', handleFire);
    btnFire.addEventListener('click', handleFire);
}
function firePlayerBullet() {
    if (gameOver || player.isExploding) return;
    // Max 1 player bullet allowed on screen at once
    if (!playerBullet) {
        playerBullet = {
            x: Math.floor(player.x + player.width / 2),
            y: player.y - 4,
            width: 1,
            height: 4
        };
        audio.playShoot();
    }
}
function updateShieldCollision(bx, by, isPlayerBullet = false) {
    for (let s = 0; s < shields.length; s++) {
        const sh = shields[s];
        // Check bounding box
        if (bx >= sh.x && bx < sh.x + 22 && by >= sh.y && by < sh.y + 16) {
            const col = Math.floor(bx - sh.x);
            const row = Math.floor(by - sh.y);
            if (sh.grid[row] && sh.grid[row][col] === 1) {
                // Destroy bunker pixels in blast radius
                const radius = isPlayerBullet ? 2 : 2;
                for (let dr = -radius; dr <= radius; dr++) {
                    for (let dc = -radius; dc <= radius; dc++) {
                        const nr = row + dr;
                        const nc = col + dc;
                        if (nr >= 0 && nr < 16 && nc >= 0 && nc < 22) {
                            if (Math.random() > 0.3) sh.grid[nr][nc] = 0;
                        }
                    }
                }
                return true;
            }
        }
    }
    return false;
}
function updateAliens() {
    const aliveAliens = aliens.filter(a => a.alive);
    if (aliveAliens.length === 0) {
        initAliens();
        return;
    }
    alienStepTimer++;
    const currentInterval = Math.max(2, Math.floor(alienStepInterval * (aliveAliens.length / 55)));
    if (alienStepTimer >= currentInterval) {
        alienStepTimer = 0;
        alienAnimFrame = (alienAnimFrame === 0) ? 1 : 0;
        audio.playMarchStep();
        let touchEdge = false;
        aliveAliens.forEach(a => {
            if ((alienDirection === 1 && a.x + a.width >= GAME_WIDTH - 8) ||
                (alienDirection === -1 && a.x <= 8)) {
                touchEdge = true;
            }
        });
        if (touchEdge) {
            alienDirection *= -1;
            aliveAliens.forEach(a => {
                a.y += 8;
                if (a.y + a.height >= player.y) {
                    gameOver = true;
                }
            });
        } else {
            aliveAliens.forEach(a => {
                a.x += alienDirection * 2;
            });
        }
    }
    if (Math.random() < 0.02 && alienBullets.length < 3) {
        const columns = {};
        aliveAliens.forEach(a => {
            if (!columns[a.col] || columns[a.col].y < a.y) {
                columns[a.col] = a;
            }
        });
        const bottomAliens = Object.values(columns);
        if (bottomAliens.length > 0) {
            const shooter = bottomAliens[Math.floor(Math.random() * bottomAliens.length)];
            alienBullets.push({
                x: Math.floor(shooter.x + shooter.width / 2),
                y: shooter.y + shooter.height,
                type: Math.floor(Math.random() * 3),
                step: 0
            });
        }
    }
}
function updateUfo() {
    if (!ufo && Math.random() < 0.0015) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        ufo = {
            x: direction === 1 ? -16 : GAME_WIDTH,
            y: 40,
            direction: direction,
            points: [50, 100, 150, 300][Math.floor(Math.random() * 4)]
        };
    }
    if (ufo) {
        ufo.x += ufo.direction * 0.75;
        if (Math.random() < 0.1) audio.playUfoSound();
        if ((ufo.direction === 1 && ufo.x > GAME_WIDTH + 10) ||
            (ufo.direction === -1 && ufo.x < -20)) {
            ufo = null;
        }
    }
}
function update() {
    if (gameOver || !gameStarted) return;
    if (player.movingLeft && player.x > 8) player.x -= player.speed;
    if (player.movingRight && player.x < GAME_WIDTH - player.width - 8) player.x += player.speed;
    if (player.isExploding) {
        player.explodeTimer++;
        if (player.explodeTimer > 40) {
            player.isExploding = false;
            player.explodeTimer = 0;
            player.x = 28;
            lives--;
            if (lives <= 0) {
                gameOver = true;
            }
        }
        return;
    }
    if (playerBullet) {
        playerBullet.y -= 4;
        if (updateShieldCollision(playerBullet.x, playerBullet.y, true)) {
            playerBullet = null;
        }
        else if (ufo && playerBullet.x >= ufo.x && playerBullet.x <= ufo.x + 16 &&
                 playerBullet.y >= ufo.y && playerBullet.y <= ufo.y + 7) {
            score += ufo.points;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('space_invaders_hi', highScore.toString());
            }
            audio.playInvaderExplode();
            alienExplosions.push({ x: ufo.x, y: ufo.y, timer: 12 });
            ufo = null;
            playerBullet = null;
        }
        else {
            let hit = false;
            for (let i = 0; i < aliens.length; i++) {
                const a = aliens[i];
                if (a.alive && playerBullet &&
                    playerBullet.x >= a.x && playerBullet.x <= a.x + a.width &&
                    playerBullet.y >= a.y && playerBullet.y <= a.y + a.height) {
                    
                    a.alive = false;
                    hit = true;
                    score += a.points;
                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('space_invaders_hi', highScore.toString());
                    }
                    audio.playInvaderExplode();
                    alienExplosions.push({ x: a.x, y: a.y, timer: 12 });
                    playerBullet = null;
                    break;
                }
            }
            if (playerBullet && playerBullet.y < 32) {
                playerBullet = null;
            }
        }
    }
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        const b = alienBullets[i];
        b.y += 1.5;
        b.step++;
        if (updateShieldCollision(b.x, b.y, false)) {
            alienBullets.splice(i, 1);
            continue;
        }
        if (b.x >= player.x && b.x <= player.x + player.width &&
            b.y >= player.y && b.y <= player.y + player.height) {
            alienBullets.splice(i, 1);
            player.isExploding = true;
            audio.playPlayerExplode();
            break;
        }
        if (b.y > 238) {
            alienBullets.splice(i, 1);
        }
    }
    updateAliens();
    updateUfo();
    alienExplosions.forEach((exp, idx) => {
        exp.timer--;
        if (exp.timer <= 0) alienExplosions.splice(idx, 1);
    });
}
function formatScore(val) {
    return val.toString().padStart(4, '0');
}
function drawHUD() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '8px "Press Start 2P"';

    ctx.fillText('SCORE<1>', 12, 16);
    ctx.fillText('HI-SCORE', 80, 16);
    ctx.fillText('SCORE<2>', 152, 16);
    ctx.fillText(formatScore(score), 24, 28);
    ctx.fillText(formatScore(highScore), 92, 28);
    ctx.fillText('0000', 164, 28);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 238, GAME_WIDTH, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(lives.toString(), 12, 250);
    for (let l = 0; l < lives - 1; l++) {
        drawSprite(SPRITES.player, 24 + l * 16, 244, '#00ff00');
    }
    ctx.fillText('CREDIT 00', 136, 250);
}
function render() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    drawHUD();
    if (!gameStarted) {
        ctx.fillStyle = '#00ff00';
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText('SPACE INVADERS', 50, 110);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('PRESS SPACE TO PLAY', 28, 140);
        return;
    }
    shields.forEach(sh => {
        ctx.fillStyle = '#00ff00';
        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 22; c++) {
                if (sh.grid[r][c] === 1) {
                    ctx.fillRect(sh.x + c, sh.y + r, 1, 1);
                }
            }
        }
    });
    aliens.forEach(a => {
        if (a.alive) {
            const spriteFrame = SPRITES[a.type][alienAnimFrame];
            drawSprite(spriteFrame, a.x, a.y, '#ffffff');
        }
    });
    alienExplosions.forEach(exp => {
        drawSprite(SPRITES.explosion, exp.x, exp.y, '#ffffff');
    });
    if (ufo) {
        drawSprite(SPRITES.ufo, ufo.x, ufo.y, '#ff0000');
    }
    if (player.isExploding) {
        drawSprite(SPRITES.explosion, player.x, player.y, '#00ff00');
    } else {
        drawSprite(SPRITES.player, player.x, player.y, '#00ff00');
    }
    if (playerBullet) {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(playerBullet.x, playerBullet.y, playerBullet.width, playerBullet.height);
    }
    ctx.fillStyle = '#ffffff';
    alienBullets.forEach(b => {
        const offset = (b.step % 4 > 2) ? 1 : 0;
        ctx.fillRect(b.x + offset, b.y, 1, 4);
    });
    if (gameOver) {
        ctx.fillStyle = '#ff0000';
        ctx.font = '8px "Press Start 2P"';
        ctx.fillText('GAME OVER', 72, 125);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('PRESS SPACE', 64, 145);
    }
}
let lastTime = 0;
const fpsInterval = 1000 / 60;
function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;

    const elapsed = currentTime - lastTime;

    if (elapsed >= fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);

        update();
        render();
    }

    requestAnimationFrame(gameLoop);
}

initAliens();
initShields();
requestAnimationFrame((timestamp) => gameLoop(timestamp));
