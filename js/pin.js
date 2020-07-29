'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function removeActiveClassPin() {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  function addActiveClassPin(pin) {
    removeActiveClassPin();
    pin.classList.add('map__pin--active');
  };

  function createPins(announcement) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = announcement.author.avatar;
    pinElement.querySelector('img').alt = announcement.offer.title;
    pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';
    pinElement.addEventListener('click', function () {
      map.appendChild(window.card.createCard(announcement));
       addActiveClassPin(pinElement);
    });
    return pinElement;
  }

  var pinItems = null;

  function renderPins(pins) {
    pinItems = [];

    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin, index) {
      var pinElement = createPins(pin);
      fragment.appendChild(pinElement);

      pinItems.push(pinElement);

      pinElement.tabIndex = index + 1;
    });
    mapPins.appendChild(fragment);
  };

  function removePins() {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  }

  window.pin = {
    create: createPins,
    render: renderPins,
    remove: removePins
  };
}());
