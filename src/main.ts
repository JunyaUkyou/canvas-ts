const canvas = document.getElementById("my-house") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) throw new Error("2D context not supported");

canvas.addEventListener("click", (e) => {
  console.log("aaa");
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spawnParticles(x, y);
});

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

const particles: Particle[] = [];

function spawnParticles(x: number, y: number) {
  for (let i = 0; i < 30; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 60, // フレーム数
    });
  }
}

function loop() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // パーティクル更新 & 描画
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    // 位置更新
    p.x += p.vx;
    p.y += p.vy;

    // 摩擦（だんだん減速）
    p.vx *= 0.98;
    p.vy *= 0.98;

    // 寿命
    p.life--;

    // 描画
    ctx.fillStyle = `rgba(255, 200, 0, ${p.life / 60})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // 消滅処理
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
}

loop();

// 線の幅を設定
ctx.lineWidth = 10;

// 壁
ctx.strokeRect(75, 140, 150, 110);

// ドア
ctx.fillRect(130, 190, 40, 60);

// 屋根
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
