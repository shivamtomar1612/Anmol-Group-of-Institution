(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('.gallery-item')];
  const filters = [...document.querySelectorAll('[data-gallery-filter]')];
  const count = document.querySelector('[data-gallery-count]');
  const dialog = document.querySelector('[data-lightbox]');
  const image = dialog?.querySelector('[data-lightbox-image]');
  const caption = dialog?.querySelector('[data-lightbox-caption]');
  const title = dialog?.querySelector('[data-lightbox-title]');
  let visibleItems = items;
  let currentIndex = 0;

  const setFilter = (filter) => {
    visibleItems = items.filter((item) => filter === 'all' || item.dataset.category === filter);
    items.forEach((item) => { item.hidden = !visibleItems.includes(item); });
    filters.forEach((button) => {
      const active = button.dataset.galleryFilter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (count) count.textContent = String(visibleItems.length);
    const url = new URL(window.location.href);
    if (filter === 'all') url.searchParams.delete('filter'); else url.searchParams.set('filter', filter);
    history.replaceState({}, '', url);
  };

  const show = (index) => {
    if (!visibleItems.length || !dialog || !image) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const trigger = visibleItems[currentIndex].querySelector('.gallery-open');
    image.src = trigger.dataset.full;
    image.alt = trigger.dataset.alt;
    if (caption) caption.textContent = trigger.dataset.caption;
    if (title) title.textContent = `${trigger.dataset.caption} · ${currentIndex + 1} of ${visibleItems.length}`;
  };

  filters.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.galleryFilter)));
  items.forEach((item) => item.querySelector('.gallery-open').addEventListener('click', () => {
    show(visibleItems.indexOf(item));
    dialog.showModal();
  }));
  dialog?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('[data-lightbox-previous]')?.addEventListener('click', () => show(currentIndex - 1));
  dialog?.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(currentIndex + 1));
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });

  const requested = new URLSearchParams(window.location.search).get('filter');
  setFilter(filters.some((button) => button.dataset.galleryFilter === requested) ? requested : 'all');
})();
