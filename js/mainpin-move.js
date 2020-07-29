'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var newLocation;
  var onMainPinMouseMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = mainPin.offsetLeft - shift.x;
      var currentY = mainPin.offsetTop - shift.y;

      var minX = Math.floor(window.map.MAIN_PIN_WIDTH / -2);
      var maxX = window.map.WIDTH - Math.round(window.map.MAIN_PIN_WIDTH / 2);
      var minY = LOCATION_Y_MIN - window.map.MAIN_PIN_HEIGHT - window.map.MAIN_PIN_CURSOR_HEIGHT;
      var maxY = LOCATION_Y_MAX - window.map.MAIN_PIN_HEIGHT - window.map.MAIN_PIN_CURSOR_HEIGHT;

      if (currentX < 0) {
        currentX = minX;
      } else if (currentX > maxX) {
        currentX = maxX;
      } else {
        currentX = mainPin.offsetLeft - shift.x;
      }

      if (currentY < minY) {
        currentY = minY;
      } else if (currentY > maxY) {
        currentY = maxY;
      } else {
        currentY = mainPin.offsetTop - shift.y;
      }

      mainPin.style.left = currentX + 'px';
      mainPin.style.top = currentY + 'px';

      newLocation = {
        x: currentX + Math.round(window.map.MAIN_PIN_WIDTH / 2),
        y: currentY + window.map.MAIN_PIN_HEIGHT
      };

      window.map.renderAddress(true, newLocation);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinMouseMove);

})();
