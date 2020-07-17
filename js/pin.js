'use strict';

(function () {
  var COUNT = 8;
  var pinFragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var similarPinElement = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function getInsert() {
    for (var i = 0; i < COUNT; i++) {
      pinFragment.appendChild(renderPinFragment(window.data.getAnnouncement()));
    }
    return similarPinElement.appendChild(pinFragment);
  }

  function renderPinFragment(announcement) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = announcement.author.avatar;
    pinElement.querySelector('img').alt = announcement.offer.title;
    pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';

    pinElement.addEventListener('click', function () {
      map.appendChild(window.card.renderCardFragment(announcement));
    });

    return pinElement;
  }

  window.pin = {
    render: renderPinFragment,
    getInsert: getInsert
  };
}());
