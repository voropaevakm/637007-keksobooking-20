'use strict';

(function () {

  function onEscDown(evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  }

  function onEnterDown(evt, action) {
    if (evt.keyCode === 13) {
      action();
    }
  }

  function onBtnDown(evt, action) {
    if (evt.button === 0) {
      action();
    }
  }

  window.utils = {
    onEscDown: onEscDown,
    onEnterDown: onEnterDown,
    onBtnDown: onBtnDown
  };
}());
