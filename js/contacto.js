/**
 * Contacto — mensaje de éxito tras redirección de Formspree (?enviado=ok)
 */
(function () {
  'use strict';

  function init() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('enviado') !== 'ok') return;

    var alert = document.getElementById('contact-success');
    var form = document.getElementById('contact-form');
    if (alert) {
      alert.hidden = false;
    }
    if (form) {
      form.hidden = true;
    }

    if (alert) {
      alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
