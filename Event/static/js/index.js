document.addEventListener("DOMContentLoaded", () => {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const dots = document.querySelectorAll(".dot");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
  
    let currentSlide = 0;
    const totalSlides = dots.length;
  
    function updateSlider() {
      const offset = currentSlide * -300; // Width of one card (300px)
      sliderWrapper.style.transform = `translateX(${offset}px)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    }
  
    leftBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Wrap around
      updateSlider();
    });
  
    rightBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides; // Wrap around
      updateSlider();
    });
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        updateSlider();
      });
    });
  
    updateSlider(); // Initialize slider position
  });
  