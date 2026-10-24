(function ($) {
  'use strict';

  var locale = 'es';
  var translations = {
    es: {
      routes: {
        home: 'Elige una herramienta de suerte',
        coin: 'Lanza una moneda',
        number: 'Número aleatorio',
        raffle: 'Sorteo'
      },
      nav: {
        home: 'Inicio',
        coin: 'Moneda',
        number: 'Número',
        raffle: 'Sorteo'
      },
      header: { menu: 'Menú' },
      home: {
        eyebrow: 'Un poco de ayuda del universo',
        title: 'Crea tu propia suerte.',
        description: 'Tres pequeñas herramientas para cuando necesitas un empujón, un número o un nombre.',
        heading: 'Elige tu herramienta',
        subheading: 'Elige tu tipo de azar'
      },
      tools: {
        coin: { title: 'Lanza una moneda', description: 'Deja que el azar decida.' },
        number: { title: 'Número aleatorio', description: 'Elige un número dentro de tu rango.' },
        raffle: { title: 'Sorteo', description: 'Dale a cada nombre una oportunidad justa.' }
      },
      coin: {
        eyebrow: 'Lanza una moneda', title: '¿Cara o cruz?', description: 'Deja la decisión en manos del azar por un momento.',
        action: 'Lanzar la moneda', waiting: 'En el aire...', resultLabel: 'El resultado es', heads: 'Cara', tails: 'Cruz'
      },
      number: {
        eyebrow: 'Número aleatorio', title: 'Define tu rango.', description: 'Marca los límites. Encontraremos el número que se esconde entre ellos.',
        minimum: 'Mínimo', maximum: 'Máximo', action: 'Generar un número', invalid: 'Usa números enteros para ambos límites.', order: 'El mínimo debe ser menor o igual que el máximo.', resultLabel: 'Tu número'
      },
      raffle: {
        eyebrow: 'Sorteo', title: '¿Quién recibe las buenas noticias?', description: 'Añade un nombre por línea. Todos tendrán una oportunidad justa.',
        entries: 'Nombres o participantes', placeholder: 'Maya\nLuis\nSam', readyOne: 'participante listo', readyMany: 'participantes listos', duplicates: 'Los duplicados cuentan por separado', action: 'Elegir ganador', resultLabel: 'El ganador es'
      }
    }
  };

  function t(path) {
    return path.split('.').reduce(function (value, key) { return value[key]; }, translations[locale]);
  }

  var routes = {
    '/': { label: t('routes.home'), nav: t('nav.home') },
    '/coin': { label: t('routes.coin'), nav: t('nav.coin') },
    '/number': { label: t('routes.number'), nav: t('nav.number') },
    '/raffle': { label: t('routes.raffle'), nav: t('nav.raffle') }
  };

  var navItems = [
    { route: '/', label: t('nav.home'), icon: 'bi-house-fill' },
    { route: '/coin', label: t('nav.coin'), icon: 'bi-circle-fill' },
    { route: '/number', label: t('nav.number'), icon: 'bi-dice-5-fill' },
    { route: '/raffle', label: t('nav.raffle'), icon: 'bi-trophy-fill' }
  ];

  var toolItems = [
    { route: '/coin', title: t('tools.coin.title'), description: t('tools.coin.description'), icon: 'bi-circle-fill', tone: 'tone-yellow', number: '01' },
    { route: '/number', title: t('tools.number.title'), description: t('tools.number.description'), icon: 'bi-dice-5-fill', tone: 'tone-coral', number: '02' },
    { route: '/raffle', title: t('tools.raffle.title'), description: t('tools.raffle.description'), icon: 'bi-trophy-fill', tone: 'tone-mint', number: '03' }
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
    var backLink = route !== '/' ? '<a class="menu-link d-inline-flex align-items-center gap-2" href="#/"><i class="bi bi-arrow-left" aria-hidden="true"></i>' + t('header.menu') + '</a>' : '';
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
        '<p class="eyebrow text-yellow">' + t('home.eyebrow') + '</p>' +
        '<h1 class="page-heading">' + t('home.title') + '</h1>' +
        '<p class="page-description">' + t('home.description') + '</p>' +
      '</section>' +
      '<section aria-labelledby="tools-heading">' +
        '<div class="d-flex align-items-end justify-content-between gap-3 mb-3">' +
          '<h2 id="tools-heading" class="h2 font-display fw-bold mb-0">' + t('home.heading') + '</h2>' +
          '<span class="d-none d-sm-block text-white-50 small">' + t('home.subheading') + '</span>' +
        '</div>' +
        '<div class="row g-3">' + cards.split('</a>').filter(Boolean).map(function (card) { return '<div class="col-md-4">' + card + '</a></div>'; }).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function renderCoin() {
    return '<div>' +
      pageIntro('bi-circle-fill', 'tone-yellow', t('coin.eyebrow'), t('coin.title'), t('coin.description')) +
      '<section class="tool-panel coin-stage mb-4">' +
        '<div class="coin-perspective"><div id="coin" class="coin">' +
          '<div class="coin-face"><div class="coin-face-inner"><span class="coin-letter">H</span></div></div>' +
          '<div class="coin-face coin-tail"><div class="coin-face-inner"><span class="coin-letter">T</span></div></div>' +
        '</div></div>' +
        '<button id="flip-button" type="button" class="action-button btn-light w-100" style="max-width: 320px">' + t('coin.action') + '</button>' +
      '</section>' +
      '<div id="coin-result"></div>' +
    '</div>';
  }

  function renderNumber() {
    return '<div>' +
      pageIntro('bi-dice-5-fill', 'tone-coral', t('number.eyebrow'), t('number.title'), t('number.description')) +
      '<section class="tool-panel mb-4">' +
        '<div class="row g-3 mb-4">' +
          '<div class="col-sm-6"><label class="form-label" for="minimum">' + t('number.minimum') + '</label><input id="minimum" class="form-control mt-2" type="number" inputmode="numeric" value="1"></div>' +
          '<div class="col-sm-6"><label class="form-label" for="maximum">' + t('number.maximum') + '</label><input id="maximum" class="form-control mt-2" type="number" inputmode="numeric" value="100"></div>' +
        '</div>' +
        '<p id="number-error" class="mb-3 text-coral fw-bold small" role="alert"></p>' +
        '<button id="number-button" type="button" class="action-button tone-coral w-100">' + t('number.action') + '</button>' +
      '</section>' +
      '<div id="number-result"></div>' +
    '</div>';
  }

  function renderRaffle() {
    return '<div>' +
      pageIntro('bi-trophy-fill', 'tone-mint', t('raffle.eyebrow'), t('raffle.title'), t('raffle.description')) +
      '<section class="tool-panel mb-4">' +
        '<label class="form-label d-block" for="entries">' + t('raffle.entries') + '</label>' +
        '<textarea id="entries" class="form-control mt-2" rows="7" placeholder="' + t('raffle.placeholder').replaceAll('\n', '&#10;') + '"></textarea>' +
        '<div class="d-flex align-items-center justify-content-between gap-3 mt-3 text-white-50 small"><span id="entry-count">0 ' + t('raffle.readyMany') + '</span><span id="duplicate-note"></span></div>' +
        '<button id="raffle-button" type="button" class="action-button tone-mint w-100 mt-4" disabled>' + t('raffle.action') + '</button>' +
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
      $('#flip-button').prop('disabled', true).text('In the air...');
      window.setTimeout(function () {
        var result = randomInteger(0, 1) === 0 ? t('coin.heads') : t('coin.tails');
        $('#coin-result').html(resultPanel(t('coin.resultLabel'), result, 'tone-yellow'));
        $('#coin').removeClass('is-flipping');
        $('#flip-button').prop('disabled', false).text(t('coin.action'));
        flipping = false;
      }, 900);
    });
  }

  function bindNumber() {
    $('#number-button').on('click', function () {
      var minimum = Number($('#minimum').val());
      var maximum = Number($('#maximum').val());
      var error = '';
      if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) error = t('number.invalid');
      if (!error && minimum > maximum) error = t('number.order');
      $('#number-error').text(error);
      if (error) {
        $('#number-result').empty();
        return;
      }
      $('#number-result').html(resultPanel(t('number.resultLabel'), randomInteger(minimum, maximum), 'tone-coral'));
    });
  }

  function bindRaffle() {
    function updateEntries() {
      var entries = parseEntries($('#entries').val());
      var countLabel = entries.length + ' ' + (entries.length === 1 ? t('raffle.readyOne') : t('raffle.readyMany'));
      $('#entry-count').text(countLabel);
      $('#duplicate-note').text(entries.length ? t('raffle.duplicates') : '');
      $('#raffle-button').prop('disabled', entries.length === 0);
      return entries;
    }
    $('#entries').on('input', updateEntries);
    $('#raffle-button').on('click', function () {
      var entries = updateEntries();
      if (!entries.length) return;
      $('#raffle-result').html(resultPanel(t('raffle.resultLabel'), entries[randomInteger(0, entries.length - 1)], 'tone-mint'));
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
