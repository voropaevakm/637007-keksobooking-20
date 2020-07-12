'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Сдам квартиру', 'Тихое и уютное место в центре Токио', 'Сдал соседа и квартиру сдам', 'Недвижимость в центре Токио', 'В аренду только семейным', 'Ищу нового соседа и квартиру', 'Ищу комнату с видом на частный сектор', 'Ищу смысла жизни, сдам комнату'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COUNT = 8;

var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 375;
var PIN_SIZE_POINT_Y = 22;

var BORDER = '2px solid red';

var pinSize = {
  x: 65,
  y: 65,
};

/*var arrayOfTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};*/

var mainPin = document.querySelector('.map__pin--main');
var similarPinElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = document.createDocumentFragment();
//var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardFragment = document.createDocumentFragment();
var map = document.querySelector('.map');
var cardBeforeElement = map.querySelector('.map__filters-container');
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

var getAnnouncement = function () {
  var announcement = {
    author: {
      avatar: AVATARS[getRandomIndex(AVATARS)]
    },
    offer: {
      title: TITLES[getRandomIndex(TITLES)],
      address: getRandomRange(1, 600) + ', ' + getRandomRange(1, 350),
      price: getRandomRange(10000, 50000),
      type: TYPES[getRandomIndex(TYPES)],
      rooms: getRandomRange(1, 3),
      guests: getRandomRange(1, 3),
      checkin: CHECKINS[getRandomIndex(CHECKINS)],
      checkout: CHECKOUTS[getRandomIndex(CHECKOUTS)],
      features: FEATURES.slice(0, getRandomRange(0, FEATURES.length)),
      description: DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)],
      photos: PHOTOS.slice(0, getRandomRange(0, PHOTOS.length)),
    },
    location: {
      x: getRandomRange(45, 1155),
      y: getRandomRange(130, 630)
    }
  };
  return announcement;
};

function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIndex(selectArray) {
  return Math.floor(Math.random() * Math.floor(selectArray.length));
}

function renderPinFragment(announcement) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = announcement.author.avatar;
  pinElement.querySelector('img').alt = announcement.offer.title;
  pinElement.style = 'left: ' + announcement.location.x + 'px; top: ' + announcement.location.y + 'px;';

  return pinElement;
}

function getInsert() {
  for (var i = 0; i < COUNT; i++) {
    pinFragment.appendChild(renderPinFragment(getAnnouncement()));
  }
  return similarPinElement.appendChild(pinFragment);
}

/*function changeData(nodeElement, data, option, insertText) {
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

function renderCardFragment(announcement) {
  var cardElement = similarCardTemplate.cloneNode(true);

  changeData(cardElement.querySelector('.popup__title'), announcement.offer.title, true, announcement.offer.title);
  changeData(cardElement.querySelector('.popup__text--address'), announcement.offer.address, true, announcement.offer.address);
  changeData(cardElement.querySelector('.popup__text--price'), announcement.offer.price, false, announcement.offer.price + '&#x20bd;<span>/ночь</span>');
  changeData(cardElement.querySelector('.popup__type'), arrayOfTypes[announcement.offer.type], true, arrayOfTypes[announcement.offer.type]);
  changeData(cardElement.querySelector('.popup__text--capacity'), announcement.offer.rooms, true, announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей');
  changeData(cardElement.querySelector('.popup__text--time'), announcement.offer.checkin, true, 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout);
  changeData(cardElement.querySelector('.popup__description'), announcement.offer.description, true, announcement.offer.description);
  renderCardFeatures(cardElement.querySelector('.popup__features'), announcement.offer.features);
  renderCardPhotos(cardElement.querySelector('.popup__photos'), announcement.offer.photos);

  return cardElement;
}*/

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

function getAddressPointInput() {
  addressInput.value = Math.ceil(MAIN_PIN_X + pinSize.x / 2) + ', ' + Math.ceil(MAIN_PIN_Y + pinSize.y + PIN_SIZE_POINT_Y);
}

function mainPinMouseDown(evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    getInsert(COUNT);
    activationFilterInput(filterItems, true);
    activationFilterInput(adFormFieldsets, true);
    getAddressPointInput();
  }
  mainPin.removeEventListener('mousedown', mainPinMouseDown);
}

function mainPinKeyDown(evt) {
  evt.preventDefault();
  if (evt.keyCode === 13) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    getInsert(COUNT);
    activationFilterInput(filterItems, true);
    activationFilterInput(adFormFieldsets, true);
    getAddressPointInput();
  }
  mainPin.removeEventListener('keydown', mainPinKeyDown);
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

function getTitleBorder() {
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
  roomsGuestsValues[person].forEach(function (setAmount) {
    capacityOptions.forEach(function (option) {
      if (Number(option.value) === setAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
}

activationFilterInput(filterItems, false);

activationFilterInput(adFormFieldsets, false);

addressInput.value = Math.ceil(MAIN_PIN_X + pinSize.x / 2) + ', ' + Math.ceil(MAIN_PIN_Y + pinSize.y / 2);

// cardFragment.appendChild(renderCardFragment(getAnnouncement()));

map.append(cardFragment, cardBeforeElement);

mainPin.addEventListener('mousedown', mainPinMouseDown);

mainPin.addEventListener('keydown', mainPinKeyDown);

titleInput.addEventListener('invalid', getTitleBorder);

timeInInput.addEventListener('change', changeTimeInInput);

timeOutInput.addEventListener('change', changeTimeOutInput);

typeInput.addEventListener('change', changeTypeInput);

roomNumberSelect.addEventListener('change', function (evt) {
  var person = evt.target;
  changeRoomsNumbers(person.value);
});
