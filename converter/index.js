"use strict"

var marked = require('marked')
var renderer = new marked.Renderer();
var fs = require('fs')


/////////////////////////
renderer.link = function(href, title, text) {

  if (text.substring(text.length - 4) !== ".rho"){
    return `<a href="${href}">${text}</a>`
  }
  var code = fs.readFileSync(href)


  return `<pre class="rholang-file">${code}</pre>`
}

renderer.code = function(code, language, escaped){
  return `<pre class="inline-code">${code}</pre>`
}



////////////////////////////////////


var filename = process.argv[2]
var markdown = fs.readFileSync(filename, 'utf-8')

var html = marked(markdown, { renderer: renderer })
var outFileName = filename.substring(0, filename.length - 3) + ".html"
fs.writeFile(outFileName, html, err => {if(err) throw err})
