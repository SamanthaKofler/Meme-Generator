'use strict';

function onInit() {
    createImgs();
    renderImgs();
    renderDatalist();
    renderKeywords();
    getMyMemes();
}

function renderImgs(imgs) {
    if (!gIsFiltering) imgs = getImgs();
    var strHTML = imgs.map(function (img) {
        return `<img class="image" src="${img.url}" alt="" onclick="onStart('${img.id}')">`
    }).join('');
    document.querySelector('.images-container').innerHTML = strHTML;
}

function renderDatalist() {
    var keywords = getAllKeywords();
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
        var strHTML = `<li class="mode-keywords" style="font-size:${keywords[keyword] * 0.3}rem" onclick="searchImgs('${keyword}')">${keyword}</li>`;
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
    getCanvas();
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
    document.querySelector('#font-family').style.fontFamily = font;
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
    if (!searchedKeyword) {
        renderImgs();
        return;
    };
    searchImgs(searchedKeyword);
}

function onDownloadCanvas(eLink) {
    downloadCanvas(eLink);
}

function onSave() {
    saveMeme();
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onShowMoreKeywords() {
    var elKeywords = document.querySelectorAll('.mode-keywords');
    elKeywords.forEach(keyword => keyword.style.display = 'flex');
    document.querySelector('.more-keywords').style.display = 'none';
}

function onPutSticker(elImg, imgSrc) {
    putSticker(elImg, imgSrc);
}