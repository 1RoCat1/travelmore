const booking = function () {
  const bookingBtn = document.querySelector(".button-booking");
  const booking = document.getElementById("modal-booking");
  const closeBtn = booking.querySelector(".modal-close");
  const bookingTable = booking.querySelector(".booking-table__hotels");
  const modalForm = booking.querySelector(".modal-form");
  const cardTableTotal = booking.querySelector(".card-table__total");
  const hotelsContainer = document.querySelector(".long-hotels-list");

  const deletebookingItem = (id) => {
    const booking = JSON.parse(localStorage.getItem("booking"));

    const newbooking = booking.filter((hotel) => hotel.id !== id);

    localStorage.setItem("booking", JSON.stringify(newbooking));
    renderBookingHotels(JSON.parse(localStorage.getItem("booking")));
  };

  const plusbookingItem = (id) => {
    const booking = JSON.parse(localStorage.getItem("booking"));

    const newbooking = booking.map((hotel) => {
      if (hotel.id === id) {
        hotel.count++;
      }
      return hotel;
    });

    localStorage.setItem("booking", JSON.stringify(newbooking));
    renderBookingHotels(JSON.parse(localStorage.getItem("booking")));
  };

  const minusbookingItem = (id) => {
    const booking = JSON.parse(localStorage.getItem("booking"));

    const newbooking = booking.map((hotel) => {
      if (hotel.id === id) {
        if (hotel.count > 0) {
          hotel.count--;
        }
      }
      return hotel;
    });

    localStorage.setItem("booking", JSON.stringify(newbooking));
    renderBookingHotels(JSON.parse(localStorage.getItem("booking")));
  };

  const addTobooking = (id) => {
    const hotels = JSON.parse(localStorage.getItem("hotels"));
    const clickedhotel = hotels.find((hotel) => hotel.id === id);
    const booking = localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : [];

    if (booking.some((hotel) => hotel.id === clickedhotel.id)) {
      booking.map((hotel) => {
        if (hotel.id === clickedhotel.id) {
          hotel.count++;
        }
        return hotel;
      });
    } else {
      clickedhotel.count = 1;
      booking.push(clickedhotel);
    }

    localStorage.setItem("booking", JSON.stringify(booking));
  };

  const renderBookingHotels = (hotels) => {
    bookingTable.innerHTML = "";
    priceTotal = 0;

    hotels.forEach((hotel) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${hotel.name}</td>
        <td>₽${hotel.price} тыс.</td>
        <td><button class="booking-btn-minus"">-</button></td>
        <td>${hotel.count}</td>
        <td><button class="booking-btn-plus"">+</button></td>
        <td>₽${+hotel.price * +hotel.count} тыс.</td>
        <td><button class="booking-btn-delete"">x</button></td>
      `;

      bookingTable.append(tr);

      tr.addEventListener("click", (event) => {
        if (event.target.classList.contains("booking-btn-minus")) {
          minusbookingItem(hotel.id);
        } else if (event.target.classList.contains("booking-btn-plus")) {
          plusbookingItem(hotel.id);
        } else if (event.target.classList.contains("booking-btn-delete")) {
          deletebookingItem(hotel.id);
        }
      });

      priceTotal = priceTotal + hotel.price * hotel.count;
    });

    cardTableTotal.textContent = `₽${priceTotal} тыс.`;
  };

  const sendForm = () => {
    const bookingArray = localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : [];

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        booking: bookingArray,
        name: "",
        phone: "",
      }),
    }).then(() => {
      booking.style.display = "";
      localStorage.removeItem("booking");
    });
  };

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
  });

  bookingBtn.addEventListener("click", function () {
    const bookingArray = localStorage.getItem("booking")
      ? JSON.parse(localStorage.getItem("booking"))
      : [];
    renderBookingHotels(bookingArray);

    booking.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    booking.style.display = "";
  });

  booking.addEventListener("click", (event) => {
    if (
      !event.target.closest(".modal") &&
      event.target.classList.contains("overlay")
    ) {
      booking.style.display = "";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Esc" || event.key === "Escape") {
      booking.style.display = "";
    }
  });

  if (hotelsContainer) {
    hotelsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-booking")) {
        const buttonTobooking = event.target.closest(".add-to-booking");
        const hotelId = buttonTobooking.dataset.id;

        addTobooking(hotelId);
      }
    });
  }
};

booking();
