'use strict';

var gElCanvas = document.querySelector('canvas');
var gCtx = gElCanvas.getContext('2d');

var gIsDragging = false;

// Gallery

function onInit() {
    createImgs();
    renderImgs();
    renderDatalist();
    renderKeywords();
    setMyMemes();
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

function onSearch() {
    var searchedKeyword = document.querySelector('#keywords-list').value;
    if (!searchedKeyword) {
        renderImgs();
        return;
    };
    searchImgs(searchedKeyword);
}

// *mobile only*

function onShowMoreKeywords() {
    var elKeywords = document.querySelectorAll('.mode-keywords');
    elKeywords.forEach(keyword => keyword.style.display = 'flex');
    document.querySelector('.more-keywords').style.display = 'none';
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}


// Canvas

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

function drawCanvas() {
    var currImg = getCurrImg();
    var meme = getMeme();
    var img = new Image();
    img.src = currImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawTexts();
        if (meme.stickers.length) drawStickers();
    }
}

function drawCanvasWithMark() {
    var currImg = getCurrImg();
    var meme = getMeme();
    var img = new Image();
    img.src = currImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawTexts();
        if (meme.stickers.length) drawStickers();
        markText();
    }
}

function drawTexts() {
    var meme = getMeme();
    for (var i = 0; i < meme.lines.length; i++) {
        drawText(meme.lines[i].txt, meme.lines[i].positionX, meme.lines[i].positionY, i)
    }
}

function drawText(text, x, y, idx) {
    var meme = getMeme();
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = meme.lines[idx].colorStroke;
    gCtx.fillStyle = meme.lines[idx].colorFill;
    gCtx.font = meme.lines[idx].size + 'px ' + meme.lines[idx].font;
    gCtx.textAlign = meme.lines[idx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function markText() {
    var currMemeElement = findCurrElement();
    var meme = getMeme();
    var width = gCtx.measureText(meme.lines[meme.selectedLineIdx].txt).width;
    if (!width) width = currMemeElement.width;
    var height = currMemeElement.size;
    if (!height) height = currMemeElement.height;
    gCtx.beginPath();
    // check if the curr element is a text
    if (currMemeElement.txt) gCtx.rect(currMemeElement.positionX - (width / 2), currMemeElement.positionY - height + 2, width, height);
    else gCtx.rect(currMemeElement.positionX, currMemeElement.positionY, width + width / 4, height);
    gCtx.strokeStyle = 'white';
    gCtx.lineWidth = '2';
    gCtx.stroke();
}

function drawStickers() {
    for (var i = 0; i < gMeme.stickers.length; i++) {
        drawSticker(i)
    }
}

function drawSticker(idx) {
    var currSticker = gMeme.stickers[idx];
    var img = new Image()
    img.src = currSticker.src;
    img.onload = () => {
        gCtx.drawImage(img, currSticker.positionX, currSticker.positionY, currSticker.width, currSticker.height) //img,x,y,xend,yend
    }
}

// Meme Features

function onSetText(txt) {
    setText(txt);
    drawCanvas();
}

function onChangeSize(diff) {
    changeSize(diff);
    drawCanvas();
}

function onMoveUp() {
    moveUp();
    drawCanvas();
}

function onMoveDown() {
    moveDown();
    drawCanvas();
}

function onSwitchLine() {
    switchLine();
    // get text input:
    document.querySelector('#text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    drawCanvasWithMark();
}

function onAlign(direction) {
    alignText(direction);
    drawCanvas();
}

function onSetStrokeColor(color) {
    setStrokeColor(color);
    drawCanvas();
}

function onSetFillColor(color) {
    setFillColor(color);
    drawCanvas();
}

function onSetFont(font) {
    document.querySelector('#font-family').style.fontFamily = font;
    setFont(font);
    drawCanvas();
}

function onAddLine() {
    addLine();
    drawCanvas();
}

function onDeleteLine() {
    deleteLine();
    drawCanvas();
}

function onAddSticker(elImg, imgSrc) {
    addSticker(elImg, imgSrc);
    drawCanvas();
}

function onSave() {
    saveMeme();
}

function onDownloadCanvas(eLink) {
    const data = gElCanvas.toDataURL();
    eLink.href = data;
    eLink.download = 'my_meme';
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share on Facebook   
        </a>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function drag(ev) {
    if (ev.type === 'mousedown' || ev.type === 'touchstart') gIsDragging = true;
    if (!gIsDragging) return;
    if (ev.type === 'mousedown' || ev.type === 'mousemove') var { offsetX, offsetY } = ev;
    else {
        offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
        offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    }
    var currElement = findCurrElement();
    currElement.positionX = offsetX;
    currElement.positionY = offsetY;
    drawCanvas();
}

function drop() {
    gIsDragging = false;
}