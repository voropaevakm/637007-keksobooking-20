'use strict';

(function () {

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
  var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
  var MAIN_PIN_CURSOR_HEIGHT = 22;
  var MAIN_PIN_DEFAULT = 'left: 570px; top: 375px;';
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form__element');
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var titleInput = document.querySelector('#title');
  var adFormAddress = document.querySelector('#address');
  var location = {
    x: Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
    y: Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2)
  };

  var getMainPinDefault = function () {
    mainPin.style = MAIN_PIN_DEFAULT;
  };

  function renderAddress(isPageActive, coord) {
    if (isPageActive) {
      adFormAddress.value = coord.x + ', ' + (coord.y + MAIN_PIN_CURSOR_HEIGHT);
    } else {
      adFormAddress.value = coord.x + ', ' + coord.y;
    }
  }
  renderAddress(false, location);

  function onLoadSuccess(adData) {
    window.data = adData.slice(0);
    window.filter.activate(adData);
  }

  function onLoadError(errorMessage) {
    window.main.getError(errorMessage);
  }

  function activateMap() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.main.activationFilterInput(filterItems, false);
    window.main.activationFilterInput(adFormFieldsets, false);
    renderAddress(true, location);
    window.backend.load(onLoadSuccess, onLoadError);
  }

  function mainPinMouseDown(evt) {
    evt.preventDefault();
    window.utils.onBtnDown(evt, activateMap);
    mainPin.removeEventListener('mousedown', mainPinMouseDown);
  }

  function mainPinKeyDown(evt) {
    evt.preventDefault();
    window.utils.onEnterDown(evt, activateMap);
    mainPin.removeEventListener('keydown', mainPinKeyDown);
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.pin.remove();
    window.card.remove();
    window.main.activationFilterInput(filterItems, true);
    window.main.activationFilterInput(adFormFieldsets, true);
    window.filter.deactivate();
    renderAddress(false, location);
    titleInput.style.border = '';
    activePage = false;
    getMainPinDefault();
  }

  function activatePage() {
    deactivateMap();
    activePage = false;
    mainPin.addEventListener('mousedown', mainPinMouseDown);
    mainPin.addEventListener('keydown', mainPinKeyDown);
  }

  activatePage();

  window.map = {
    WIDTH: MAP_WIDTH,
    HEIGHT: MAP_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_CURSOR_HEIGHT: MAIN_PIN_CURSOR_HEIGHT,
    deactivate: deactivateMap,
    activate: activateMap,
    activatePage: activatePage,
    renderAddress: renderAddress,
  };

}());
