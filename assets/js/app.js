(() => {
  const config = window.TOKOELOK_CONFIG || {};
  const products = Array.isArray(window.TOKOELOK_PRODUCTS)
    ? window.TOKOELOK_PRODUCTS
    : [];

  const targetLink =
    config.targetLink ||
    "https://fourdi.link/ELOK";

  const formatPrice = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "";
    }

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: config.currency || "IDR",
      maximumFractionDigits: 0
    }).format(number);
  };

  window.TOKOELOK = {
    config,
    products,
    formatPrice,
    targetLink
  };

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    });
  }

  document.querySelectorAll("[data-wa-general]").forEach((link) => {
    link.href = targetLink;
    link.target = "_blank";
    link.rel = "nofollow noopener";
  });
})();
