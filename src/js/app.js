(function ($) {
  'use strict';

  var routes = {
    '/': { label: 'Elige una herramienta de suerte', nav: 'Inicio' },
    '/coin': { label: 'Lanzar una moneda', nav: 'Moneda' },
    '/number': { label: 'Número aleatorio', nav: 'Número' },
    '/raffle': { label: 'Sorteo', nav: 'Sorteo' }
  };

  var navItems = [
    { route: '/', label: 'Inicio', icon: 'bi-house-fill' },
    { route: '/coin', label: 'Moneda', icon: 'bi-circle-fill' },
    { route: '/number', label: 'Número', icon: 'bi-dice-5-fill' },
    { route: '/raffle', label: 'Sorteo', icon: 'bi-trophy-fill' }
  ];

  var toolItems = [
    { route: '/coin', title: 'Lanza una moneda', description: 'Deja que el azar decida.', icon: 'bi-circle-fill', tone: 'tone-yellow', number: '01' },
    { route: '/number', title: 'Número aleatorio', description: 'Elige un número de tu rango.', icon: 'bi-dice-5-fill', tone: 'tone-coral', number: '02' },
    { route: '/raffle', title: 'Sorteo', description: 'Da a cada nombre una oportunidad.', icon: 'bi-trophy-fill', tone: 'tone-mint', number: '03' }
  ];

  function escapeHtml(value) {
    return $('<div>').text(String(value)).html();
  }

  function randomInteger(min, max) {
    var range = max - min + 1;
    var values = new Uint32Array(1);
    var limit = Math.floor(0x100000000 / range) * range;
    var value;

    do {
      window.crypto.getRandomValues(values);
      value = values[0];
    } while (value >= limit);

    return (value % range) + min;
  }

  function currentRoute() {
    var route = window.location.hash.slice(1) || '/';
    return routes[route] ? route : '/';
  }

  function linkFor(route) {
    return '#' + route;
  }

  function renderHeader(route) {
    var backLink = route !== '/' ? '<a class="menu-link d-inline-flex align-items-center gap-2" href="#/"><i class="bi bi-arrow-left" aria-hidden="true"></i>Menú</a>' : '';
    $('#site-header').html(
      '<div class="d-flex align-items-center justify-content-between gap-3">' +
        '<a class="brand-link d-inline-flex align-items-center gap-3" href="#/">' +
          '<span class="brand-mark"><i class="bi bi-stars" aria-hidden="true"></i></span>' +
          '<span>pura suerte</span>' +
        '</a>' + backLink +
      '</div>'
    );
  }

  function renderNavigation(route) {
    var html = '<div class="bottom-nav-inner">';
    navItems.forEach(function (item) {
      var active = route === item.route ? ' active' : '';
      var current = route === item.route ? ' aria-current="page"' : '';
      html += '<a class="nav-link' + active + '" href="' + linkFor(item.route) + '"' + current + '>' +
        '<i class="bi ' + item.icon + '" aria-hidden="true"></i>' + item.label + '</a>';
    });
    html += '</div>';
    $('#bottom-nav').html(html);
  }

  function pageIntro(icon, tone, eyebrow, title, description) {
    return '<section class="mb-5">' +
      '<div class="page-icon ' + tone + '"><i class="bi ' + icon + '" aria-hidden="true"></i></div>' +
      '<p class="eyebrow ' + tone.replace('tone-', 'text-') + '">' + eyebrow + '</p>' +
      '<h1 class="page-heading">' + title + '</h1>' +
      '<p class="page-description">' + description + '</p>' +
    '</section>';
  }

  function resultPanel(label, value, tone) {
    return '<div class="result-panel ' + tone + '" aria-live="polite">' +
      '<p class="result-label">' + label + '</p>' +
      '<div class="result-value">' + escapeHtml(value) + '</div>' +
    '</div>';
  }

  function renderHome() {
    var cards = toolItems.map(function (item) {
      return '<a class="tool-card" href="' + linkFor(item.route) + '">' +
        '<div class="d-flex align-items-start justify-content-between">' +
          '<span class="tool-icon ' + item.tone + '"><i class="bi ' + item.icon + '" aria-hidden="true"></i></span>' +
          '<span class="tool-number">' + item.number + '</span>' +
        '</div>' +
        '<div>' +
          '<div class="d-flex align-items-center justify-content-between gap-3 mb-2">' +
            '<h2 class="tool-title">' + item.title + '</h2>' +
            '<i class="bi bi-arrow-up-right text-white-50" aria-hidden="true"></i>' +
          '</div>' +
          '<p class="tool-description">' + item.description + '</p>' +
        '</div>' +
      '</a>';
    }).join('');

    return '<div>' +
      '<section class="mb-5">' +
        '<p class="eyebrow text-yellow">Un poco de ayuda del universo</p>' +
        '<h1 class="page-heading">Crea tu propia suerte.</h1>' +
        '<p class="page-description">Tres pequeñas herramientas para cuando necesitas un empujón, un número o un nombre.</p>' +
      '</section>' +
      '<section aria-labelledby="tools-heading">' +
        '<div class="d-flex align-items-end justify-content-between gap-3 mb-3">' +
          '<h2 id="tools-heading" class="h2 font-display fw-bold mb-0">Elige tu herramienta</h2>' +
          '<span class="d-none d-sm-block text-white-50 small">Elige tu tipo de azar</span>' +
        '</div>' +
        '<div class="row g-3">' + cards.split('</a>').filter(Boolean).map(function (card) { return '<div class="col-md-4">' + card + '</a></div>'; }).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function renderCoin() {
    return '<div>' +
      pageIntro('bi-circle-fill', 'tone-yellow', 'Lanza una moneda', '¿Cara o cruz?', 'Deja la decisión en manos del azar por un momento.') +
      '<section class="tool-panel coin-stage mb-4">' +
        '<div class="coin-perspective"><div id="coin" class="coin">' +
          '<div class="coin-face"><div class="coin-face-inner"><span class="coin-letter">Cara</span></div></div>' +
          '<div class="coin-face coin-tail"><div class="coin-face-inner"><span class="coin-letter">Cruz</span></div></div>' +
        '</div></div>' +
        '<button id="flip-button" type="button" class="action-button btn-light w-100" style="max-width: 320px">Lanzar la moneda</button>' +
      '</section>' +
      '<div id="coin-result"></div>' +
    '</div>';
  }

  function renderNumber() {
    return '<div>' +
      pageIntro('bi-dice-5-fill', 'tone-coral', 'Número aleatorio', 'Define tu rango.', 'Marca los límites y encontraremos el número que se esconde entre ellos.') +
      '<section class="tool-panel mb-4">' +
        '<div class="row g-3 mb-4">' +
          '<div class="col-sm-6"><label class="form-label" for="minimum">Mínimo</label><input id="minimum" class="form-control mt-2" type="number" inputmode="numeric" value="1"></div>' +
          '<div class="col-sm-6"><label class="form-label" for="maximum">Máximo</label><input id="maximum" class="form-control mt-2" type="number" inputmode="numeric" value="100"></div>' +
        '</div>' +
        '<p id="number-error" class="mb-3 text-coral fw-bold small" role="alert"></p>' +
        '<button id="number-button" type="button" class="action-button tone-coral w-100">Generar un número</button>' +
      '</section>' +
      '<div id="number-result"></div>' +
    '</div>';
  }

  function renderRaffle() {
    return '<div>' +
      pageIntro('bi-trophy-fill', 'tone-mint', 'Sorteo', '¿Quién recibe la buena noticia?', 'Añade un nombre por línea. Todos tienen una oportunidad justa.') +
      '<section class="tool-panel mb-4">' +
        '<label class="form-label d-block" for="entries">Nombres o participantes</label>' +
        '<textarea id="entries" class="form-control mt-2" rows="7" placeholder="Maya&#10;Luis&#10;Sam"></textarea>' +
        '<div class="d-flex align-items-center justify-content-between gap-3 mt-3 text-white-50 small"><span id="entry-count">0 participantes listos</span><span id="duplicate-note"></span></div>' +
        '<button id="raffle-button" type="button" class="action-button tone-mint w-100 mt-4" disabled>Elegir ganador</button>' +
      '</section>' +
      '<div id="raffle-result"></div>' +
    '</div>';
  }

  function parseEntries(value) {
    return value.split('\n').map(function (entry) { return entry.trim(); }).filter(Boolean);
  }

  function bindCoin() {
    var flipping = false;
    $('#flip-button').on('click', function () {
      if (flipping) return;
      flipping = true;
      $('#coin').addClass('is-flipping');
      $('#flip-button').prop('disabled', true).text('En el aire...');
      window.setTimeout(function () {
        var result = randomInteger(0, 1) === 0 ? 'Cara' : 'Cruz';
        $('#coin').toggleClass('is-showing-tail', result === 'Cruz');
        $('#coin-result').html(resultPanel('El resultado es', result, 'tone-yellow'));
        $('#coin').removeClass('is-flipping');
        $('#flip-button').prop('disabled', false).text('Lanzar la moneda');
        flipping = false;
      }, 900);
    });
  }

  function bindNumber() {
    $('#number-button').on('click', function () {
      var minimum = Number($('#minimum').val());
      var maximum = Number($('#maximum').val());
      var error = '';
      if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) error = 'Usa números enteros para ambos límites.';
      if (!error && minimum > maximum) error = 'El mínimo debe ser menor o igual que el máximo.';
      $('#number-error').text(error);
      if (error) {
        $('#number-result').empty();
        return;
      }
      $('#number-result').html(resultPanel('Tu número', randomInteger(minimum, maximum), 'tone-coral'));
    });
  }

  function bindRaffle() {
    function updateEntries() {
      var entries = parseEntries($('#entries').val());
      var countLabel = entries.length + ' ' + (entries.length === 1 ? 'participante listo' : 'participantes listos');
      $('#entry-count').text(countLabel);
      $('#duplicate-note').text(entries.length ? 'Los duplicados cuentan por separado' : '');
      $('#raffle-button').prop('disabled', entries.length === 0);
      return entries;
    }
    $('#entries').on('input', updateEntries);
    $('#raffle-button').on('click', function () {
      var entries = updateEntries();
      if (!entries.length) return;
      $('#raffle-result').html(resultPanel('El ganador es', entries[randomInteger(0, entries.length - 1)], 'tone-mint'));
    });
  }

  function render(route) {
    renderHeader(route);
    renderNavigation(route);
    $('#current-tool').text(routes[route].label);
    if (route === '/') $('#main-content').html(renderHome());
    if (route === '/coin') { $('#main-content').html(renderCoin()); bindCoin(); }
    if (route === '/number') { $('#main-content').html(renderNumber()); bindNumber(); }
    if (route === '/raffle') { $('#main-content').html(renderRaffle()); bindRaffle(); }
    $('#main-content').trigger('focus');
  }

  $(window).on('hashchange', function () { render(currentRoute()); });
  $(function () { render(currentRoute()); });
})(jQuery);
