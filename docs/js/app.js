'use strict';

window.Buffer = require('buffer');
const px2bfm = require('../../lib/px2bfm.js');

// Drag and Drop code based off Smashing Magazine
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
let dropArea = document.querySelector('#drop-area');
let outputTextarea = document.querySelector('#output');
let fontNameInput = document.querySelector('#font-name').value;
let fontCreatorInput = document.querySelector('#font-creator').value;

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Copy JSON on click
outputTextarea.addEventListener('click', copyText, false);

function copyText() {
    outputTextarea.select();
    document.execCommand('Copy');
    document.querySelector('#output-display img').src = 'media/header_copied.png';
    document.querySelector('#bfm-button').classList.remove('hidden');
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    files.forEach(convertFile);
    files.forEach(previewFile);
}

function convertFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        Promise.resolve(px2bfm(reader.result, fontNameInput, fontCreatorInput))
        .then((output) => {
            document.querySelector('#output-display').classList.remove('hidden');
            outputTextarea.innerHTML = output;
        });
    }
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let upload = document.querySelector('.upload img');
        upload.src = reader.result;
    }
}

// Exposing on window due to some browserify scoping fuckery
window.copyText = copyText;
window.handleFiles = handleFiles;
