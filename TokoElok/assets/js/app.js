(() => {
  const config = window.TOKOELOK_CONFIG || {};
  const products = window.TOKOELOK_PRODUCTS || [];

  const formatPrice = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: config.currency || "IDR",
    maximumFractionDigits: 0
  }).format(value);

  window.TOKOELOK = { config, products, formatPrice };

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", mobileNav.classList.contains("open") ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-wa-general]").forEach(link => {
    const msg = encodeURIComponent("Halo TOKOELOK, saya ingin bertanya tentang produk.");
    link.href = `https://wa.me/${config.whatsapp}?text=${msg}`;
  });
})();
