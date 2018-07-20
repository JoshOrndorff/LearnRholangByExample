"use strict";

//TODO Consider registering custom elements
// https://developers.google.com/web/fundamentals/web-components/customelements

window.addEventListener("DOMContentLoaded", () => {

  // Save a reference to al lquestions on the page
  var qradios = Array.from(document.getElementsByClassName("Qradio"))

  // Render all radio button questions questions
  qradios.map(makeAnswers)

  // Add submit button event listener
  document.getElementById("submit").addEventListener("click", () => {

    var earned = Array.from(document.getElementsByTagName("input")).filter(isCorrect)

    document.getElementById("result").innerHTML =
      earned.length + " / " + qradios.length

  })



  /**
   * Scores all questions on the page
   * @return A 2-tuple of points earned and points possible
   */
  //TODO apparently



  /**
   *
   */
  function isCorrect(a){
    return a.classList.contains("correct") && a.checked
  }




  /**
   * Takes a qdiv element representing a question and makes its answers
   * into fancy labelled radio buttons.
   * @param qradio The question div  representing a question.
   */
  function makeAnswers(qradio) {
    // Hash the question text to get a unique name
    let qid = hashCode(qradio.getElementsByTagName("p")[0].innerHTML)

    // Beautify each answer
    for (var label of qradio.getElementsByTagName("label")) {
      let aid = hashCode(label.innerHTML + qid)

      label.setAttribute("for", aid)

      let button = document.createElement("input")
      button.setAttribute("type", "radio")
      button.setAttribute("name", qid)
      button.setAttribute("id", aid)
      button.setAttribute("class", label.getAttribute("class"))

      qradio.insertBefore(button, label)
    }
  }



  /**
   * String hashing algorithm taken from https://stackoverflow.com/a/34842797/4184410
   * @param str the string to hash
   */
  function hashCode(str) {
   return str.split('').reduce((prevHash, currVal) =>
     (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }

})
