'use strict';

(function () {
  var BORDER = '2px solid red';
  var DEBOUNCE_INTERVAL = 300;
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var resetBtn = document.querySelector('.ad-form__reset');
  var adFormFieldsets = document.querySelectorAll('.ad-form__element');
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var capacitySelect = document.querySelector('#capacity');
  var roomNumberSelect = document.querySelector('#room_number');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var titleInput = document.querySelector('#title');
  var minTitleLength = titleInput.getAttribute('minlength');
  var maxTitleLength = titleInput.getAttribute('maxlength');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomsGuestsValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var flatMinPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function activationFilterInput(elements, flag) {
    if (!flag) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', false);
      }
    } else {
      for (i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled', false);
      }
    }
  }

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', function () {
    var valueLength = titleInput.value.length;
    if (valueLength < minTitleLength) {
      titleInput.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' симв.');
    } else if (valueLength > maxTitleLength) {
      titleInput.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' симв.');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  function setTitleBorder() {
    titleInput.style.border = BORDER;
  }

  function changeTimeInInput() {
    timeOutInput.value = timeInInput.value;
  }

  function changeTimeOutInput() {
    timeInInput.value = timeOutInput.value;
  }

  function changeTypeInput(evt) {
    priceInput.min = flatMinPrices[evt.target.value];
    priceInput.placeholder = flatMinPrices[evt.target.value];
  }

  function changeRoomsNumbers(person) {
    var capacityOptions = capacitySelect.querySelectorAll('option');
    capacityOptions.forEach(function (option) {
      option.disabled = true;
    });
    roomsGuestsValues[person].forEach(function (amount) {
      capacityOptions.forEach(function (option) {
        if (Number(option.value) === amount) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  }

  roomNumberSelect.addEventListener('change', function (evt) {
    var person = evt.target;
    changeRoomsNumbers(person.value);
  });

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  }

  function onSubmitSuccess() {
    getSuccess();
    window.map.pageStatus();
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
    errorButton.addEventListener('click', onErrorClick);
    main.append(similarErrorMessage);
  }

  function deleteSuccessMessage() {
    var successMessage = main.querySelector('.success');
    successMessage.remove();
  }

  function deleteErrorMessage() {
    var errorMessageGenerated = main.querySelector('.error');
    errorMessageGenerated.remove();
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

  function onResetBtnClick(evt) {
    evt.preventDefault();
    window.map.initPage();
    window.loadPhoto.remove();
  }

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  activationFilterInput(filterItems, false);
  activationFilterInput(adFormFieldsets, false);
  adForm.addEventListener('submit', onAdFormSubmit);
  resetBtn.addEventListener('click', onResetBtnClick);
  titleInput.addEventListener('invalid', setTitleBorder);
  timeInInput.addEventListener('change', changeTimeInInput);
  timeOutInput.addEventListener('change', changeTimeOutInput);
  typeInput.addEventListener('change', changeTypeInput);

  window.main = {
    activationFilterInput: activationFilterInput,
    changeRoomsNumbers: changeRoomsNumbers,
    debounce: debounce,
    getError: getError
  };
}());
