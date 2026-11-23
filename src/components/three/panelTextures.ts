import * as THREE from "three";

// Canvas-drawn interface panels shown in the 3D hero. Palette mirrors the design tokens.
export const PALETTE = {
  bg: "#121117",
  bgTop: "#18171f",
  line: "rgba(255,255,255,0.08)",
  text: "#f2f1f5",
  muted: "#8d8b98",
  violet: "#a77bff",
  blue: "#4fb3ff",
  green: "#5fe0a0",
};

export type PanelKind = "revenue" | "deploy" | "code";

const W = 640;
const H = 400;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function frame(ctx: CanvasRenderingContext2D, title: string, tag: string) {
  ctx.clearRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, PALETTE.bgTop);
  g.addColorStop(1, PALETTE.bg);
  roundRect(ctx, 2, 2, W - 4, H - 4, 28);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ["#ff6b6b", "#ffcc66", "#5fe0a0"].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(36 + i * 22, 36, 6, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  ctx.fillStyle = PALETTE.muted;
  ctx.font = "500 18px 'Geist Mono', ui-monospace, monospace";
  ctx.fillText(tag, W - 30 - ctx.measureText(tag).width, 42);
  ctx.fillStyle = PALETTE.text;
  ctx.font = "600 26px Geist, system-ui, sans-serif";
  ctx.fillText(title, 32, 96);
  ctx.strokeStyle = PALETTE.line;
  ctx.beginPath();
  ctx.moveTo(32, 118);
  ctx.lineTo(W - 32, 118);
  ctx.stroke();
}

function drawRevenue(ctx: CanvasRenderingContext2D) {
  frame(ctx, "Conversion rate", "LIVE");
  ctx.fillStyle = PALETTE.text;
  ctx.font = "600 64px Geist, system-ui, sans-serif";
  ctx.fillText("4.8%", 32, 196);
  ctx.fillStyle = PALETTE.green;
  ctx.font = "500 20px 'Geist Mono', monospace";
  ctx.fillText("▲ trending up", 196, 192);

  const pts = [0.2, 0.32, 0.28, 0.45, 0.4, 0.58, 0.52, 0.7, 0.66, 0.84];
  const x0 = 32;
  const y0 = 360;
  const w = W - 64;
  const h = 130;
  const grad = ctx.createLinearGradient(0, y0 - h, 0, y0);
  grad.addColorStop(0, "rgba(167,123,255,0.45)");
  grad.addColorStop(1, "rgba(167,123,255,0)");
  ctx.beginPath();
  pts.forEach((p, i) => {
    const x = x0 + (i / (pts.length - 1)) * w;
    const y = y0 - p * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(x0 + w, y0);
  ctx.lineTo(x0, y0);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.beginPath();
  pts.forEach((p, i) => {
    const x = x0 + (i / (pts.length - 1)) * w;
    const y = y0 - p * h;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = PALETTE.violet;
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawDeploy(ctx: CanvasRenderingContext2D) {
  frame(ctx, "Deployments", "PROD");
  const rows = [
    ["main", "Ready", PALETTE.green],
    ["feat/checkout", "Ready", PALETTE.green],
    ["feat/dashboard", "Building", PALETTE.blue],
  ] as const;
  rows.forEach(([branch, status, color], i) => {
    const y = 168 + i * 66;
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    roundRect(ctx, 32, y - 34, W - 64, 52, 12);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(56, y - 8, 7, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = PALETTE.text;
    ctx.font = "500 22px 'Geist Mono', monospace";
    ctx.fillText(branch, 78, y);
    ctx.fillStyle = color;
    ctx.font = "500 20px Geist, system-ui, sans-serif";
    ctx.fillText(status, W - 56 - ctx.measureText(status).width, y);
  });
}

function drawCode(ctx: CanvasRenderingContext2D) {
  frame(ctx, "api/orders.ts", "TS");
  const lines: [string, string][][] = [
    [["export ", PALETTE.violet], ["async function ", PALETTE.blue], ["createOrder", PALETTE.text]],
    [["  const ", PALETTE.violet], ["order ", PALETTE.text], ["= await ", PALETTE.muted], ["db", PALETTE.blue]],
    [["    .insert", PALETTE.text], ["(payload)", PALETTE.muted]],
    [["  await ", PALETTE.violet], ["notify", PALETTE.blue], ["(order.id)", PALETTE.muted]],
    [["  return ", PALETTE.violet], ["{ status: ", PALETTE.text], ["'paid' ", PALETTE.green], ["}", PALETTE.text]],
  ];
  ctx.font = "500 22px 'Geist Mono', monospace";
  lines.forEach((parts, i) => {
    let x = 70;
    const y = 166 + i * 44;
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillText(String(i + 1), 36, y);
    parts.forEach(([t, c]) => {
      ctx.fillStyle = c;
      ctx.fillText(t, x, y);
      x += ctx.measureText(t).width;
    });
  });
}

export function createPanelTexture(kind: PanelKind) {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const draw = () => {
    if (!ctx) return;
    if (kind === "revenue") drawRevenue(ctx);
    else if (kind === "deploy") drawDeploy(ctx);
    else drawCode(ctx);
    texture.needsUpdate = true;
  };
  draw();
  // Redraw once web fonts are available so labels use Geist.
  void document.fonts?.ready.then(draw);
  return texture;
}

export const PANEL_ASPECT = W / H;
