'use strict';

function onInit() {
    createImgs();
    renderImgs();
    renderDatalist();
    renderKeywords();
}

function renderImgs(imgs) {
    if (document.querySelector('#keywords-list').value === '') imgs = getImgs();
    var strHTML = imgs.map(function(img) {
        return `<img class="image" src="${img.url}" alt="" onclick="onStart('${img.id}')">`
    }).join('');
    document.querySelector('.images-container').innerHTML = strHTML;
}

function renderDatalist() {
    var keywords = getSomeKeywords();
    var strHTMLs = [];
    for (var keyword in keywords) {
        strHTMLs.push(`<option value="${keyword}">`);
    }
    document.querySelector('#keywords').innerHTML = strHTMLs.join('');
}

function renderKeywords() {
    var keywords = getSomeKeywords();
    var strHTMLs = [];
    for (var keyword in keywords) {
        var strHTML = `<p class="mode-keywords" style="font-size:${keywords[keyword] * 0.3}rem">${keyword}`;
        strHTMLs.push(strHTML);
    }
    document.querySelector('.keywords').innerHTML = strHTMLs.join('');
}

function onIncreaseFont() {
    increaseFont();
}

function onDecreaseFont() {
    decreaseFont();
}

function onMoveUp() {
    moveUp();
}

function onMoveDown() {
    moveDown();
}

function onSwitchLine() {
    switchLine();
    getTextInput();
}

function onStart(imgId) {
    setCurrImg(imgId);
    createMeme();
    showEditor();
    drawCanvasWithMark();
}

function showEditor() {
    document.querySelector('.meme-section').style.display = 'block';
    document.querySelector('.gallery').style.display = 'none';
}

function onAlign(direction) {
    alignText(direction);
}

function onSetStrokeColor(color) {
    setStrokeColor(color);
}

function onSetFillColor(color) {
    setFillColor(color);
}

function onSetFont(font) {
    setFont(font);
}

function onAddLine() {
    addLine();
}

function onDeleteLine() {
    deleteLine();
}

function onSearch() {
    var searchedKeyword = document.querySelector('#keywords-list').value;
    searchImgs(searchedKeyword);
}