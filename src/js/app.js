(function ($) {
  'use strict';

  var translations = {
    en: {
      description: 'Tiny tools for making quick decisions.',
      language: 'Language',
      menu: 'Menu',
      navLabel: 'Mini-app navigation',
      routeHome: 'Choose a luck tool',
      routeCoin: 'Toss a coin',
      routeNumber: 'Random number',
      routeRaffle: 'Raffle',
      navHome: 'Home',
      navCoin: 'Coin',
      navNumber: 'Number',
      navRaffle: 'Raffle',
      coinTitle: 'Toss a coin',
      coinDescription: 'Let chance make the call.',
      numberTitle: 'Random number',
      numberDescription: 'Pick a number in your range.',
      raffleTitle: 'Raffle',
      raffleDescription: 'Give every name a fair shot.',
      homeEyebrow: 'A little help from the universe',
      homeTitle: 'Make your own luck.',
      homeDescription: 'Three tiny tools for the moments when you want a nudge, a number, or a name.',
      pickTool: 'Pick your tool',
      chooseChance: 'Choose your kind of chance',
      coinQuestion: 'Heads or tails?',
      coinPrompt: 'Take the decision out of your hands for a second.',
      coinFlip: 'Flip the coin',
      coinInAir: 'In the air...',
      coinHeads: 'Heads',
      coinTails: 'Tails',
      coinHeadLetter: 'H',
      coinTailLetter: 'T',
      coinCall: 'The call is',
      numberPrompt: 'Name your range.',
      numberDescriptionDetail: 'Set the edges. We will find the number hiding between them.',
      minimum: 'Min',
      maximum: 'Max',
      generateNumber: 'Generate a number',
      limitsRequired: 'Enter both limits.',
      wholeNumbersError: 'Use whole numbers for both limits.',
      rangeError: 'Your minimum must be less than or equal to your maximum.',
      safeRangeError: 'Use safe whole numbers for both limits (between -9007199254740991 and 9007199254740991).',
      largeRangeError: 'Your range must contain at most 4,294,967,296 possible values.',
      yourNumber: 'Your number',
      raffleQuestion: 'Who gets the good news?',
      rafflePrompt: 'Add one name per line. Every line gets one fair shot.',
      namesOrEntries: 'Names or entries',
      entryPlaceholder: 'Maya\nLuis\nSam',
      entryReady: 'entry ready',
      entriesReady: 'entries ready',
      duplicates: 'Duplicates count separately',
      pickWinner: 'Pick a winner',
      winnerIs: 'The winner is'
    },
    es: {
      description: 'Pequeñas herramientas para tomar decisiones rápidas.',
      language: 'Idioma',
      menu: 'Menú',
      navLabel: 'Navegación de la aplicación',
      routeHome: 'Elige una herramienta de suerte',
      routeCoin: 'Lanza una moneda',
      routeNumber: 'Número aleatorio',
      routeRaffle: 'Sorteo',
      navHome: 'Inicio',
      navCoin: 'Moneda',
      navNumber: 'Número',
      navRaffle: 'Sorteo',
      coinTitle: 'Lanza una moneda',
      coinDescription: 'Deja que el azar decida.',
      numberTitle: 'Número aleatorio',
      numberDescription: 'Elige un número dentro de un intervalo.',
      raffleTitle: 'Sorteo',
      raffleDescription: 'Dales a todos la misma oportunidad.',
      homeEyebrow: 'Una pequeña ayuda del universo',
      homeTitle: 'Crea tu propia suerte.',
      homeDescription: 'Tres pequeñas herramientas para cuando necesitas un empujoncito, un número o un nombre.',
      pickTool: 'Elige una herramienta',
      chooseChance: 'Elige tu tipo de azar',
      coinQuestion: '¿Cara o cruz?',
      coinPrompt: 'Deja la decisión en manos del azar por un momento.',
      coinFlip: 'Lanzar la moneda',
      coinInAir: 'En el aire...',
      coinHeads: 'Cara',
      coinTails: 'Cruz',
      coinHeadLetter: 'C',
      coinTailLetter: 'X',
      coinCall: 'El resultado es',
      numberPrompt: 'Define el intervalo.',
      numberDescriptionDetail: 'Indica los límites y encontraremos el número que se esconde entre ellos.',
      minimum: 'Mínimo',
      maximum: 'Máximo',
      generateNumber: 'Generar un número',
      limitsRequired: 'Introduce ambos límites.',
      wholeNumbersError: 'Usa números enteros para ambos límites.',
      rangeError: 'El mínimo debe ser menor o igual que el máximo.',
      safeRangeError: 'Usa números enteros seguros para ambos límites (entre -9007199254740991 y 9007199254740991).',
      largeRangeError: 'El intervalo debe contener como máximo 4.294.967.296 valores posibles.',
      yourNumber: 'Tu número',
      raffleQuestion: '¿Quién recibirá la buena noticia?',
      rafflePrompt: 'Escribe un nombre por línea. Todas las líneas tienen la misma oportunidad.',
      namesOrEntries: 'Nombres o participantes',
      entryPlaceholder: 'Maya\nLuis\nSam',
      entryReady: 'participante listo',
      entriesReady: 'participantes listos',
      duplicates: 'Los nombres repetidos cuentan por separado',
      pickWinner: 'Elegir ganador',
      winnerIs: 'La persona ganadora es'
    }
  };

  function preferredLanguage() {
    try {
      var savedLanguage = window.localStorage.getItem('pura-suerte-language');
      if (translations[savedLanguage]) return savedLanguage;
    } catch (error) {
      console.warn('Unable to read the saved language preference.', error);
    }
    return /^es\b/i.test(window.navigator.language || '') ? 'es' : 'en';
  }

  var language = preferredLanguage();
  var lastResults = { coin: null, number: null, raffle: null };

  function t(key) {
    return translations[language][key];
  }

  function saveLanguage() {
    try {
      window.localStorage.setItem('pura-suerte-language', language);
    } catch (error) {
      console.warn('Unable to save the language preference.', error);
    }
  }

  function updateDocumentLanguage() {
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]').setAttribute('content', t('description'));
  }

  var routes = {
    '/': { label: 'routeHome', nav: 'navHome' },
    '/coin': { label: 'routeCoin', nav: 'navCoin' },
    '/number': { label: 'routeNumber', nav: 'navNumber' },
    '/raffle': { label: 'routeRaffle', nav: 'navRaffle' }
  };

  var navItems = [
    { route: '/', label: 'navHome', icon: 'bi-house-fill' },
    { route: '/coin', label: 'navCoin', icon: 'bi-circle-fill' },
    { route: '/number', label: 'navNumber', icon: 'bi-dice-5-fill' },
    { route: '/raffle', label: 'navRaffle', icon: 'bi-trophy-fill' }
  ];

  var toolItems = [
    { route: '/coin', title: 'coinTitle', description: 'coinDescription', icon: 'bi-circle-fill', tone: 'tone-yellow', number: '01' },
    { route: '/number', title: 'numberTitle', description: 'numberDescription', icon: 'bi-dice-5-fill', tone: 'tone-coral', number: '02' },
    { route: '/raffle', title: 'raffleTitle', description: 'raffleDescription', icon: 'bi-trophy-fill', tone: 'tone-mint', number: '03' }
  ];

  var coinTimer = null;

  function escapeHtml(value) {
    return $('<div>').text(String(value)).html();
  }

  function randomInteger(min, max) {
    var range = max - min + 1;
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || range < 1 || range > 0x100000000) {
      throw new RangeError('Use safe integer limits with at most 4,294,967,296 possible values.');
    }
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
      '<div class="header-content d-flex align-items-center justify-content-between gap-3">' +
        '<a class="brand-link d-inline-flex align-items-center gap-3" href="#/">' +
          '<span class="brand-mark"><i class="bi bi-stars" aria-hidden="true"></i></span>' +
          '<span>pura suerte</span>' +
        '</a>' +
        '<div class="header-actions">' +
          backLink +
          '<label class="visually-hidden" for="language-select">' + t('language') + '</label>' +
          '<select id="language-select" class="language-select" aria-label="' + t('language') + '">' +
            '<option value="en"' + (language === 'en' ? ' selected' : '') + '>English</option>' +
            '<option value="es"' + (language === 'es' ? ' selected' : '') + '>Español</option>' +
          '</select>' +
        '</div>' +
      '</div>'
    );
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
    $('#bottom-nav').attr('aria-label', t('navLabel')).html(html);
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
        '<h1 class="page-heading">' + t('homeTitle') + '</h1>' +
        '<p class="page-description">' + t('homeDescription') + '</p>' +
      '</section>' +
      '<section aria-labelledby="tools-heading">' +
        '<div class="d-flex align-items-end justify-content-between gap-3 mb-3">' +
          '<h2 id="tools-heading" class="h2 font-display fw-bold mb-0">' + t('pickTool') + '</h2>' +
          '<span class="d-none d-sm-block text-white-50 small">' + t('chooseChance') + '</span>' +
        '</div>' +
        '<div class="row g-3">' + cards.split('</a>').filter(Boolean).map(function (card) { return '<div class="col-md-4">' + card + '</a></div>'; }).join('') + '</div>' +
      '</section>' +
    '</div>';
  }

  function renderCoin() {
    return '<div>' +
      pageIntro('bi-circle-fill', 'tone-yellow', t('coinTitle'), t('coinQuestion'), t('coinPrompt')) +
      '<section class="tool-panel coin-stage mb-4">' +
        '<div class="coin-perspective"><div id="coin" class="coin">' +
          '<div class="coin-face"><div class="coin-face-inner"><span class="coin-letter">' + t('coinHeadLetter') + '</span></div></div>' +
          '<div class="coin-face coin-tail"><div class="coin-face-inner"><span class="coin-letter">' + t('coinTailLetter') + '</span></div></div>' +
        '</div></div>' +
        '<button id="flip-button" type="button" class="action-button btn-light w-100" style="max-width: 320px">' + t('coinFlip') + '</button>' +
      '</section>' +
      '<div id="coin-result"></div>' +
    '</div>';
  }

  function renderNumber() {
    return '<div>' +
      pageIntro('bi-dice-5-fill', 'tone-coral', t('numberTitle'), t('numberPrompt'), t('numberDescriptionDetail')) +
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
      pageIntro('bi-trophy-fill', 'tone-mint', t('raffleTitle'), t('raffleQuestion'), t('rafflePrompt')) +
      '<section class="tool-panel mb-4">' +
        '<label class="form-label d-block" for="entries">' + t('namesOrEntries') + '</label>' +
        '<textarea id="entries" class="form-control mt-2" rows="7" placeholder="' + t('entryPlaceholder') + '"></textarea>' +
        '<div class="d-flex align-items-center justify-content-between gap-3 mt-3 text-white-50 small"><span id="entry-count">0 ' + t('entriesReady') + '</span><span id="duplicate-note"></span></div>' +
        '<button id="raffle-button" type="button" class="action-button tone-mint w-100 mt-4" disabled>' + t('pickWinner') + '</button>' +
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
      $('#flip-button').prop('disabled', true).text(t('coinInAir'));
      coinTimer = window.setTimeout(function () {
        coinTimer = null;
        lastResults.coin = randomInteger(0, 1);
        $('#coin-result').html(resultPanel(t('coinCall'), lastResults.coin === 0 ? t('coinHeads') : t('coinTails'), 'tone-yellow'));
        $('#coin').removeClass('is-flipping').toggleClass('is-tails', lastResults.coin === 1);
        $('#flip-button').prop('disabled', false).text(t('coinFlip'));
        flipping = false;
      }, 900);
    });
  }

  function bindNumber() {
    $('#number-button').on('click', function () {
      var minimumInput = $('#minimum').val();
      var maximumInput = $('#maximum').val();
      var minimum = Number(minimumInput);
      var maximum = Number(maximumInput);
      var error = '';
      if (!minimumInput.trim() || !maximumInput.trim()) error = t('limitsRequired');
      if (!error && (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum))) error = t('safeRangeError');
      if (!error && minimum > maximum) error = t('rangeError');
      if (!error && maximum - minimum + 1 > 0x100000000) error = t('largeRangeError');
      $('#number-error').text(error);
      if (error) {
        lastResults.number = null;
        $('#number-result').empty();
        return;
      }
      lastResults.number = randomInteger(minimum, maximum);
      $('#number-result').html(resultPanel(t('yourNumber'), lastResults.number, 'tone-coral'));
    });
  }

  function bindRaffle() {
    function updateEntries() {
      var entries = parseEntries($('#entries').val());
      var countLabel = entries.length + ' ' + t(entries.length === 1 ? 'entryReady' : 'entriesReady');
      $('#entry-count').text(countLabel);
      $('#duplicate-note').text(entries.length ? t('duplicates') : '');
      $('#raffle-button').prop('disabled', entries.length === 0);
      if (!entries.length) lastResults.raffle = null;
      return entries;
    }
    $('#entries').on('input', updateEntries);
    $('#raffle-button').on('click', function () {
      var entries = updateEntries();
      if (!entries.length) return;
      lastResults.raffle = entries[randomInteger(0, entries.length - 1)];
      $('#raffle-result').html(resultPanel(t('winnerIs'), lastResults.raffle, 'tone-mint'));
    });
  }

  function render(route) {
    if (coinTimer !== null) {
      window.clearTimeout(coinTimer);
      coinTimer = null;
    }
    updateDocumentLanguage();
    renderHeader(route);
    renderNavigation(route);
    $('#current-tool').text(t(routes[route].label));
    if (route === '/') $('#main-content').html(renderHome());
    if (route === '/coin') { $('#main-content').html(renderCoin()); bindCoin(); }
    if (route === '/number') { $('#main-content').html(renderNumber()); bindNumber(); }
    if (route === '/raffle') { $('#main-content').html(renderRaffle()); bindRaffle(); }
    if (route === '/coin' && lastResults.coin !== null) {
      $('#coin-result').html(resultPanel(t('coinCall'), lastResults.coin === 0 ? t('coinHeads') : t('coinTails'), 'tone-yellow'));
      $('#coin').toggleClass('is-tails', lastResults.coin === 1);
    }
    if (route === '/number' && lastResults.number !== null) {
      $('#number-result').html(resultPanel(t('yourNumber'), lastResults.number, 'tone-coral'));
    }
    if (route === '/raffle' && lastResults.raffle !== null) {
      $('#raffle-result').html(resultPanel(t('winnerIs'), lastResults.raffle, 'tone-mint'));
    }
    $('#main-content').trigger('focus');
  }

  $(document).on('change', '#language-select', function () {
    var route = currentRoute();
    var minimum = $('#minimum').val();
    var maximum = $('#maximum').val();
    var entries = $('#entries').val();
    language = $(this).val();
    saveLanguage();
    render(route);
    if (route === '/number') {
      $('#minimum').val(minimum);
      $('#maximum').val(maximum);
    }
    if (route === '/raffle') {
      $('#entries').val(entries).trigger('input');
    }
  });

  $(window).on('hashchange', function () { render(currentRoute()); });
  $(function () { render(currentRoute()); });
})(jQuery);
