'use strict';

(function () {
  var serverUrls = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    upload: 'https://javascript.pages.academy/keksobooking'
  };

  function createXhr(method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, url);
    return xhr;
  }

  function load(onSuccess, onError) {
    createXhr('GET', serverUrls.load, onSuccess, onError).send();
  }

  function upload(onSuccess, onError, data) {
    createXhr('POST', serverUrls.upload, onSuccess, onError).send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  };
})();
