'use strict';

(function () {

  function onEscDown(evt, action) {
    if (evt.key === 'Escape') {
      action();
    }
  }

  function onEnterDown(evt, action) {
    if (evt.key === 'Enter') {
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
