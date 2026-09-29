(() => {
  // Before / after sliders
  document.querySelectorAll("[data-ba]").forEach((root) => {
    const range = root.querySelector(".ba__range");
    const beforeWrap = root.querySelector(".ba__before-wrap");
    const handle = root.querySelector(".ba__handle");

    function sync(val) {
      const v = `${val}%`;
      beforeWrap.style.width = v;
      handle.style.left = v;
    }

    range.addEventListener("input", () => sync(range.value));
    sync(range.value);
  });

  // Calendar booking
  const calTitle = document.getElementById("cal-title");
  const calGrid = document.getElementById("cal-grid");
  const slotsGrid = document.getElementById("slots-grid");
  const selectedDayEl = document.getElementById("selected-day");
  const fieldDate = document.getElementById("field-date");
  const fieldTime = document.getElementById("field-time");
  const summary = document.getElementById("book-summary");
  const form = document.getElementById("book-form");
  const formError = document.getElementById("form-error");
  const formSuccess = document.getElementById("form-success");

  const TIMES = ["10:00", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDate = null;
  let selectedTime = null;

  function fmtDate(d) {
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      weekday: "short",
    });
  }

  function isoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function updateSummary() {
    if (!selectedDate || !selectedTime) {
      summary.textContent = "Выберите дату и время в календаре.";
      return;
    }
    summary.textContent = `Слот: ${fmtDate(selectedDate)}, ${selectedTime}`;
  }

  function renderSlots() {
    slotsGrid.innerHTML = "";
    if (!selectedDate) {
      selectedDayEl.textContent = "—";
      return;
    }
    selectedDayEl.textContent = fmtDate(selectedDate);

    // Pseudo-busy: block a couple of slots based on day number
    const busyIdx = selectedDate.getDate() % TIMES.length;

    TIMES.forEach((t, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot";
      btn.textContent = t;
      if (i === busyIdx || i === (busyIdx + 3) % TIMES.length) {
        btn.disabled = true;
        btn.title = "Занято";
      }
      if (selectedTime === t) btn.classList.add("is-selected");
      btn.addEventListener("click", () => {
        selectedTime = t;
        fieldTime.value = t;
        renderSlots();
        updateSummary();
        formError.hidden = true;
      });
      slotsGrid.appendChild(btn);
    });
  }

  function renderCalendar() {
    calTitle.textContent = `${monthNames[view.getMonth()]} ${view.getFullYear()}`;
    calGrid.innerHTML = "";

    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDow; i += 1) {
      const empty = document.createElement("button");
      empty.type = "button";
      empty.className = "cal-day is-muted";
      empty.disabled = true;
      empty.textContent = "";
      calGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-day";
      btn.textContent = String(day);

      const isPast = date < today;
      const isSun = date.getDay() === 0;
      if (isPast || isSun) btn.disabled = true;

      if (selectedDate && isoDate(selectedDate) === isoDate(date)) {
        btn.classList.add("is-selected");
      }

      btn.addEventListener("click", () => {
        selectedDate = date;
        selectedTime = null;
        fieldDate.value = isoDate(date);
        fieldTime.value = "";
        renderCalendar();
        renderSlots();
        updateSummary();
        formError.hidden = true;
      });

      calGrid.appendChild(btn);
    }
  }

  document.getElementById("cal-prev").addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    renderCalendar();
  });

  document.getElementById("cal-next").addEventListener("click", () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    renderCalendar();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;
    formError.hidden = true;

    if (!selectedDate || !selectedTime) {
      formError.textContent = "Выберите день и свободное время.";
      formError.hidden = false;
      return;
    }
    if (!form.reportValidity()) return;

    formSuccess.hidden = false;
    form.reset();
    selectedDate = null;
    selectedTime = null;
    fieldDate.value = "";
    fieldTime.value = "";
    renderCalendar();
    renderSlots();
    updateSummary();
  });

  renderCalendar();
  renderSlots();
  updateSummary();
})();
