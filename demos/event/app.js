(() => {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  const countdown = document.getElementById("countdown");
  const eventDateEl = document.getElementById("event-date");
  const seatsEl = document.getElementById("seats");
  const form = document.getElementById("reg-form");
  const success = document.getElementById("form-success");

  // Target: next occurrence of a weekday evening, always in the future for the demo
  function nextEventDate() {
    const stored = localStorage.getItem("openstage-event-at");
    if (stored) {
      const d = new Date(stored);
      if (d.getTime() > Date.now() + 60_000) return d;
    }
    const d = new Date();
    d.setDate(d.getDate() + 12);
    d.setHours(19, 0, 0, 0);
    localStorage.setItem("openstage-event-at", d.toISOString());
    return d;
  }

  let target = nextEventDate();

  const dateFmt = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  });

  eventDateEl.dateTime = target.toISOString();
  eventDateEl.textContent = dateFmt.format(target) + " (MSK)";

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      countdown.classList.add("is-live");
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      // roll forward for demo continuity
      localStorage.removeItem("openstage-event-at");
      target = nextEventDate();
      eventDateEl.dateTime = target.toISOString();
      eventDateEl.textContent = dateFmt.format(target) + " (MSK)";
      countdown.classList.remove("is-live");
      return;
    }

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);

  // Soft scarcity flicker
  let seats = 47;
  setInterval(() => {
    if (Math.random() > 0.7 && seats > 31) {
      seats -= 1;
      seatsEl.textContent = String(seats);
    }
  }, 14000);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(name, message) {
    const input = form.elements[name];
    const err = form.querySelector(`[data-error-for="${name}"]`);
    if (input && input.type !== "checkbox") input.classList.add("is-invalid");
    if (err) {
      err.hidden = !message;
      err.textContent = message || "";
    }
  }

  function clearErrors() {
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    form.querySelectorAll(".field__error").forEach((el) => {
      el.hidden = true;
      el.textContent = "";
    });
  }

  function validate() {
    clearErrors();
    let ok = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const consent = form.consent.checked;

    if (name.length < 2) {
      showError("name", "Введите имя — минимум 2 символа");
      ok = false;
    }
    if (!emailRe.test(email)) {
      showError("email", "Укажите корректный email");
      ok = false;
    }
    if (!consent) {
      showError("consent", "Нужно согласие, чтобы отправить ссылку на эфир");
      ok = false;
    }
    return ok;
  }

  ["name", "email"].forEach((name) => {
    form.elements[name].addEventListener("input", () => {
      showError(name, "");
      form.elements[name].classList.remove("is-invalid");
    });
  });
  form.consent.addEventListener("change", () => showError("consent", ""));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstInvalid = form.querySelector(".is-invalid, [data-error-for]:not([hidden])");
      if (firstInvalid) {
        const focusable = form.querySelector(".is-invalid") || form.consent;
        focusable?.focus();
      }
      return;
    }
    success.hidden = false;
    form.reset();
    clearErrors();
  });
})();
