"use strict";

window.addEventListener("DOMContentLoaded", () => {

  // Globals
  var currentSlide = 0
  var prevButton = document.getElementById("prev-button")
  var nextButton = document.getElementById("next-button")
  var slides = document.getElementsByClassName("slide")
  var completed = document.getElementById("completed")

  // Add event listeners
  prevButton.addEventListener("click", () => changeSlideBy(-1))
  nextButton.addEventListener("click", () => changeSlideBy(1))
  window.addEventListener("keyup", (e)=>{
    var code = e.keyCode ? e.keyCode : e.which
    if (code === 37) {changeSlideBy(-1)}
    else if (code === 39) {changeSlideBy(1)}
  })

  // Make first slide current
  changeSlideBy(0)

  /**
   * Changes the currently visible slide by the number given.
   * @param by How many to change slide by (generally 1 or -1)
   */
  function changeSlideBy(by){
    // Make sure next slide is in valid range
    var nextSlide = currentSlide + by
    if (nextSlide < 0 || nextSlide >= slides.length) return

    // Display correct slides
    slides[currentSlide].classList.remove("current")
    slides[nextSlide].classList.add("current")
    currentSlide = nextSlide

    // Enable or disable nav buttons
    if (currentSlide > 0 && currentSlide < slides.length - 1){
      nextButton.classList.remove("disabled")
      prevButton.classList.remove("disabled")
    }
    if (currentSlide === 0) {
      prevButton.classList.add("disabled")
    }
    if (currentSlide === slides.length - 1){
      nextButton.classList.add("disabled")
    }

    // Update the progress bar
    var x = (currentSlide) * 100.0 / (slides.length - 1)
    completed.setAttribute("style", "width:" + x + "%;")
  }



})
