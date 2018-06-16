"use strict";

window.addEventListener("DOMContentLoaded", () => {
  var codeDivs = document.getElementsByClassName("code")

  for (var codeDiv of codeDivs) {
    // Get the filename from DOM
    let filename = codeDiv.innerHTML // Closures are trippy af
    codeDiv.innerHTML = ""

    // Make the docfrag to minimize reflows
    var docFrag = document.createDocumentFragment()

    // Insert visible code
    var pre = document.createElement("pre")
    pre.classList.add("prettyprint")
    pre.classList.add("linenums")
    pre.innerHTML = code[filename].replace("<", "&lt;").replace(">", "&gt;")
    docFrag.appendChild(pre)

    // Make a div for the control buttons
    var buttons = document.createElement("div")
    buttons.setAttribute("id", "code-buttons")
    docFrag.appendChild(buttons)

    // Create rchain.cloud link
    var cloudButton = document.createElement("div")
    cloudButton.setAttribute("id", "cloud-button")
    cloudButton.innerHTML = "Run in Cloud"
    buttons.appendChild(cloudButton)
    cloudButton.addEventListener("click", () => cloud(filename))

    // Create copy link
    var copyButton = document.createElement("div")
    copyButton.setAttribute("id", "copy-button")
    copyButton.innerHTML = "Copy Code"
    buttons.appendChild(copyButton)
    copyButton.addEventListener("click", () => copy(filename))

    // Create save link
    var saveButton = document.createElement("div")
    saveButton.setAttribute("id", "save-button")
    saveButton.innerHTML = "Save Code"
    buttons.appendChild(saveButton)
    saveButton.addEventListener("click", () => save(filename))

    // Put the docfrag into the DOM
    codeDiv.appendChild(docFrag)

  }

  // Call the actual syntax highlighter
  PR.prettyPrint()




  /**
   * Runs the code on rchain.cloud in a new tab
   * @param filename name of piece bit of code to run
   */
  function cloud(filename){

    var f = document.createElement("form")
    f.setAttribute("target", "_blank")
    f.setAttribute("method", "POST")
    f.setAttribute("action", "https://rchain.cloud")

    var i1 = document.createElement("input")
    i1.setAttribute("name", "content")
    i1.setAttribute("value", code[filename])
    f.appendChild(i1)

    var i2 = document.createElement("input")
    i2.setAttribute("name", "version")
    i2.setAttribute("value", "latest")
    f.appendChild(i2)

    // Form has to be part of DOM to be submitted
    f.setAttribute("style", "display: none;")
    document.body.appendChild(f)
    f.submit()
    document.body.removeChild(f)
  }

  /**
   * Copies the code to the users clipboard
   * @param filename name of piece bit of code to copy
   */
  function copy(filename){
    navigator.clipboard.writeText(code[filename])
  }

  /**
   * Prompts user to save the code to a local file
   * https://stackoverflow.com/a/18197341
   * @param filename name of piece bit of code to save
   */
  function save(filename){
    var hiddenButton = document.createElement('a')
    hiddenButton.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code[filename]))
    hiddenButton.setAttribute('download', filename + ".rho")

    hiddenButton.style.display = 'none'
    document.body.appendChild(hiddenButton)

    hiddenButton.click()

    document.body.removeChild(hiddenButton)
  }

})
