'use strict';
var gElCanvas;
var gCtx;

gElCanvas = document.querySelector('canvas');
gCtx = gElCanvas.getContext('2d');

function onInit() {
renderMemes();
}

function renderMemes() {
    var memeURLs = loadFromStorage('My Memes');
    for (var i = 0; i < memeURLs.length; i++) {
        var img = new Image;
        img.src = memeURLs[i];
        img.onload = function () {
            gCtx.drawImage(img, 0, 0);
        };
    }
}


function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
