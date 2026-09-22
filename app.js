const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const menuButton = $("#menuButton");
const navLinks = $("#navLinks");

menuButton?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !navLinks?.classList.contains("open")) return;
  navLinks.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  menuButton?.focus();
});

$$(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

const toast = (message) => {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 2200);
};

$("#copyContract")?.addEventListener("click", async () => {
  const ca = $("#contract")?.textContent?.trim();
  if (!ca) return;
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(ca);
    toast("Contract copied 🦝");
  } catch {
    const contract = $("#contract");
    if (contract) {
      const range = document.createRange();
      range.selectNodeContents(contract);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    toast("Contract selected — copy it manually");
  }
});

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach((el) => observer.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("visible"));
}
