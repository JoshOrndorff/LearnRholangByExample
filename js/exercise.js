"use strict";

window.addEventListener("DOMContentLoaded", () => {

  // wait a second to let code transformation finish if there are problems
  // It's a dirty hack. I hope I don't have to do it

  var exerciseDivs = document.getElementsByClassName("exercise")

  //TODO call the function

  /**
   * Transforms a single exercise element in the DOM
   * @param exerciseDiv A div element cholding the exercise
   */
  function makeExercise(exerciseDiv) {
    // Get all the steps of hints making sure there are at least two.
    var codeDivs = exerciseDiv.getElementsByClassName("code")
    if (codeDivs.length < 2) {
      
    }

  }

})
