(() => {
  const terminalBody = document.getElementById("terminal-body");
  const lat = document.getElementById("lat");
  const deploys = document.getElementById("deploys");
  const spark = document.getElementById("spark");
  const flag = document.getElementById("flag-beta");
  const preview = document.getElementById("flag-preview");
  const badge = document.getElementById("flag-badge");
  const flagCopy = document.getElementById("flag-copy");
  const cmd = document.getElementById("cmd");
  const cmdOpen = document.getElementById("cmd-open");
  const cmdInput = document.getElementById("cmd-input");
  const cmdList = [...document.querySelectorAll("#cmd-list li")];
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

  function openCmd() {
    cmd.hidden = false;
    cmdInput.value = "";
    cmdInput.focus();
    setActive(0);
  }

  function closeCmd() {
    cmd.hidden = true;
  }

  function setActive(index) {
    cmdList.forEach((li, i) => li.classList.toggle("is-active", i === index));
  }

  function go(href) {
    closeCmd();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  cmdOpen.addEventListener("click", openCmd);
  cmd.addEventListener("click", (e) => {
    if (e.target === cmd) closeCmd();
  });
  cmdList.forEach((li, i) => {
    li.addEventListener("click", () => go(li.dataset.href));
    li.addEventListener("mouseenter", () => setActive(i));
  });

  window.addEventListener("keydown", (e) => {
    const metaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    if (metaK) {
      e.preventDefault();
      if (cmd.hidden) openCmd();
      else closeCmd();
      return;
    }
    if (cmd.hidden) return;
    if (e.key === "Escape") closeCmd();
    if (e.key === "Enter") {
      const active = cmdList.find((li) => li.classList.contains("is-active"));
      if (active) go(active.dataset.href);
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const idx = cmdList.findIndex((li) => li.classList.contains("is-active"));
      const next =
        e.key === "ArrowDown"
          ? (idx + 1) % cmdList.length
          : (idx - 1 + cmdList.length) % cmdList.length;
      setActive(next);
    }
  });

  cmdInput.addEventListener("input", () => {
    const q = cmdInput.value.trim().toLowerCase();
    let first = -1;
    cmdList.forEach((li, i) => {
      const show = !q || li.textContent.toLowerCase().includes(q);
      li.hidden = !show;
      if (show && first < 0) first = i;
    });
    if (first >= 0) setActive(first);
  });
})();
