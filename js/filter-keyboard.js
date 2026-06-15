// Arrow key navigation + keyboard open for filter dropdowns
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-wrapper').forEach(wrapper => {
    const dropdown = wrapper.querySelector('.filter-dropdown');
    const btn = wrapper.querySelector('.filter-btn');
    if (!dropdown || !btn) return;

    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        dropdown.classList.toggle('visible');
        if (dropdown.classList.contains('visible')) {
          dropdown.querySelector('input[type="checkbox"]')?.focus();
        }
      }
    });

    wrapper.addEventListener('keydown', e => {
      if (!dropdown.classList.contains('visible')) return;
      const checkboxes = [...dropdown.querySelectorAll('input[type="checkbox"]')];
      const idx = checkboxes.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        checkboxes[Math.min(idx + 1, checkboxes.length - 1)]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        checkboxes[Math.max(idx - 1, 0)]?.focus();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('visible');
        btn.focus();
      } else if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        dropdown.classList.remove('visible');
        btn.focus();
      }
    });
  });
});