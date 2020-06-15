'use strict';

var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLE = ['Сдам квартиру', 'Тихое и уютное место в центре Токио', 'Сдал соседа и квартиру сдам', 'Недвижимость в центре Токио', 'В аренду только семейным', 'Ищу нового соседа и квартиру', 'Ищу комнату с видом на частный сектор', 'Ищу смысла жизни, сдам комнату'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COUNT = 8;

var arrayOfTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

//Функция получения случайного числа в заданном интервале
function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Функция получения случайного числа
function getRandomIndex(selectArray) {
  return Math.floor(Math.random() * Math.floor(selectArray.length));
}

//Функция формирования объекта карточки
var getAnnouncement = function () {
  var announcement = {
    author: {
      avatar: AVATAR[getRandomIndex(AVATAR)]
    },
    offer: {
      title: TITLE[getRandomIndex(TITLE)],
      address: getRandomRange(1, 600) + ', ' + getRandomRange(1, 350),
      price: getRandomRange(10000, 50000),
      type: TYPE[getRandomIndex(TYPE)],
      rooms: getRandomRange(1, 3),
      guests: getRandomRange(1, 3),
      checkin: CHECKIN[getRandomIndex(CHECKIN)],
      checkout: CHECKOUT[getRandomIndex(CHECKOUT)],
      features: FEATURES.slice(0, getRandomInRange(0, FEATURES.length)),
      description: DESCRIPTION[getRandomIndex(DESCRIPTION)],
      photos: PHOTOS.slice(0, getRandomInRange(0, PHOTOS.length)),
    },
      location: {
        x: getRandomRange(45, 1155),
        y: getRandomRange(130, 630);
      }
    }
  };

  return announcement;
}

//Создание DOM-элементов, соответствующим меткам на карте
var similarPinElement = document.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

function renderPinFragment(announcement) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = announcement.author.avatar;
  pinElement.querySelector('img').alt = announcement.offer.title;
  pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';

  return pinElement;
}

var pinFragment = document.createDocumentFragment();

function getInsert(COUNT) {
  for (var i = 0; i < COUNT; i++) {
    pinFragment.appendChild(renderPinFragment(getAnnouncement()));
  }
  return similarPinElement.appendChild(pinFragment);
}

getInsert(COUNT);

//Поиск шаблона карточки
var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

//Функция проверки данных
function checkData(nodeElement, data, option, insertText) {
  if (!data) {
    nodeElement.style.display = 'none';
    return;
  } else {
    if (option) {
      nodeElement.textContent = insertText;
    } else {
      nodeElement.innerHTML = insertText;
    }
  }
}

//Вспомогательная функция рендеринга свойства Features объекта
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

//Вспомогательная функция рендеринга свойства Photos объекта
function renderPhotosPopup(nodeElement, photosArray) {
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

//Главная функция рендеринга
var cardFragment = document.createDocumentFragment();

function renderCardFragment(announcement) {
  var cardElement = similarCardTemplate.cloneNode(true);

  checkData(cardElement.querySelector('.popup__title'), announcement.offer.title, true, announcement.offer.title);
  checkData(cardElement.querySelector('.popup__text--address'), announcement.offer.address, true, announcement.offer.address);
  checkData(cardElement.querySelector('.popup__text--price'), announcement.offer.price, false, announcement.offer.price);
  checkData(cardElement.querySelector('.popup__type'), arrayOfTypes[announcement.offer.type], true, arrayOfTypes[announcement.offer.type]);
  checkData(cardElement.querySelector('.popup__text--capacity'), announcement.offer.rooms, true, announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей');
  checkData(cardElement.querySelector('.popup__text--time'), announcement.offer.checkin, true, 'Заезд в ' + announcement.offer.checkin + ', выезд в ' + announcement.offer.checkout);
  checkData(cardElement.querySelector('.popup__description'), announcement.offer.description, true, announcement.offer.description);
  renderCardFeatures(cardElement.querySelector('.popup__features'), announcement.offer.features);
  renderCardPhotos(cardElement.querySelector('.popup__photos'), announcement.offer.photos);

  return cardElement;
}

cardFragment.appendChild(renderCardFragment(getAnnouncement()));

// Удаление свойства .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cardBeforeElement = map.querySelector('.map__filters-container');
map.append(cardFragment, cardBeforeElement);
