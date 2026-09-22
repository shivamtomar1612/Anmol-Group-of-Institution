const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.primary-nav a');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  header?.classList.toggle('is-menu-open', !open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    header?.classList.remove('is-menu-open');
  });
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

