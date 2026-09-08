(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("lang");
  const start = saved === "zh" || saved === "en" ? saved : "en";

  function setLang(lang) {
    root.lang = lang;
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
    document.title =
      lang === "zh" ? "卫雷 · AI for Science" : "Lei Wei · AI for Science";
  }

  setLang(start);

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  const links = [...document.querySelectorAll("nav a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section;
    });
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current.id);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
