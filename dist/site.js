const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.primary-nav a');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? 'Menu' : 'Close';
  header?.classList.toggle('is-menu-open', !open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu';
    header?.classList.remove('is-menu-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || menuButton?.getAttribute('aria-expanded') !== 'true') return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  header?.classList.remove('is-menu-open');
  menuButton.focus();
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

const sectionLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const linkedSections = sectionLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
  .filter(({ section }) => section);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    sectionLinks.forEach((link) => link.removeAttribute('aria-current'));
    linkedSections.find(({ section }) => section === current.target)?.link.setAttribute('aria-current', 'location');
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4] });

  linkedSections.forEach(({ section }) => navObserver.observe(section));
}
