'use strict';

(function () {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLES = ['Сдам квартиру', 'Тихое и уютное место в центре Токио', 'Сдал соседа и квартиру сдам', 'Недвижимость в центре Токио', 'В аренду только семейным', 'Ищу нового соседа и квартиру', 'Ищу комнату с видом на частный сектор', 'Ищу смысла жизни, сдам комнату'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  window.data = {
    getAnnouncement: getAnnouncement
  };
}());
