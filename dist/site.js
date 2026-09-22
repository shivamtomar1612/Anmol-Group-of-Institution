const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.primary-nav a');

if (menuButton) {
  menuButton.setAttribute('aria-label', 'Toggle navigation menu');
  menuButton.setAttribute('aria-haspopup', 'true');
}

const setMenuState = (open, { returnFocus = false } = {}) => {
  if (!menuButton) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  header?.classList.toggle('is-menu-open', open);
  document.body.classList.toggle('menu-open', open);
  if (returnFocus) menuButton.focus();
};

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!open);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setMenuState(false);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || menuButton?.getAttribute('aria-expanded') !== 'true') return;
  setMenuState(false, { returnFocus: true });
});

document.addEventListener('click', (event) => {
  if (!header || !menuButton || menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (!header.contains(event.target)) setMenuState(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1120 && menuButton?.getAttribute('aria-expanded') === 'true') setMenuState(false);
});

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

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
