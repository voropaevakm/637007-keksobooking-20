'use strict';

(function () {

  function onEscDown(evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  }

  window.utils = {
    onEscDown: onEscDown
  };
}());
