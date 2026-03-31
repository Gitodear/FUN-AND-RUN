// ─────────────────────────────────────────
// FLOATING HEARTS BACKGROUND
// ─────────────────────────────────────────

function createFloatingHearts() {
  const container = document.getElementById('hearts-bg');
  const hearts = ['♥', '♡', '❤', '💕', '✿', '❀'];
  const colors = ['#f8a4c8', '#e8729a', '#c9a0dc', '#f0c27f', '#ffc0cb', '#dda0dd'];

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = (Math.random() * 10) + 's';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(heart);
  }
}

document.addEventListener('DOMContentLoaded', createFloatingHearts);

// ─────────────────────────────────────────
// SCREEN TRANSITIONS
// ─────────────────────────────────────────

function switchScreen(from, to) {
  document.getElementById(from).classList.remove('active');
  setTimeout(() => {
    document.getElementById(to).classList.add('active');
  }, 500);
}

// ─────────────────────────────────────────
// SCREEN 1 → SCREEN 2
// ─────────────────────────────────────────

function goToScreen2() {
  switchScreen('screen1', 'screen2');
  setTimeout(startTypewriter, 900);
}

// ─────────────────────────────────────────
// TYPEWRITER EFFECT
// ─────────────────────────────────────────

const lines = [
  "You make my days better…",
  "You make me smile for no reason…",
  "And honestly…"
];

function startTypewriter() {
  const container = document.getElementById('typewriter-container');
  container.innerHTML = '';

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      // Show the button after all lines
      setTimeout(() => {
        document.getElementById('screen2-btn').classList.add('visible');
      }, 600);
      return;
    }

    const lineEl = document.createElement('p');
    lineEl.className = 'type-line';
    const textSpan = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    lineEl.appendChild(textSpan);
    lineEl.appendChild(cursor);
    container.appendChild(lineEl);

    // Fade in the line
    requestAnimationFrame(() => lineEl.classList.add('visible'));

    const text = lines[lineIndex];
    let charIndex = 0;

    function typeChar() {
      if (charIndex < text.length) {
        textSpan.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeChar, 45 + Math.random() * 35);
      } else {
        // Remove cursor from this line
        cursor.remove();
        lineIndex++;
        setTimeout(typeLine, 700);
      }
    }

    setTimeout(typeChar, 300);
  }

  typeLine();
}

// ─────────────────────────────────────────
// SCREEN 2 → SCREEN 3
// ─────────────────────────────────────────

function goToScreen3() {
  switchScreen('screen2', 'screen3');
  setTimeout(() => {
    document.getElementById('proposal-q').classList.add('visible');
    document.getElementById('btn-group').classList.add('visible');
  }, 700);
}

// ─────────────────────────────────────────
// YES HANDLER
// ─────────────────────────────────────────

function handleYes() {
  switchScreen('screen3', 'screen4');
  setTimeout(() => {
    document.getElementById('celeb-heart').classList.add('visible');
    document.getElementById('celeb-text').classList.add('visible');
    document.getElementById('glow-ring').classList.add('visible');
    launchConfetti();

    // Additional glow rings
    setTimeout(() => {
      const ring2 = document.createElement('div');
      ring2.className = 'glow-ring visible';
      ring2.style.top = '50%';
      ring2.style.left = '50%';
      ring2.style.transform = 'translate(-50%, -50%)';
      document.getElementById('screen4').appendChild(ring2);
    }, 400);
  }, 700);
}

// ─────────────────────────────────────────
// NO BUTTON LOGIC
// ─────────────────────────────────────────

const noTexts = [
  "Are you sure? 🥺",
  "Think again 😭",
  "That hurt 😢",
  "Pretty please? 🌸",
  "Last chance… 💔"
];

let noAttempts = 0;
const maxDodges = 4;

document.addEventListener('DOMContentLoaded', function() {
  const btnNo = document.getElementById('btn-no');

  btnNo.addEventListener('mouseenter', function(e) {
    if (noAttempts < maxDodges) {
      // Nudge the button away
      const rect = this.getBoundingClientRect();
      const parentRect = this.parentElement.getBoundingClientRect();

      let dx = (Math.random() - 0.5) * 120;
      let dy = (Math.random() - 0.5) * 80;

      // Keep roughly within viewport
      if (rect.left + dx < 20) dx = Math.abs(dx);
      if (rect.right + dx > window.innerWidth - 20) dx = -Math.abs(dx);
      if (rect.top + dy < 20) dy = Math.abs(dy);
      if (rect.bottom + dy > window.innerHeight - 20) dy = -Math.abs(dy);

      this.style.transform = `translate(${dx}px, ${dy}px)`;
      this.textContent = noTexts[Math.min(noAttempts, noTexts.length - 1)];
      noAttempts++;
    } else {
      // After enough attempts, let them click
      this.style.transform = 'translate(0, 0)';
      this.textContent = 'NO 💔';
    }
  });

  btnNo.addEventListener('click', function() {
    if (noAttempts >= maxDodges) {
      switchScreen('screen3', 'screen5');
      setTimeout(() => {
        document.getElementById('gentle-emoji').classList.add('visible');
        document.getElementById('gentle-text').classList.add('visible');
      }, 700);
    }
  });
});

// ─────────────────────────────────────────
// CONFETTI ANIMATION
// ─────────────────────────────────────────

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = [
    '#f8a4c8', '#e8729a', '#c9a0dc', '#f0c27f', '#ff6b9d',
    '#c94b7a', '#ffc0cb', '#dda0dd', '#ff85a2', '#f7b2d1'
  ];
  const shapes = ['circle', 'rect', 'heart'];

  // First wave
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.15 + Math.random() * 0.1,
      opacity: 1,
      decay: 0.003 + Math.random() * 0.004
    });
  }

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    const s = size * 0.5;
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y - s * 0.3, x - s, y - s * 0.3, x - s, y + s * 0.1);
    ctx.bezierCurveTo(x - s, y + s * 0.6, x, y + s, x, y + s);
    ctx.bezierCurveTo(x, y + s, x + s, y + s * 0.6, x + s, y + s * 0.1);
    ctx.bezierCurveTo(x + s, y - s * 0.3, x, y - s * 0.3, x, y + s * 0.3);
    ctx.closePath();
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of pieces) {
      if (p.opacity <= 0) continue;
      alive = true;

      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;
      p.opacity -= p.decay;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        drawHeart(ctx, 0, 0, p.size);
      }

      ctx.restore();
    }

    if (alive) requestAnimationFrame(animate);
  }

  animate();

  // Second wave
  setTimeout(() => {
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.08,
        opacity: 1,
        decay: 0.003
      });
    }
    animate();
  }, 1200);
}

// ─────────────────────────────────────────
// WINDOW RESIZE HANDLER
// ─────────────────────────────────────────

window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
