'use strict';

window.Buffer = require('buffer');
const px2bfm = require('../../lib/px2bfm.js');

// Drag and Drop code based off Smashing Magazine
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  files.forEach(convertFile)
  files.forEach(previewFile)
}

function convertFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
      Promise.resolve(px2bfm(reader.result))
          .then((output) => {
              document.getElementById('output').innerHTML = output;
          });
  }
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
      document.querySelector('#preview img').src = reader.result;
  }
}

// Exposing on window due to some browserify scoping fuckery
window.handleFiles = handleFiles;
