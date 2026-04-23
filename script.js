const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const countUp = (el) => {
  const target = Number(el.dataset.target || 0);
  const duration = 1450;
  const start = performance.now();

  const frame = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    el.textContent = Math.floor(target * eased).toString();
    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal-on-scroll").forEach((item) => revealObserver.observe(item));
if (!prefersReducedMotion) {
  document.querySelectorAll("[data-target]").forEach((item) => countUp(item));
}

const tiltCards = document.querySelectorAll(".tilt");

if (!prefersReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}
