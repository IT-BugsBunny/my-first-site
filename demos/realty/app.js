(() => {
  const state = { rooms: "all", price: "all" };

  const grid = document.getElementById("property-grid");
  const listings = [...grid.querySelectorAll(".listing")];
  const visibleCount = document.getElementById("visible-count");
  const totalCount = document.getElementById("total-count");
  const empty = document.getElementById("empty-state");
  const form = document.getElementById("viewing-form");
  const objectField = document.getElementById("object-field");
  const success = document.getElementById("form-success");

  totalCount.textContent = String(listings.length);

  // data-price is in thousands of ₽ (14800 = 14.8 млн)
  // chip bands use millions (0-12, 12-20, 20-999)
  function matchPrice(price, band) {
    if (band === "all") return true;
    const [min, max] = band.split("-").map(Number);
    return price >= min * 1000 && price <= max * 1000;
  }

  function applyFilters() {
    let shown = 0;
    for (const card of listings) {
      const rooms = card.dataset.rooms;
      const price = Number(card.dataset.price);
      const roomsOk =
        state.rooms === "all" ||
        (state.rooms === "3" ? Number(rooms) >= 3 : rooms === state.rooms);
      const ok = roomsOk && matchPrice(price, state.price);
      card.classList.toggle("is-hidden", !ok);
      if (ok) shown += 1;
    }
    visibleCount.textContent = String(shown);
    empty.hidden = shown !== 0;
  }

  document.querySelectorAll(".chips").forEach((group) => {
    group.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      group.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      state[group.dataset.filter] = btn.dataset.value;
      applyFilters();
    });
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".listing__btn");
    if (!btn) return;
    objectField.value = btn.dataset.object || "";
    document.getElementById("viewing").scrollIntoView({ behavior: "smooth" });
    objectField.focus();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    success.hidden = false;
    form.reset();
  });

  applyFilters();
})();
