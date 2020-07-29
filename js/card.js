'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var arrayOfTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  function changeData(nodeElement, data, option, insertText) {
    if (!data) {
      nodeElement.style.display = 'none';
      return;
    }
    if (option) {
      nodeElement.textContent = insertText;
    } else {
      nodeElement.innerHTML = insertText;
    }
  }

  function renderCardFeatures(nodeElement, featuresArray) {
    nodeElement.innerHTML = '';
    if (!featuresArray.length) {
      nodeElement.style.display = 'none';
      return;
    }
    featuresArray.forEach(function (feature) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + feature);
      nodeElement.appendChild(li);
    });
  }

  function renderCardPhotos(nodeElement, photosArray) {
    nodeElement.innerHTML = '';
    if (!photosArray.length) {
      nodeElement.style.display = 'none';
      return;
    }
    photosArray.forEach(function (photo) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = photo;
      img.width = '45';
      img.height = '40';
      img.alt = 'Фото недвижимости ';
      nodeElement.appendChild(img);
    });
  }

  function createAvatar(nodeElement, data) {
    if (!data) {
      nodeElement.style.display = 'none';
      return;
    }
    nodeElement.src = data;
  }

  function createCard(announcement) {
    var cardElement = similarCardTemplate.cloneNode(true);
    var closeCardButton = cardElement.querySelector('.popup__close');
    createAvatar(cardElement.querySelector('.popup__avatar'), announcement.author.avatar);
    changeData(cardElement.querySelector('.popup__title'), announcement.offer.title, true, announcement.offer.title);
    changeData(cardElement.querySelector('.popup__text--address'), announcement.offer.address, true, announcement.offer.address);
    changeData(cardElement.querySelector('.popup__text--price'), announcement.offer.price, false, announcement.offer.price + '&#x20bd;<span>/ночь</span>');
    changeData(cardElement.querySelector('.popup__type'), arrayOfTypes[announcement.offer.type], true, arrayOfTypes[announcement.offer.type]);
    changeData(cardElement.querySelector('.popup__text--capacity'), announcement.offer.rooms, true, announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей');
    changeData(cardElement.querySelector('.popup__text--time'), announcement.offer.checkin, true, 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout);
    changeData(cardElement.querySelector('.popup__description'), announcement.offer.description, true, announcement.offer.description);
    renderCardFeatures(cardElement.querySelector('.popup__features'), announcement.offer.features);
    renderCardPhotos(cardElement.querySelector('.popup__photos'), announcement.offer.photos);
    closeCardButton.addEventListener('click', onCardCloseClick);
    document.addEventListener('keydown', onCardCloseEscape);
    removeCard();
    return cardElement;
  }

  function removeCard() {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  }

  function onCardCloseClick(evt) {
    window.utils.onBtnDown(evt, removeCard);
    removeEventListener('click', onCardCloseClick);
  }

  function onCardCloseEscape(evt) {
    window.utils.onEscDown(evt, removeCard);
    document.removeEventListener('keydown', onCardCloseEscape);
  }

  window.card = {
    createCard: createCard,
    remove: removeCard
  };

}());
