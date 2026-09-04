(() => {
  const config = window.TOKOELOK_CONFIG || {};
  const products = Array.isArray(window.TOKOELOK_PRODUCTS) ? window.TOKOELOK_PRODUCTS : [];
  const targetLink = config.targetLink || "https://fourdi.link/ELOK";

  window.TOKOELOK = { config, products, targetLink };

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuBtn.classList.toggle("active", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-elok-link], [data-wa-general]").forEach((link) => {
    link.href = targetLink;
    link.target = "_blank";
    link.rel = "nofollow noopener";
  });

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
