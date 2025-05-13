const search = function () {
  const input = document.querySelector('.search-block > input');
  const searchBtn = document.querySelector('.search-block > button');

  const renderhotels = (hotels) => {
    const hotelsContainer = document.querySelector('.long-hotels-list');

    hotelsContainer.innerHTML = "";

    hotels.forEach(hotel => {
      const hotelBlock = document.createElement('div');

      hotelBlock.classList.add('col-lg-3');
      hotelBlock.classList.add('col-sm-6');

      hotelBlock.innerHTML = `
        <div class="hotels-card">
          <span class="label ${hotel.label ? null : 'd-none'}">${hotel.label}</span>
          <img src="db/${hotel.img}" alt="${hotel.name}" class="hotels-image">
          <h3 class="hotels-title">${hotel.name}</h3>
          <p class="hotels-description">${hotel.description}</p>
          <button class="button hotels-card-btn add-to-booking" data-id="${hotel.id}">
            <span class="button-price">от ₽${hotel.price} тыс./сутки</span>
          </button>
        </div>
      `;

      hotelsContainer.append(hotelBlock);
    });
  };

  const getData = (value) => {
    fetch('../db/db.json')
      .then((res) => res.json())
      .then((data) => {
        const array = data.filter(hotel => hotel.name.toLowerCase().includes(value.toLowerCase()));

        localStorage.setItem('hotels', JSON.stringify(array));

        if (window.location.pathname !== "/hotels.html") {
          window.location.href = "/hotels.html";
        } else {
          renderhotels(array);
        }
      });
  };

  searchBtn.addEventListener('click', () => {
    getData(input.value);
  });
};

search();