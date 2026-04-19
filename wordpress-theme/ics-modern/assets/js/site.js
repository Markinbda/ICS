/*
 * Lightweight interaction script for ICS theme.
 */
(() => {
  const quoteLinks = document.querySelectorAll('a[href="#request-a-quote"]');
  if (!quoteLinks.length) {
    return;
  }

  quoteLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.add('ics-quote-clicked');
      window.setTimeout(() => document.body.classList.remove('ics-quote-clicked'), 200);
    });
  });
})();
