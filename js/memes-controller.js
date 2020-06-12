'use strict';

function onInit() {
    renderMemes();
}

function renderMemes() {
    var memeURLs = JSON.parse(localStorage.getItem('My Memes'));
    renderCanvases(memeURLs.length);
    var idx = 0;
    memeURLs.forEach(function(memeURL) {
        var elCanvas = document.querySelector('#canvas' + idx);
        var ctx = elCanvas.getContext('2d');
        var img = new Image;
        img.src = memeURL;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
        idx++;
    });
}

function renderCanvases(num) {
    var strHTMLs = [];
    for (var i = 0; i < num; i++) {
    var strHTML = `<canvas id="canvas${i}" width="500" height="500"></canvas>`;
    strHTMLs.push(strHTML);
    }
    document.querySelector('.meme-gallery').innerHTML = strHTMLs.join('');
}