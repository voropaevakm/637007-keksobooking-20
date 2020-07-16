'use strict';

(function () {
  var BORDER = '2px solid red';

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form__element');
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var capacitySelect = document.querySelector('#capacity');
  var roomNumberSelect = document.querySelector('#room_number');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var addressInput = document.querySelector('#address');
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

  activationFilterInput(filterItems, false);

  activationFilterInput(adFormFieldsets, false);

  titleInput.addEventListener('invalid', setTitleBorder);

  timeInInput.addEventListener('change', changeTimeInInput);

  timeOutInput.addEventListener('change', changeTimeOutInput);

  typeInput.addEventListener('change', changeTypeInput);

  roomNumberSelect.addEventListener('change', function (evt) {
    var person = evt.target;
    changeRoomsNumbers(person.value);
  });

  window.main = {
    activationFilterInput: activationFilterInput
  };
}());
