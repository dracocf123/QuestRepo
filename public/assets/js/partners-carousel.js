document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("logoCarousel");
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let isSliding = false;
    let autoSlide;

    function updateActiveClass() {
      const items = carousel.querySelectorAll(".logo-item");
      items.forEach(item => item.classList.remove("active"));
      if (items.length >= 3) {
        items[1].classList.add("active"); // center one
      }
    }

    function slideNext() {
      if (isSliding) return;
      isSliding = true;
      carousel.style.transition = "transform 0.4s ease-in-out";
      carousel.style.transform = `translateX(-33.33%)`;

      setTimeout(() => {
        const first = carousel.firstElementChild;
        carousel.appendChild(first);
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(0)`;
        updateActiveClass();
        isSliding = false;
      }, 400);
    }

    function slidePrev() {
      if (isSliding) return;
      isSliding = true;

      const last = carousel.lastElementChild;
      carousel.insertBefore(last, carousel.firstElementChild);
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-33.33%)`;

      setTimeout(() => {
        carousel.style.transition = "transform 0.4s ease-in-out";
        carousel.style.transform = `translateX(0)`;
      }, 10);

      setTimeout(() => {
        updateActiveClass();
        isSliding = false;
      }, 400);
    }

    function startAutoSlide() {
      autoSlide = setInterval(slideNext, 3000); // change every 3 seconds
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    // Initial setup
    updateActiveClass();
    startAutoSlide();

    // Event listeners
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      slideNext();
      startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      slidePrev();
      startAutoSlide();
    });

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  });