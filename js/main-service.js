'use strict';

var gImgs = [];
var gImgId = 1;
var gCurrImg;

var gElCanvas;
var gCtx;

var gMeme = {};

var gKeywords = {
    'funny': 6,
    'dog': 2,
    'person': 15,
    'trump': 1,
    'usa': 2,
    'president': 3,
    'cute': 5,
    'animal': 3,
    'cat': 1,
    'child': 5,
    'tv': 1,
    'surprised': 1,
    'laugh': 2,
    'obama': 1,
    'boxing': 1,
    'sport': 1,
    'strong': 2,
    'you': 1,
    'di caprio': 1,
    'movie': 3,
    'actor': 2,
    'drink': 1,
    'glasses': 1,
    'exactly': 1,
    'right': 1,
    'putin': 1,
    'russia': 1,
    'toys': 1,
    'toy story': 1,
}


function getSomeKeywords() {
    var selectedKeywords = {
        'funny': 6,
        'person': 15,
        'animal': 3,
        'cute': 5,
        'president': 3,
        'child': 5
    }
    return selectedKeywords;
}

function createImgs() {
    createImgObj(['funny', 'trump', 'person', 'usa', 'president']);
    createImgObj(['dog', 'cute', 'animal']);
    createImgObj(['dog', 'child', 'person', 'cute', 'animal', 'funny']);
    createImgObj(['cat', 'cute', 'animal']);
    createImgObj(['child', 'strong', 'person', 'cute', 'funny']);
    createImgObj(['tv', 'person']);
    createImgObj(['child', 'person', 'surprised', 'funny']);
    createImgObj(['funny', 'person']);
    createImgObj(['child', 'person', 'cute', 'funny', 'laugh']);
    createImgObj(['obama', 'person', 'usa', 'president', 'laugh']);
    createImgObj(['boxing', 'person', 'sport', 'strong']);
    createImgObj(['you', 'person']);
    createImgObj(['di caprio', 'person', 'actor', 'movie', 'drink']);
    createImgObj(['person', 'actor', 'glasses']);
    createImgObj(['person', 'exactly', 'right']);
    createImgObj(['person', 'actor', 'movie', 'touched']);
    createImgObj(['person', 'putin', 'president', 'russia']);
    createImgObj(['toys', 'toy story', 'movie', 'child']);
}

function createImgObj(keywords) {
    var img = {
        url: 'meme-imgs (square)/' + gImgId+ '.jpg',
        id: gImgId++,
        keywords: keywords
    }
    gImgs.push(img);
}

function getImgs() {
    return gImgs;
}

function setCurrImg(id) {
    gCurrImg = gImgs[id-1];
}

function createMeme() {
    gMeme = {
        selectedImgId: gCurrImg.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Text',
                size: 30,
                font: 'Impact',
                align: 'center',
                colorStroke: 'black',
                colorFill: 'white',
                positionX: gElCanvas.width/2,
                positionY: 50
            },
            {
                txt: 'Text',
                size: 30,
                font: 'Impact',
                align: 'center',
                colorStroke: 'black',
                colorFill: 'white',
                positionX: gElCanvas.width/2,
                positionY: gElCanvas.width-50
            }
        ]
    }
}



gElCanvas = document.querySelector('canvas');
gCtx = gElCanvas.getContext('2d');

function drawCanvas() {
    // draw image
    var img = new Image()
    img.src = gCurrImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        // drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gMeme.lines[gMeme.selectedLineIdx].positionX, gMeme.lines[gMeme.selectedLineIdx].positionY);
        drawTexts();
    }
}

function drawCanvasWithMark() {
    // draw image
    var img = new Image()
    img.src = gCurrImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        // drawText(gMeme.lines[gMeme.selectedLineIdx].txt, gMeme.lines[gMeme.selectedLineIdx].positionX, gMeme.lines[gMeme.selectedLineIdx].positionY);
        drawTexts();
        markText();
    }
}

function drawTexts() {
    gMeme.lines.forEach(line => drawText(line.txt, line.positionX, line.positionY));
}

function drawText(text, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = gMeme.lines[gMeme.selectedLineIdx].colorStroke;
    gCtx.fillStyle = gMeme.lines[gMeme.selectedLineIdx].colorFill;
    gCtx.font = gMeme.lines[gMeme.selectedLineIdx].size + 'px ' + gMeme.lines[gMeme.selectedLineIdx].font;
    gCtx.textAlign = gMeme.lines[gMeme.selectedLineIdx].align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    drawCanvas();
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
    drawCanvas();
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2;
    drawCanvas();
}

function moveUp() {
    gMeme.lines[gMeme.selectedLineIdx].positionY -= 10;
    drawCanvas();
}

function moveDown() {
    gMeme.lines[gMeme.selectedLineIdx].positionY += 10;
    drawCanvas();
}

function switchLine() {
    if (gMeme.selectedLineIdx !== gMeme.lines.length-1) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 0;
    drawCanvasWithMark();
}

function getTextInput() {
    document.querySelector('#text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function markText() {
    var currMemeLine = gMeme.lines[gMeme.selectedLineIdx];
    var width = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width;
    var height = currMemeLine.size;
    // var height = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).height;
    gCtx.beginPath();
    gCtx.rect(currMemeLine.positionX - (width/2), currMemeLine.positionY - height + 2, width, height);
    gCtx.strokeStyle = 'white';
    gCtx.lineWidth = '1';
    gCtx.stroke();
    // gCtx.fillStyle = 'orange';
    // gCtx.fillRect(gMeme.lines[g.Meme.selectedLineIdx].positionX, gMeme.lines[g.Meme.selectedLineIdx].positionY, 150, gMeme.lines[gMeme.selectedLineIdx].size);
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorStroke = color;
    drawCanvas();

}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].colorFill = color;
    drawCanvas();
}

function alignText(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction;
    drawCanvas();
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
    // gMeme.lines[gMeme.selectedLineIdx].align = direction;
    drawCanvas();
}


function addLine() {
    if (gMeme.lines.length === 0) createMeme();
    var newPosY = (gMeme.lines[gMeme.lines.length-1].positionY + gMeme.lines[gMeme.lines.length-2].positionY) / 2;
    var newLine = {
        txt: 'Text',
        size: 30,
        font: 'Impact',
        align: 'center',
        colorStroke: 'black',
        colorFill: 'white',
        positionX: gElCanvas.width/2,
        positionY: newPosY
    }
    gMeme.lines.push(newLine);
    drawCanvas();
}

function deleteLine() {
    gMeme.lines.pop();
    drawCanvas();
}



function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_meme';
}

function searchImgs(keyword) {
    console.log(keyword)
    var filteredImgs = gImgs.filter(img => img.keywords.includes(keyword, 0));
    console.log(filteredImgs);
    renderImgs(filteredImgs);
}

function sortKeywords() {
   
}