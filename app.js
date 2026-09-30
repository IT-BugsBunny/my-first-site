(function () {
  const I18N = {
    ru: {
      pageTitle: "Обо мне",
      photoAlt: "Фото",
      hello: "Привет, меня зовут Антон",
      subtitle: "Изучаю веб-разработку с помощью ИИ",
      skillsTitle: "Мои навыки",
      skill1: "Linux / администрирование серверов",
      skill2: "HTML / CSS / JavaScript",
      skill3: "Работа с ИИ-инструментами",
      portfolioTitle: "Портфолио",
      portfolioIntro:
        "Живые демо в отдельной вкладке. Внутри каждой страницы — краткая инструкция, что нажать и что должно произойти.",
      catWeb: "Веб-разработка",
      catDevops: "DevOps и администрирование",
      contactTitle: "Связаться со мной",
      projSiteDesc:
        "Личная визитка на HTML/CSS: навыки, портфолио и контакты. Эта страница и есть демо.",
      projDeckDesc:
        "Терминал в браузере. Как проверить: откройте Demo → введите <code>help</code> → Enter; дальше <code>neofetch</code>, <code>skills</code>, <code>clear</code>.",
      projPassDesc:
        "Генератор паролей. Как проверить: ползунок длины, галочки A–Z / a–z / цифры / символы, кнопки Generate и Copy.",
      projLaunchDesc:
        "Мини-лендинг SaaS. Как проверить: «К форме» → введите email → Get early access — появится подтверждение без сервера.",
      projTerraTitle: "Terra — ресторан",
      projTerraDesc:
        "Лендинг итальянского ресторана: меню с фото, галерея, бронь стола. Как проверить: Demo → форма брони → «Отправить заявку».",
      projCleanTitle: "Чистый Дом — услуги",
      projCleanDesc:
        "Универсальный лендинг услуг (клининг): сетка с ценами, отзывы, заявка, звонок/WhatsApp. Как проверить: Demo → форма → «Отправить заявку».",
      projCoachTitle: "MIRA VOLK — тренер",
      projCoachDesc:
        "Лендинг коуча: dark editorial, блок «Обо мне», тарифы, CTA в WhatsApp. Как проверить: Demo → «Записаться на пробную».",
      projShopTitle: "LUMI — магазин",
      projShopDesc:
        "Яркий одностраничный магазин: сетка цветов, мини-корзина, форма заказа, таймер и соцдоказательства. Как проверить: Demo → «Купить» → корзина → оформить.",
      projRealtyTitle: "KONTUR — недвижимость",
      projRealtyDesc:
        "Proptech-каталог: сетка объектов, живые фильтры по комнатам/цене, заявка на просмотр. Как проверить: Demo → фильтры → «Записаться на просмотр».",
      projSaasTitle: "RIVET — SaaS",
      projSaasDesc:
        "Dev-platform лендинг: терминал с typing-demo, live-метрики, feature flag и тарифы Free/Pro/Enterprise. Как проверить: Demo → флаг → Pricing → Yearly.",
      projEventTitle: "OPEN STAGE — вебинар",
      projEventDesc:
        "Лендинг события: живой countdown до старта, программа по таймингу, валидация регистрации (имя, email, согласие). Как проверить: Demo → таймер → «Регистрация» → отправить с ошибками и с валидными данными.",
      projBarberTitle: "FORM — барбершоп",
      projBarberDesc:
        "Лендинг барбершопа: прайс, до/после слайдер, календарь записи. Как проверить: Demo → «Работы» (ползунок) → день в календаре → слот → «Подтвердить запись».",
      projPulseDesc:
        "Панель мониторинга. Как проверить: подождите 1–2 сек — метрики и лог обновятся сами, worker-queue может сменить статус.",
      projPipeDesc:
        "Симуляция CI/CD: сборка, тесты, деплой и прод. Как проверить: Demo → «Запустить деплой» — этапы идут по очереди, лог пишется построчно; примерно каждый пятый запуск падает на Test.",
      projFleetDesc:
        "Панель управления контейнерами. Как проверить: Demo → redis уже stopped → Start (зелёная точка ~0.5 с); Restart — жёлтый статус на секунду; Logs — строки лога сервиса.",
      projVaultDesc:
        "Резервное копирование с историей и восстановлением. Как проверить: Demo → «Запустить бэкап сейчас» — прогресс около 3 секунд и новая запись «Успешно»; Restore у успешного бэкапа → подтверждение → «Данные восстановлены». У статуса «Ошибка» Restore недоступен.",
      projLogDesc:
        "Агрегатор логов. Как проверить: Demo → поиск по слову timeout; кнопки ERROR / WARN / INFO фильтруют ленту. Каждые 2–3 секунды сверху появляется новая строка. Две ошибки подряд за 3 секунды — предупреждение «Обнаружена серия ошибок», график растёт на ERROR.",
    },
    en: {
      pageTitle: "About me",
      photoAlt: "Photo",
      hello: "Hi, my name is Anton",
      subtitle: "Learning web development with AI",
      skillsTitle: "My skills",
      skill1: "Linux / server administration",
      skill2: "HTML / CSS / JavaScript",
      skill3: "Working with AI tools",
      portfolioTitle: "Portfolio",
      portfolioIntro:
        "Live demos open in a new tab. Each page has a short guide on what to click and what should happen.",
      catWeb: "Web development",
      catDevops: "DevOps & administration",
      contactTitle: "Contact me",
      projSiteDesc:
        "Personal HTML/CSS card: skills, portfolio, and contacts. This page is the demo.",
      projDeckDesc:
        "A terminal in the browser. Try it: open Demo → type <code>help</code> → Enter; then <code>neofetch</code>, <code>skills</code>, <code>clear</code>.",
      projPassDesc:
        "Password generator. Try: length slider, A–Z / a–z / digits / symbols checkboxes, Generate and Copy.",
      projLaunchDesc:
        "Mini SaaS landing. Try: go to the form → enter email → Get early access — confirmation appears with no server.",
      projTerraTitle: "Terra — restaurant",
      projTerraDesc:
        "Italian restaurant landing: photo menu, gallery, table booking. Try: Demo → booking form → Submit.",
      projCleanTitle: "Clean Home — services",
      projCleanDesc:
        "Service landing (cleaning): price grid, reviews, lead form, call/WhatsApp. Try: Demo → form → Submit.",
      projCoachTitle: "MIRA VOLK — coach",
      projCoachDesc:
        "Coach landing: dark editorial, About block, pricing, WhatsApp CTA. Try: Demo → Book a trial.",
      projShopTitle: "LUMI — shop",
      projShopDesc:
        "Bright one-page shop: color grid, mini-cart, checkout form, timer and social proof. Try: Demo → Buy → cart → checkout.",
      projRealtyTitle: "KONTUR — real estate",
      projRealtyDesc:
        "Proptech catalog: property grid, live room/price filters, viewing request. Try: Demo → filters → Book a viewing.",
      projSaasTitle: "RIVET — SaaS",
      projSaasDesc:
        "Dev-platform landing: typing terminal, live metrics, feature flag, Free/Pro/Enterprise pricing. Try: Demo → flag → Pricing → Yearly.",
      projEventTitle: "OPEN STAGE — webinar",
      projEventDesc:
        "Event landing: live countdown, timed agenda, registration validation (name, email, consent). Try: Demo → timer → Register → submit with errors and with valid data.",
      projBarberTitle: "FORM — barbershop",
      projBarberDesc:
        "Barbershop landing: price list, before/after slider, booking calendar. Try: Demo → Works (slider) → day → slot → Confirm.",
      projPulseDesc:
        "Monitoring panel. Try: wait 1–2 sec — metrics and log update on their own; worker-queue may change status.",
      projPipeDesc:
        "CI/CD simulation: build, tests, deploy, and production. Try: Demo → Run deploy — stages advance in order and the log fills line by line; about one run in five fails at Test.",
      projFleetDesc:
        "Container control panel. Try: Demo → redis starts stopped → Start (green dot after ~0.5s); Restart shows yellow for a second; Logs opens sample lines for that service.",
      projVaultDesc:
        "Backup system with history and restore. Try: Demo → Run backup now — about 3 seconds of progress, then a new Success entry; Restore on a successful backup → confirm → Data restored. Restore is disabled on the failed entry.",
      projLogDesc:
        "Log aggregator. Try: Demo → search for timeout; ERROR / WARN / INFO buttons filter the stream. A new line appears at the top every 2–3 seconds. Two errors in a row within 3 seconds raise an alert, and the chart grows on each ERROR.",
    },
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.ru;
    document.documentElement.lang = lang;
    document.title = dict.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (value == null) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
      else el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (dict[key] != null) el.setAttribute("alt", dict[key]);
    });

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem("site-lang", lang);
    } catch (_) {}
  }

  const saved = (() => {
    try {
      return localStorage.getItem("site-lang");
    } catch (_) {
      return null;
    }
  })();
  const initial = saved === "en" || saved === "ru" ? saved : "ru";
  applyLang(initial);

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-set-lang")));
  });

  // Sticky portfolio head / categories
  const scrollRoot = document.getElementById("page-scroll");
  const projectsHead = document.getElementById("projects-head");
  const container = document.querySelector(".container");
  const stickyTitles = document.querySelectorAll(".projects-category");

  if (!scrollRoot || !projectsHead || !container) return;

  function getScrollTop() {
    if (scrollRoot.scrollTop > 0) return scrollRoot.scrollTop;
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  function updateHeadOffset() {
    const height = Math.ceil(projectsHead.getBoundingClientRect().height);
    container.style.setProperty("--projects-head-height", `${height}px`);
  }

  function updateStuckState() {
    const headBottom = projectsHead.getBoundingClientRect().bottom;
    const scrolled = getScrollTop() > 2;

    projectsHead.classList.toggle("is-stuck", scrolled);

    stickyTitles.forEach((title) => {
      const top = title.getBoundingClientRect().top;
      const stuck = Math.abs(top - headBottom) < 2 || top <= headBottom + 1;
      const stillInView =
        title.parentElement.getBoundingClientRect().bottom > headBottom + 24;
      title.classList.toggle("is-stuck", stuck && stillInView && scrolled);
    });
  }

  function refresh() {
    updateHeadOffset();
    updateStuckState();
  }

  refresh();
  scrollRoot.addEventListener("scroll", updateStuckState, { passive: true });
  window.addEventListener("scroll", updateStuckState, { passive: true });
  window.addEventListener("resize", refresh);
  window.addEventListener("orientationchange", refresh);
})();
