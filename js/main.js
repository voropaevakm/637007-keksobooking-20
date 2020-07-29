'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var resetBtn = document.querySelector('.ad-form__reset');
  var filter = document.querySelector('.map__filters');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var titleInput = document.querySelector('#title');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomsInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var guestsInRoom = {
    1: {
      guestsValue: [1],
      error: 'В 1-ой комнате может быть 1 гость',
    },
    2: {
      guestsValue: [1, 2],
      error: 'В 2-х комнатах может быть 2 или 1 гостей'
    },
    3: {
      guestsValue: [1, 2, 3],
      error: 'В 3-х комнатах может быть 3, 2 или 1 гостей'
    },
    100: {
      guestsValue: [0],
      error: '100 комнат не для гостей'
    },
  };
  var FlatMinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  function activationFilterInput(element, flag) {
    element.forEach(function (it) {
      if (flag) {
        it.disabled = true;
      } else {
        it.disabled = false;
      }
    });
  }

  function changeTimeInInput() {
    timeOutInput.value = timeInInput.value;
  }

  function changeTimeOutInput() {
    timeInInput.value = timeOutInput.value;
  }

  function changeTypeInput(evt) {
    priceInput.min = FlatMinPrices[evt.target.value.toUpperCase()];
    priceInput.placeholder = FlatMinPrices[evt.target.value.toUpperCase()];
  }

  var validateRoomsGuests = function () {
    capacityInput.setCustomValidity('');
    roomsInput.setCustomValidity('');
    var validValue = guestsInRoom[roomsInput.value].guestsValue.find(function (number) {
      return number === Number(capacityInput.value);
    });
    return validValue ? true : (
      capacityInput.setCustomValidity(guestsInRoom[roomsInput.value].error),
      roomsInput.setCustomValidity(guestsInRoom[roomsInput.value].error));
  };

  var onRoomsGuestsChange = function () {
    validateRoomsGuests();
  };

  roomsInput.addEventListener('change', onRoomsGuestsChange);
  capacityInput.addEventListener('change', onRoomsGuestsChange);

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  }

  function onSubmitSuccess() {
    getSuccess();
    window.map.activatePage();
  }

  function onSubmitError(errorMessage) {
    getError(errorMessage);
  }

  function createSuccessMessage() {
    var similarSuccessMessage = document.querySelector('#success')
    .content.querySelector('.success').cloneNode(true);
    similarSuccessMessage.addEventListener('click', onSuccessClick);
    main.append(similarSuccessMessage);
  }

  function createErrorMessage(errorMessage) {
    var similarErrorMessage = document.querySelector('#error')
    .content.querySelector('.error').cloneNode(true);
    var errorButton = similarErrorMessage.querySelector('.error__button');
    var message = similarErrorMessage.querySelector('.error__message');
    message.textContent = errorMessage;
    errorButton.addEventListener('click', onErrorBtnClick);
    main.append(similarErrorMessage);
    message.addEventListener('click', onErrorClick);
    main.append(similarSuccessMessage);
  }

  function deleteSuccessMessage() {
    var successMessage = main.querySelector('.success');
    successMessage.remove();
  }

  function deleteErrorMessage() {
    var errorMessage = main.querySelector('.error');
    errorMessage.remove();
  }

  function getSuccess() {
    createSuccessMessage();
    document.addEventListener('keydown', onSuccessEscDown);
  }

  function getError(errorMessage) {
    createErrorMessage(errorMessage);
    document.addEventListener('keydown', onErrorEscDown);
  }

  function closeSuccess() {
    deleteSuccessMessage();
    document.removeEventListener('keydown', onSuccessEscDown);
  }

  function closeError() {
    deleteErrorMessage();
    document.removeEventListener('keydown', onErrorEscDown);
  }

  function onSuccessEscDown(evt) {
    window.utils.onEscDown(evt, closeSuccess);
  }

  function onErrorEscDown(evt) {
    window.utils.onEscDown(evt, closeError);
  }

  function onSuccessClick() {
    closeSuccess();
  }

  function onErrorClick() {
    closeError();
  }

  function onErrorBtnClick() {
    closeError();
  }

  function onResetBtnClick(evt) {
    evt.preventDefault();
    window.map.activatePage();
  }

  function checkTitleValidation() {
    var minTitleLength = titleInput.getAttribute('minlength');
    var maxTitleLength = titleInput.getAttribute('maxlength');
    var valueLength = titleInput.value.length;
    if (valueLength < minTitleLength) {
      titleInput.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' симв.');
    } else if (valueLength > maxTitleLength) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  }

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  adForm.addEventListener('submit', onAdFormSubmit);
  resetBtn.addEventListener('click', onResetBtnClick);
  timeInInput.addEventListener('change', changeTimeInInput);
  timeOutInput.addEventListener('change', changeTimeOutInput);
  typeInput.addEventListener('change', changeTypeInput);
  titleInput.addEventListener('input', checkTitleValidation);

  window.main = {
    activationFilterInput: activationFilterInput,
    debounce: debounce,
    getError: getError
  };
}());
