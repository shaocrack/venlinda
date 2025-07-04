// --- Noche estrellada animada ---
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars(num) {
    stars = [];
    for (let i = 0; i < num; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.2 + 0.05
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = '#fff';
    for (let star of stars) {
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
}

// --- Noche estrellada animada con estrellas fugaces ---
let shootingStars = [];

function createShootingStar() {
    const startX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const startY = Math.random() * canvas.height * 0.3;
    const length = Math.random() * 120 + 80;
    const speed = Math.random() * 8 + 6;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
    shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        alpha: 1
    });
}

function drawShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = '#fffbe6';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 18;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
            s.x - Math.cos(s.angle) * s.length,
            s.y + Math.sin(s.angle) * s.length
        );
        ctx.stroke();
        ctx.restore();
        // Actualizar posición
        s.x += Math.cos(s.angle) * s.speed;
        s.y -= Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;
        if (s.alpha <= 0) shootingStars.splice(i, 1);
    }
}

function animateStars() {
    for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
    drawStars();
    drawShootingStars();
    if (Math.random() < 0.012) createShootingStar();
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars(200);
});
resizeCanvas();
createStars(200);
animateStars();
// --- Fin noche estrellada ---

// --- Lógica del botón y mensaje ---
const startBtn = document.getElementById('start-btn');
const audio = document.getElementById('audio');
const mensajeDiv = document.getElementById('mensaje');

const mensaje = [
    'POR SI NADIE TE LO DIJO',
    'QUE TENGAS UNA BONITA NOCHE',
    'NO TE VI, PERO SE QUE HOY ESTUVISTE HERMOSA :D'
];

function typeWriterMsg(lines, element, lineIndex = 0, charIndex = 0, doneCallback) {
    if (lineIndex >= lines.length) {
        if (doneCallback) doneCallback();
        return;
    }
    if (charIndex === 0) {
        const lineElem = document.createElement('div');
        lineElem.className = 'mensaje-line';
        element.appendChild(lineElem);
    }
    const currentLineElem = element.children[lineIndex];
    currentLineElem.textContent += lines[lineIndex][charIndex];
    if (charIndex < lines[lineIndex].length - 1) {
        setTimeout(() => typeWriterMsg(lines, element, lineIndex, charIndex + 1, doneCallback), 70);
    } else {
        setTimeout(() => typeWriterMsg(lines, element, lineIndex + 1, 0, doneCallback), 1200);
    }
}

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    audio.play();
    mensajeDiv.innerHTML = '';
    typeWriterMsg(mensaje, mensajeDiv, 0, 0, () => {
        // Mostrar todo el mensaje junto al final
        setTimeout(() => {
            mensajeDiv.innerHTML = mensaje.map(l => `<div class='mensaje-line'>${l}</div>`).join('');
        }, 1800);
    });
});
// --- Fin lógica del botón y mensaje ---
