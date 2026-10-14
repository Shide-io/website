// Anti-clickjacking : GitHub Pages ne permet pas d'envoyer frame-ancestors / X-Frame-Options,
// et ces directives sont ignorées en <meta>. Si la page est chargée dans une iframe, on la masque
// et on tente d'en sortir.
if (window.top !== window.self) {
  document.documentElement.style.display = 'none';
  try { window.top.location.replace(window.self.location.href); } catch (e) {}
}
