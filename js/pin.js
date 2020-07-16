'use strict';

(function () {
  var COUNT = 8;
  var pinFragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var similarPinFragment = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPinFragment(announcement) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = announcement.author.avatar;
    pinElement.querySelector('img').alt = announcement.offer.title;
    pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';

    pinElement.addEventListener('click', function () {
      map.appendChild(window.card.createCard(announcement));
    });

    return pinElement;
  }

  function getInsert() {
    for (var i = 0; i < COUNT; i++) {
      pinFragment.appendChild(renderPinFragment(window.data.getAnnouncement));
    }
    return similarPinElement.appendChild(pinFragment);
  }

  window.pin = {
    render: renderPinFragment,
    getInsert: getInsert
  };
}());
