(() => {
  const terminalBody = document.getElementById("terminal-body");
  const lat = document.getElementById("lat");
  const deploys = document.getElementById("deploys");
  const spark = document.getElementById("spark");
  const flag = document.getElementById("flag-beta");
  const preview = document.getElementById("flag-preview");
  const badge = document.getElementById("flag-badge");
  const flagCopy = document.getElementById("flag-copy");
  const proPrice = document.getElementById("pro-price");

  for (let i = 0; i < 16; i += 1) {
    const bar = document.createElement("i");
    bar.style.height = `${30 + Math.random() * 70}%`;
    bar.style.animationDelay = `${i * 0.08}s`;
    spark.appendChild(bar);
  }

  const script = [
    { type: "cmd", text: "rivet deploy --prod" },
    { type: "out", html: '<span class="t-cyan">→</span> building 14 assets…' },
    { type: "out", html: '<span class="t-cyan">→</span> pushing edge canary 5%' },
    { type: "out", html: '<span class="t-good">✓</span> live · https://app.rivet.dev' },
    { type: "out", html: '<span class="t-muted">p99 42ms · 0 errors · 12s</span>' },
  ];

  let line = 0;
  let char = 0;
  let buffer = '<span class="t-muted">$ </span>';

  function renderTerminal(extra = "") {
    terminalBody.innerHTML = buffer + extra + '<span class="cursor">█</span>';
  }

  function tickType() {
    if (line >= script.length) {
      setTimeout(() => {
        line = 0;
        char = 0;
        buffer = '<span class="t-muted">$ </span>';
        renderTerminal();
        tickType();
      }, 2800);
      return;
    }

    const step = script[line];
    if (step.type === "cmd") {
      if (char <= step.text.length) {
        renderTerminal(step.text.slice(0, char));
        char += 1;
        setTimeout(tickType, 38 + Math.random() * 40);
      } else {
        buffer += step.text + "\n";
        line += 1;
        char = 0;
        setTimeout(tickType, 280);
      }
      return;
    }

    buffer += step.html + "\n";
    if (line === script.length - 1) {
      buffer += '<span class="t-muted">$ </span>';
    }
    renderTerminal();
    line += 1;
    setTimeout(tickType, 420);
  }

  renderTerminal();
  tickType();

  let deployCount = 128;
  setInterval(() => {
    lat.textContent = String(36 + Math.floor(Math.random() * 18));
    if (Math.random() > 0.55) {
      deployCount += 1;
      deploys.textContent = String(deployCount);
    }
    spark.querySelectorAll("i").forEach((el) => {
      el.style.height = `${25 + Math.random() * 75}%`;
    });
  }, 1600);

  function syncFlag() {
    const on = flag.checked;
    preview.dataset.on = on ? "true" : "false";
    badge.textContent = on ? "FLAG ON" : "FLAG OFF";
    flagCopy.textContent = on
      ? "Новый checkout активен. Конверсия в песочнице +12%."
      : "Старый checkout. Флаг выключен для всех пользователей.";
  }
  flag.addEventListener("change", syncFlag);
  syncFlag();

  document.querySelectorAll(".billing__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".billing__btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const yearly = btn.dataset.billing === "yearly";
      const value = yearly
        ? proPrice.dataset.priceYearly
        : proPrice.dataset.priceMonthly;
      proPrice.textContent = Number(value).toLocaleString("ru-RU");
    });
  });
})();
