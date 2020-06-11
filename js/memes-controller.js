'use strict';
var gElCanvas;
var gCtx;


function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMemes();
}

function renderMemes() {
    var memeURLs = loadFromStorage('My Memes');
    memeURLs.forEach(function(memeURL) {
        var img = new Image;
        img.src = memeURL;
        img.onload = function () {
            gCtx.drawImage(img, 0, 0);
        }
    });
}


function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
