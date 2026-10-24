(function ($) {
  'use strict';

  var translations = {
    en: {
      languageLabel: 'Switch language to Spanish', menu: 'Menu', home: 'Home', coin: 'Coin', number: 'Number', raffle: 'Raffle',
      coinTool: 'Toss a coin', numberTool: 'Random number', raffleTool: 'Raffle',
      coinDescription: 'Let chance make the call.', numberDescription: 'Pick a number in your range.', raffleDescription: 'Give every name a fair shot.',
      homeEyebrow: 'A little help from the universe', homeHeading: 'Make your own luck.',
      homeDescription: 'Three tiny tools for the moments when you want a nudge, a number, or a name.',
      pickTool: 'Pick your tool', chance: 'Choose your kind of chance',
      coinEyebrow: 'Toss a coin', coinHeading: 'Heads or tails?', coinDescriptionPage: 'Take the decision out of your hands for a second.',
      flip: 'Flip the coin', flipping: 'In the air...', callIs: 'The call is', heads: 'Heads', tails: 'Tails',
      numberEyebrow: 'Random number', numberHeading: 'Name your range.', numberDescriptionPage: 'Set the edges. We will find the number hiding between them.',
      minimum: 'Min', maximum: 'Max', generateNumber: 'Generate a number', wholeNumbers: 'Use whole numbers for both limits.',
      invalidRange: 'Your minimum must be less than or equal to your maximum.', yourNumber: 'Your number',
      raffleEyebrow: 'Raffle', raffleHeading: 'Who gets the good news?', raffleDescriptionPage: 'Add one name per line. Every line gets one fair shot.',
      entriesLabel: 'Names or entries', entriesPlaceholder: 'Maya\nLuis\nSam', entrySingular: 'entry ready', entryPlural: 'entries ready',
      duplicates: 'Duplicates count separately', pickWinner: 'Pick a winner', winnerIs: 'The winner is',
      pageDescription: 'Tiny tools for making quick decisions.'
    },
    es: {
      languageLabel: 'Cambiar idioma a inglés', menu: 'Menú', home: 'Inicio', coin: 'Moneda', number: 'Número', raffle: 'Sorteo',
      coinTool: 'Lanza una moneda', numberTool: 'Número aleatorio', raffleTool: 'Sorteo',
      coinDescription: 'Deja que el azar decida.', numberDescription: 'Elige un número dentro de tu rango.', raffleDescription: 'Todas las personas tienen la misma oportunidad.',
      homeEyebrow: 'Un pequeño empujón del universo', homeHeading: 'Crea tu propia suerte.',
      homeDescription: 'Tres pequeñas herramientas para cuando necesitas un empujón, un número o un nombre.',
      pickTool: 'Elige una herramienta', chance: 'Elige tu tipo de azar',
      coinEyebrow: 'Lanza una moneda', coinHeading: '¿Cara o cruz?', coinDescriptionPage: 'Deja la decisión en manos del azar por un momento.',
      flip: 'Lanzar la moneda', flipping: 'En el aire...', callIs: 'Ha salido', heads: 'Cara', tails: 'Cruz',
      numberEyebrow: 'Número aleatorio', numberHeading: 'Indica el rango.', numberDescriptionPage: 'Elige los límites y encontraremos el número que está entre ellos.',
      minimum: 'Mínimo', maximum: 'Máximo', generateNumber: 'Generar un número', wholeNumbers: 'Usa números enteros para ambos límites.',
      invalidRange: 'El mínimo debe ser menor o igual que el máximo.', yourNumber: 'Tu número',
      raffleEyebrow: 'Sorteo', raffleHeading: '¿Quién recibirá la buena noticia?', raffleDescriptionPage: 'Añade un nombre por línea. Todos tienen la misma oportunidad.',
      entriesLabel: 'Nombres o participaciones', entriesPlaceholder: 'Maya\nLuis\nSam', entrySingular: 'participación lista', entryPlural: 'participaciones listas',
      duplicates: 'Los nombres repetidos cuentan por separado', pickWinner: 'Elegir ganador', winnerIs: 'La persona ganadora es',
      pageDescription: 'Pequeñas herramientas para tomar decisiones rápidas.'
    }
  };

  var locale = window.localStorage.getItem('pura-suerte-locale') === 'es' ? 'es' : 'en';
  var routes = {
    '/': { label: 'home' },
    '/coin': { label: 'coinTool' },
    '/number': { label: 'numberTool' },
    '/raffle': { label: 'raffleTool' }
  };

  var navItems = [
    { route: '/', label: 'home', icon: 'bi-house-fill' },
    { route: '/coin', label: 'coin', icon: 'bi-circle-fill' },
    { route: '/number', label: 'number', icon: 'bi-dice-5-fill' },
    { route: '/raffle', label: 'raffle', icon: 'bi-trophy-fill' }
  ];

  var toolItems = [
    { route: '/coin', title: 'coinTool', description: 'coinDescription', icon: 'bi-circle-fill', tone: 'tone-yellow', number: '01' },
    { route: '/number', title: 'numberTool', description: 'numberDescription', icon: 'bi-dice-5-fill', tone: 'tone-coral', number: '02' },
    { route: '/raffle', title: 'raffleTool', description: 'raffleDescription', icon: 'bi-trophy-fill', tone: 'tone-mint', number: '03' }
  ];

  function t(key) {
    return translations[locale][key];
  }

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
    var backLink = route !== '/' ? '<a class="menu-link d-inline-flex align-items-center gap-2" href="#/"><i class="bi bi-arrow-left" aria-hidden="true"></i>' + t('menu') + '</a>' : '';
    $('#site-header').html(
      '<div class="d-flex align-items-center justify-content-between gap-3">' +
        '<a class="brand-link d-inline-flex align-items-center gap-3" href="#/">' +
          '<span class="brand-mark"><i class="bi bi-stars" aria-hidden="true"></i></span>' +
          '<span>pura suerte</span>' +
        '</a><div class="d-flex align-items-center gap-2">' + backLink +
          '<button id="language-toggle" class="menu-link" type="button" aria-label="' + t('languageLabel') + '" title="' + t('languageLabel') + '">' + (locale === 'en' ? 'ES' : 'EN') + '</button>' +
        '</div>' +
      '</div>'
    );
    $('#language-toggle').on('click', function () {
      locale = locale === 'en' ? 'es' : 'en';
      window.localStorage.setItem('pura-suerte-locale', locale);
      render(currentRoute());
    });
  }

  function renderNavigation(route) {
    var html = '<div class="bottom-nav-inner">';
    navItems.forEach(function (item) {
      var active = route === item.route ? ' active' : '';
      var current = route === item.route ? ' aria-current="page"' : '';
      html += '<a class="nav-link' + active + '" href="' + linkFor(item.route) + '"' + current + '>' +
        '<i class="bi ' + item.icon + '" aria-hidden="true"></i>' + t(item.label) + '</a>';
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
            '<h2 class="tool-title">' + t(item.title) + '</h2>' +
            '<i class="bi bi-arrow-up-right text-white-50" aria-hidden="true"></i>' +
          '</div>' +
          '<p class="tool-description">' + t(item.description) + '</p>' +
        '</div>' +
      '</a>';
    }).join('');

    return '<div>' +
      '<section class="mb-5">' +
        '<p class="eyebrow text-yellow">' + t('homeEyebrow') + '</p>' +
        '<h1 class="page-heading">' + t('homeHeading') + '</h1>' +
        '<p class="page-description">' + t('homeDescription') + '</p>' +
      '</section>' +
      '<section aria-labelledby="tools-heading">' +
        '<div class="d-flex align-items-end justify-content-between gap-3 mb-3">' +
          '<h2 id="tools-heading" class="h2 font-display fw-bold mb-0">' + t('pickTool') + '</h2>' +
          '<span class="d-none d-sm-block text-white-50 small">' + t('chance') + '</span>' +
        '</div>' +
        '<div class="row g-3">' + cards.split('</a>').filter(Boolean).map(function (card) { return '<div class="col-md-4">' + card + '</a></div>'; }).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function renderCoin() {
    return '<div>' +
      pageIntro('bi-circle-fill', 'tone-yellow', t('coinEyebrow'), t('coinHeading'), t('coinDescriptionPage')) +
      '<section class="tool-panel coin-stage mb-4">' +
        '<div class="coin-perspective"><div id="coin" class="coin">' +
          '<div class="coin-face"><div class="coin-face-inner"><span class="coin-letter">' + (locale === 'en' ? 'H' : 'C') + '</span></div></div>' +
          '<div class="coin-face coin-tail"><div class="coin-face-inner"><span class="coin-letter">' + (locale === 'en' ? 'T' : 'X') + '</span></div></div>' +
        '</div></div>' +
        '<button id="flip-button" type="button" class="action-button btn-light w-100" style="max-width: 320px">' + t('flip') + '</button>' +
      '</section>' +
      '<div id="coin-result"></div>' +
    '</div>';
  }

  function renderNumber() {
    return '<div>' +
      pageIntro('bi-dice-5-fill', 'tone-coral', t('numberEyebrow'), t('numberHeading'), t('numberDescriptionPage')) +
      '<section class="tool-panel mb-4">' +
        '<div class="row g-3 mb-4">' +
          '<div class="col-sm-6"><label class="form-label" for="minimum">' + t('minimum') + '</label><input id="minimum" class="form-control mt-2" type="number" inputmode="numeric" value="1"></div>' +
          '<div class="col-sm-6"><label class="form-label" for="maximum">' + t('maximum') + '</label><input id="maximum" class="form-control mt-2" type="number" inputmode="numeric" value="100"></div>' +
        '</div>' +
        '<p id="number-error" class="mb-3 text-coral fw-bold small" role="alert"></p>' +
        '<button id="number-button" type="button" class="action-button tone-coral w-100">' + t('generateNumber') + '</button>' +
      '</section>' +
      '<div id="number-result"></div>' +
    '</div>';
  }

  function renderRaffle() {
    return '<div>' +
      pageIntro('bi-trophy-fill', 'tone-mint', t('raffleEyebrow'), t('raffleHeading'), t('raffleDescriptionPage')) +
      '<section class="tool-panel mb-4">' +
        '<label class="form-label d-block" for="entries">' + t('entriesLabel') + '</label>' +
        '<textarea id="entries" class="form-control mt-2" rows="7" placeholder="' + t('entriesPlaceholder').replace(/\n/g, '&#10;') + '"></textarea>' +
        '<div class="d-flex align-items-center justify-content-between gap-3 mt-3 text-white-50 small"><span id="entry-count">0 entries ready</span><span id="duplicate-note"></span></div>' +
        '<button id="raffle-button" type="button" class="action-button tone-mint w-100 mt-4" disabled>Pick a winner</button>' +
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
      $('#flip-button').prop('disabled', true).text(t('flipping'));
      window.setTimeout(function () {
        var result = randomInteger(0, 1) === 0 ? t('heads') : t('tails');
        $('#coin-result').html(resultPanel(t('callIs'), result, 'tone-yellow'));
        $('#coin').removeClass('is-flipping');
        $('#flip-button').prop('disabled', false).text(t('flip'));
        flipping = false;
      }, 900);
    });
  }

  function bindNumber() {
    $('#number-button').on('click', function () {
      var minimum = Number($('#minimum').val());
      var maximum = Number($('#maximum').val());
      var error = '';
      if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) error = t('wholeNumbers');
      if (!error && minimum > maximum) error = t('invalidRange');
      $('#number-error').text(error);
      if (error) {
        $('#number-result').empty();
        return;
      }
      $('#number-result').html(resultPanel(t('yourNumber'), randomInteger(minimum, maximum), 'tone-coral'));
    });
  }

  function bindRaffle() {
    function updateEntries() {
      var entries = parseEntries($('#entries').val());
      var countLabel = entries.length + ' ' + t(entries.length === 1 ? 'entrySingular' : 'entryPlural');
      $('#entry-count').text(countLabel);
      $('#duplicate-note').text(entries.length ? t('duplicates') : '');
      $('#raffle-button').prop('disabled', entries.length === 0);
      return entries;
    }
    $('#entries').on('input', updateEntries);
    $('#raffle-button').on('click', function () {
      var entries = updateEntries();
      if (!entries.length) return;
      $('#raffle-result').html(resultPanel(t('winnerIs'), entries[randomInteger(0, entries.length - 1)], 'tone-mint'));
    });
  }

  function render(route) {
    document.documentElement.lang = locale;
    $('meta[name="description"]').attr('content', t('pageDescription'));
    renderHeader(route);
    renderNavigation(route);
    $('#current-tool').text(t(routes[route].label));
    if (route === '/') $('#main-content').html(renderHome());
    if (route === '/coin') { $('#main-content').html(renderCoin()); bindCoin(); }
    if (route === '/number') { $('#main-content').html(renderNumber()); bindNumber(); }
    if (route === '/raffle') { $('#main-content').html(renderRaffle()); bindRaffle(); }
    $('#main-content').trigger('focus');
  }

  $(window).on('hashchange', function () { render(currentRoute()); });
  $(function () { render(currentRoute()); });
})(jQuery);
