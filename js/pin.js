'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPins(announcement) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = announcement.author.avatar;
    pinElement.querySelector('img').alt = announcement.offer.title;
    pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';
    pinElement.addEventListener('click', function () {
      map.appendChild(window.card.renderCardFragment(announcement));
    });
    return pinElement;
  }

  function renderPins(pins) {
    pins.forEach(function (pin) {
      mapPins.appendChild(createPins(pin));
    });
  }

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
