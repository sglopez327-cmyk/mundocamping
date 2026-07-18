/**
 * Calculadoras: saco, peso mochila, Wh.
 */
(function () {
  'use strict';

  function onSubmit(id, handler) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(new FormData(form));
    });
  }

  onSubmit('calc-saco', function (fd) {
    var temp = parseFloat(fd.get('temp'));
    var sens = parseFloat(fd.get('sens'));
    var out = document.getElementById('calc-saco-out');
    if (!out || Number.isNaN(temp) || Number.isNaN(sens)) return;
    var need = Math.round((temp - 3 + sens) * 10) / 10;
    out.textContent =
      'Busca un saco con temperatura de confort de ' +
      need +
      ' °C o inferior (margen de seguridad incluido).';
  });

  onSubmit('calc-peso', function (fd) {
    var body = parseFloat(fd.get('body'));
    var pack = parseFloat(fd.get('pack'));
    var out = document.getElementById('calc-peso-out');
    if (!out || !body || Number.isNaN(pack)) return;
    var pct = Math.round((pack / body) * 1000) / 10;
    var verdict =
      pct <= 15 ? 'Muy razonable para rutas cómodas.' : pct <= 20 ? 'Aceptable si estás en forma.' : 'Pesado: intenta recortar.';
    out.textContent = 'Tu mochila es el ' + pct + '% de tu peso. ' + verdict;
  });

  onSubmit('calc-wh', function (fd) {
    var wh = parseFloat(fd.get('wh'));
    var phone = parseFloat(fd.get('phone'));
    var out = document.getElementById('calc-wh-out');
    if (!out || !wh || !phone) return;
    var usable = wh * 0.7;
    var charges = Math.round((usable / phone) * 10) / 10;
    out.textContent =
      'Estimación: ~' + charges + ' cargas de móvil (usando ~70% de los Wh por pérdidas).';
  });
})();
