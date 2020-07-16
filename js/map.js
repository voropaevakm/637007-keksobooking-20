'use strict';

(function () {

  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var PIN_SIZE_POINT_Y = 22;
  var COUNT = 8;

  var pinSize = {
    x: 65,
    y: 65,
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var adFormFieldsets = document.querySelectorAll('.ad-form__element');

  function getAddressPointInput() {
    addressInput.value = Math.ceil(MAIN_PIN_X + pinSize.x / 2) + ', ' + Math.ceil(MAIN_PIN_Y + pinSize.y + PIN_SIZE_POINT_Y);
  }

  function mainPinMouseDown(evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.pin.getInsert(COUNT);
      window.main.activationFilterInput(filterItems, true);
      window.main.activationFilterInput(adFormFieldsets, true);
      getAddressPointInput();
    }
    mainPin.removeEventListener('mousedown', mainPinMouseDown);
  }

  function mainPinKeyDown(evt) {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.pin.getInsert(COUNT);
      window.main.activationFilterInput(filterItems, true);
      window.main.activationFilterInput(adFormFieldsets, true);
      getAddressPointInput();
    }
    mainPin.removeEventListener('keydown', mainPinKeyDown);
  }

  addressInput.value = Math.ceil(MAIN_PIN_X + pinSize.x / 2) + ', ' + Math.ceil(MAIN_PIN_Y + pinSize.y / 2);

  mainPin.addEventListener('mousedown', mainPinMouseDown);

  mainPin.addEventListener('keydown', mainPinKeyDown);
}());
