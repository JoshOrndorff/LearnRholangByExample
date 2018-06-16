"use strict";

window.addEventListener("DOMContentLoaded", () => {

  document.getElementById("submit").addEventListener("click", () => {

    var correct = 0

    if (document.getElementById("q1a1").checked) correct += 1
    if (document.getElementById("q2a2").checked) correct += 1
    if (document.getElementById("q3a3").checked) correct += 1

    document.getElementById("result").innerHTML = correct + " / 3"

  })

})
