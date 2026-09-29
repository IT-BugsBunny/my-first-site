const cpuVal = document.getElementById("cpu-val");
const ramVal = document.getElementById("ram-val");
const diskVal = document.getElementById("disk-val");
const latVal = document.getElementById("lat-val");
const cpuBar = document.getElementById("cpu-bar");
const ramBar = document.getElementById("ram-bar");
const diskBar = document.getElementById("disk-bar");
const spark = document.getElementById("spark");
const servicesEl = document.getElementById("services");
const logEl = document.getElementById("log");

const services = [
  { name: "nginx", status: "up" },
  { name: "api-gateway", status: "up" },
  { name: "postgres", status: "up" },
  { name: "redis", status: "up" },
  { name: "worker-queue", status: "degraded" },
];

const events = [
  { level: "info", text: "healthcheck passed · /readyz 200" },
  { level: "ok", text: "deploy finished · revision 7c30a37" },
  { level: "info", text: "autoscaler: idle · replicas=2" },
  { level: "warn", text: "worker-queue lag 1.2s · retrying" },
  { level: "ok", text: "TLS renew ok · expires in 68d" },
  { level: "info", text: "backup snapshot · 1.4GB uploaded" },
  { level: "ok", text: "cdn cache hit ratio 94%" },
  { level: "warn", text: "disk scrub scheduled · night window" },
];

let cpu = 42;
let ram = 61;
let disk = 38;
let latency = 24;
const sparkData = Array.from({ length: 18 }, () => 10 + Math.random() * 26);

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function jitter(value, amount, min, max) {
  return clamp(value + (Math.random() - 0.5) * amount, min, max);
}

function renderServices() {
  servicesEl.innerHTML = services
    .map(
      (s) => `
      <li>
        <span>${s.name}</span>
        <span class="badge ${s.status}">${s.status}</span>
      </li>`
    )
    .join("");
}

function renderSpark() {
  spark.innerHTML = sparkData
    .map((v) => `<span style="height:${v}px"></span>`)
    .join("");
}

function pushLog() {
  const item = events[Math.floor(Math.random() * events.length)];
  const now = new Date();
  const stamp = now.toLocaleTimeString("ru-RU", { hour12: false });
  const line = document.createElement("div");
  line.className = `log-line ${item.level}`;
  line.innerHTML = `<time>${stamp}</time>${item.text}`;
  logEl.prepend(line);
  while (logEl.children.length > 10) {
    logEl.removeChild(logEl.lastChild);
  }
}

function tick() {
  cpu = jitter(cpu, 10, 18, 88);
  ram = jitter(ram, 6, 40, 82);
  disk = jitter(disk, 2, 30, 55);
  latency = Math.round(jitter(latency, 12, 12, 90));

  cpuVal.textContent = `${Math.round(cpu)}%`;
  ramVal.textContent = `${Math.round(ram)}%`;
  diskVal.textContent = `${Math.round(disk)}%`;
  latVal.textContent = `${latency}ms`;

  cpuBar.style.width = `${cpu}%`;
  ramBar.style.width = `${ram}%`;
  diskBar.style.width = `${disk}%`;

  sparkData.shift();
  sparkData.push(8 + latency * 0.35 + Math.random() * 8);
  renderSpark();

  if (Math.random() > 0.45) {
    const worker = services.find((s) => s.name === "worker-queue");
    worker.status = Math.random() > 0.55 ? "up" : "degraded";
    renderServices();
  }
}

renderServices();
renderSpark();
pushLog();
pushLog();
pushLog();

setInterval(tick, 1200);
setInterval(pushLog, 2200);
