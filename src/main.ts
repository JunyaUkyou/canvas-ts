const canvas = document.getElementById("my-house") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) throw new Error("2D context not supported");

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
