'use strict';

(function () {
  var COUNT = 7;
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var price = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var onFilterChange = window.main.debounce(function () {
    var filteredData = window.data.slice(0);
    window.card.remove();
    window.pin.remove();
    window.pin.render(filtration(filteredData).slice(0, COUNT));
  });

  function itemFilter(it, item, i) {
    return it.value === 'any' ? true : it.value === item[i].toString();
  }

  function typeFilter(item) {
    return itemFilter(typeSelect, item.offer, 'type');
  }

  function priceFilter(item) {
    var filteringPrice = price[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.min && item.offer.price <= filteringPrice.max : true;
  }

  function roomsFilter(item) {
    return itemFilter(roomsSelect, item.offer, 'rooms');
  }

  function guestsFilter(item) {
    return itemFilter(guestsSelect, item.offer, 'guests');
  }

  function featuresFilter(item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  function filtration(data) {
    return data.filter(function (item) {
      return typeFilter(item) &&
      priceFilter(item) &&
      roomsFilter(item) &&
      guestsFilter(item) &&
      featuresFilter(item);
    });
  }

  function activate(adData) {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);

    return adData.slice(0, COUNT);
  }

  function reset() {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function deactivate() {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    reset();
    filter.removeEventListener('change', onFilterChange);
  }

  window.filter = {
    activate: activate,
    deactivate: deactivate
  };
})();
