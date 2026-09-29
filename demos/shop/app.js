(() => {
  const cart = new Map();

  const els = {
    count: document.getElementById("cart-count"),
    items: document.getElementById("cart-items"),
    total: document.getElementById("cart-total"),
    save: document.getElementById("cart-save"),
    summary: document.getElementById("checkout-summary"),
    mini: document.getElementById("mini-cart"),
    backdrop: document.getElementById("cart-backdrop"),
    open: document.getElementById("cart-open"),
    close: document.getElementById("cart-close"),
    goCheckout: document.getElementById("go-checkout"),
    form: document.getElementById("checkout-form"),
    success: document.getElementById("checkout-success"),
    toast: document.getElementById("toast"),
    countdown: document.getElementById("countdown"),
    viewers: document.getElementById("viewers"),
  };

  const money = (n) =>
    new Intl.NumberFormat("ru-RU").format(n) + " ₽";

  function openCart() {
    els.mini.classList.add("is-open");
    els.mini.setAttribute("aria-hidden", "false");
    els.backdrop.hidden = false;
  }

  function closeCart() {
    els.mini.classList.remove("is-open");
    els.mini.setAttribute("aria-hidden", "true");
    els.backdrop.hidden = true;
  }

  function showToast() {
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 1600);
  }

  function addItem(product, qty = 1) {
    const prev = cart.get(product.id);
    if (prev) {
      prev.qty += qty;
    } else {
      cart.set(product.id, { ...product, qty });
    }
    render();
    showToast();
    openCart();
  }

  function setQty(id, qty) {
    const item = cart.get(id);
    if (!item) return;
    if (qty <= 0) cart.delete(id);
    else item.qty = qty;
    render();
  }

  function totals() {
    let sum = 0;
    let old = 0;
    let count = 0;
    for (const item of cart.values()) {
      sum += item.price * item.qty;
      old += item.old * item.qty;
      count += item.qty;
    }
    return { sum, old, count, saved: Math.max(0, old - sum) };
  }

  function render() {
    const { sum, count, saved } = totals();
    els.count.textContent = String(count);
    els.total.textContent = money(sum);
    els.save.textContent = saved
      ? `Вы экономите ${money(saved)}`
      : "";

    if (cart.size === 0) {
      els.items.innerHTML = "<p>Пока пусто. Выберите цвет в каталоге.</p>";
      els.summary.innerHTML = "<p>Корзина пуста — добавьте цвет выше.</p>";
      return;
    }

    els.items.innerHTML = "";
    const summaryLines = [];

    for (const item of cart.values()) {
      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div class="cart-line__name">${item.name}</div>
        <div class="cart-line__price">${money(item.price * item.qty)}</div>
        <div class="cart-line__qty">
          <button type="button" data-dec="${item.id}" aria-label="Меньше">−</button>
          <span>${item.qty}</span>
          <button type="button" data-inc="${item.id}" aria-label="Больше">+</button>
          <button type="button" data-remove="${item.id}">Удалить</button>
        </div>
      `;
      els.items.appendChild(row);
      summaryLines.push(
        `<p>${item.name} × ${item.qty} — <strong>${money(item.price * item.qty)}</strong></p>`
      );
    }

    summaryLines.push(`<p><strong>Итого: ${money(sum)}</strong></p>`);
    if (saved) summaryLines.push(`<p>Экономия: ${money(saved)}</p>`);
    els.summary.innerHTML = summaryLines.join("");
  }

  document.getElementById("product-grid").addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const card = btn.closest(".product");
    addItem({
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      old: Number(card.dataset.old),
    });
  });

  els.items.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.inc) setQty(t.dataset.inc, (cart.get(t.dataset.inc)?.qty || 0) + 1);
    if (t.dataset.dec) setQty(t.dataset.dec, (cart.get(t.dataset.dec)?.qty || 0) - 1);
    if (t.dataset.remove) setQty(t.dataset.remove, 0);
  });

  els.open.addEventListener("click", openCart);
  els.close.addEventListener("click", closeCart);
  els.backdrop.addEventListener("click", closeCart);
  els.goCheckout.addEventListener("click", closeCart);

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.size === 0) {
      openCart();
      return;
    }
    if (!els.form.reportValidity()) return;
    els.success.hidden = false;
    els.form.reset();
    cart.clear();
    render();
  });

  let remain = 2 * 3600 + 14 * 60 + 37;
  function tick() {
    if (remain <= 0) remain = 3 * 3600;
    const h = String(Math.floor(remain / 3600)).padStart(2, "0");
    const m = String(Math.floor((remain % 3600) / 60)).padStart(2, "0");
    const s = String(remain % 60).padStart(2, "0");
    els.countdown.textContent = `${h}:${m}:${s}`;
    remain -= 1;
  }
  tick();
  setInterval(tick, 1000);

  setInterval(() => {
    const base = 42;
    els.viewers.textContent = String(base + Math.floor(Math.random() * 18));
  }, 4200);

  render();
})();
