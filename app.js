(function () {
  const scrollRoot = document.getElementById("page-scroll");
  const projectsHead = document.getElementById("projects-head");
  const container = document.querySelector(".container");
  const stickyTitles = document.querySelectorAll(".projects-category");

  if (!scrollRoot || !projectsHead || !container) return;

  function getScrollTop() {
    // Desktop uses nested .page-scroll; mobile uses document scroll
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
