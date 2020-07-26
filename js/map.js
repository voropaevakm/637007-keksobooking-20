'use strict';

(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var PIN_SIZE_POINT_Y = 22;
  var PinSize = {
    X: 65,
    Y: 65,
  };
  var BorderTermination = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form__element');
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var addressInput = document.querySelector('#address');
  var titleInput = document.querySelector('#title');
  var activePage = false;


  function getAddressPointInput() {
    addressInput.value = Math.ceil(MAIN_PIN_X + PinSize.X / 2) + ', ' + Math.ceil(MAIN_PIN_Y + PinSize.Y + PIN_SIZE_POINT_Y);
  }

  function setAddressCoords(coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  }

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
    window.main.activationFilterInput(filterItems, true);
    window.main.activationFilterInput(adFormFieldsets, true);
    getAddressPointInput();
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
    window.main.activationFilterInput(filterItems, false);
    window.main.activationFilterInput(adFormFieldsets, false);
    window.filter.deactivate();
    mainPin.style.top = MAIN_PIN_Y - PinSize.HEIGHT / 2 + 'px';
    mainPin.style.left = MAIN_PIN_X - PinSize.WIDTH / 2 + 'px';
    titleInput.style.border = '';
    activePage = false;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var border = {
        top: BorderTermination.Y.MIN - mainPin.offsetHeight - PIN_SIZE_POINT_Y,
        bottom: BorderTermination.Y.MAX - mainPin.offsetHeight - PIN_SIZE_POINT_Y,
        left: BorderTermination.X.MIN - mainPin.offsetWidth / 2,
        right: BorderTermination.X.MAX - mainPin.offsetWidth / 2
      };

      if (mainPinPosition.x >= border.left && mainPinPosition.x <= border.right) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }

      if (mainPinPosition.y >= border.top && mainPinPosition.y <= border.bottom) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }

      var pointCoords = {
        x: mainPinPosition.x + Math.ceil(PinSize.X / 2),
        y: mainPinPosition.y + PinSize.Y + PIN_SIZE_POINT_Y
      };

      setAddressCoords(pointCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!activePage) {
        activePage = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function activatePage() {
    deactivateMap();
    activePage = false;
    mainPin.addEventListener('mousedown', mainPinMouseDown);
    mainPin.addEventListener('keydown', mainPinKeyDown);
  }

  addressInput.value = Math.ceil(MAIN_PIN_X + mainPin.offsetWidth / 2) + ', ' + Math.ceil(MAIN_PIN_Y + mainPin.offsetHeight / 2);
  activatePage();

  window.map = {
    activatePage: activatePage
  };

}());
