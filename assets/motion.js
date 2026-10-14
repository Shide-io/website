// Apparition des sections au défilement : titre, puis texte, puis visuels, décalés de 70 ms.
// Le contenu n'est masqué que si ce script tourne ; sans lui, tout reste visible.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var PARTS = 'h1, h2, h3, main section p, main article, main li, main figure, main details, #detection > div > div > div';
  var STEP = 70;

  function setup() {
    var sections = document.querySelectorAll('#dc-root main section');
    if (!sections.length) return false;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    sections.forEach(function (section) {
      var i = 0;
      section.querySelectorAll(PARTS).forEach(function (el) {
        // une seule animation par bloc : on ignore ce qui est déjà dans un bloc animé
        if (el.parentElement.closest('.rv') || el.closest('[data-ui] *')) return;
        el.classList.add('rv');
        el.style.setProperty('--d', Math.min(i++, 6) * STEP + 'ms');
        io.observe(el);
      });
    });
    return true;
  }

  // la page est rendue par support.js après le chargement : on attend qu'elle existe
  if (!setup()) {
    var mo = new MutationObserver(function () {
      if (setup()) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
