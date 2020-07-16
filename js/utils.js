'use strict';

(function () {

  function isEscEvent(evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  }

  window.utils = {
    isEscEvent: isEscEvent
  };
}());
