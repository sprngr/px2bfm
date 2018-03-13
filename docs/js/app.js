'use strict';

window.Buffer = require('buffer');
const px2bfm = require('../../lib/px2bfm.js');

// Drag and Drop code based off Smashing Magazine
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
let dropArea = document.getElementById('drop-area');

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFile(file);
}

function handleFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function() {
        // Display preview
        document.querySelector('#preview img').src = reader.result;

        Promise.resolve(px2bfm(reader.result))
            .then((output) => {
                document.getElementById('output').innerHTML = output;
            });
    }
}

// Exposing on window because browserify was being weird
window.handleFile = handleFile;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

function highlight(e) {
  dropArea.classList.add('highlight')
}

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
