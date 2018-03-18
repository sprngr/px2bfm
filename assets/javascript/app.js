'use strict';

window.Buffer = require('buffer');
const px2bfm = require('px2bfm');

// Drag and Drop code based off Smashing Magazine
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
let dropArea = document.querySelector('#drop-area');
let outputTextarea = document.querySelector('#output');
let outputRaw = document.querySelector('#output-raw');
let fontNameInput = document.querySelector('#font-name');
let fontCreatorInput = document.querySelector('#font-creator');
let log = document.querySelector('#error-display');

// Override console.error to let it bubble up properly
['error'].forEach((verb) => {
    console[verb] = ((method, verb, log) => {
        return (text) => {
            method(text);
            var msg = document.createElement('code');
            msg.textContent = 'Error: ' + text;
            log.appendChild(msg);
            log.classList.remove('hidden');
        };
    })(console[verb].bind(console), verb, log);
});

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
    if (outputRaw.innerHTML === "") return;

    outputRaw.select();
    document.execCommand("copy");
    document.querySelector('.output-container').classList.add('active');
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('active');
}

function unhighlight(e) {
    dropArea.classList.remove('active');
}

function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    resetLogDisplay();
    files.forEach(convertFile);
    files.forEach(previewFile);
}

function convertFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        Promise.resolve(px2bfm(reader.result, fontNameInput.value, fontCreatorInput.value))
        .then((output) => {
            // If output is undefined, an error was thrown. Handled by console override
            if (typeof output === 'undefined') return false;

            dropArea.classList.add('active');
            document.querySelector('#output-display').classList.remove('hidden');
            outputRaw.innerHTML = output;
            outputTextarea.innerHTML = output;
            hljs.highlightBlock(outputTextarea);
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

function resetLogDisplay() {
    log.classList.add('hidden');
    while (log.firstChild) {
        log.removeChild(log.firstChild);
    }
}

// Exposing on window due to some browserify scoping fuckery
window.copyText = copyText;
window.handleFiles = handleFiles;
