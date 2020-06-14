'use strict';

var gImgs = [];
var gImgId = 1;
var gCurrImg;
var gIsFiltering = false;
var gMyMemes = [];
var gElementId = 1;
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

// Gallery with search

function getSomeKeywords() {
    return {
        'funny': gKeywords.funny,
        'animal': gKeywords.animal,
        'cute': gKeywords.cute,
        'person': gKeywords.person,
        'president': gKeywords.president,
        'child': gKeywords.child
    }
}

function getAllKeywords() {
    return gKeywords;
}

function searchImgs(keyword) {
    gIsFiltering = true;
    gKeywords[keyword]++;
    renderKeywords();
    var filteredImgs = gImgs.filter(img => img.keywords.includes(keyword, 0));
    renderImgs(filteredImgs);
    gIsFiltering = false;
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
        url: 'meme-imgs (square)/' + gImgId + '.jpg',
        id: gImgId++,
        keywords: keywords
    }
    gImgs.push(img);
}

function getImgs() {
    return gImgs;
}

function setCurrImg(id) {
    gCurrImg = gImgs[id - 1];
}

function getCurrImg() {
    return gCurrImg;
}

// Meme

function createMeme() {
    gMeme = {
        selectedImgId: gCurrImg.id,
        selectedElementId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Text',
                size: 30,
                font: 'Impact',
                align: 'center',
                colorStroke: 'black',
                colorFill: 'white',
                positionX: gElCanvas.width / 2,
                positionY: 50,
                id: gElementId++,
                lineIdx: 0
            },
            {
                txt: 'Text',
                size: 30,
                font: 'Impact',
                align: 'center',
                colorStroke: 'black',
                colorFill: 'white',
                positionX: gElCanvas.width / 2,
                positionY: gElCanvas.width - 50,
                id: gElementId++,
                lineIdx: 1
            }
        ],
        selectedStickerIdx: 0,
        stickers: []
    }
}

function getMeme() {
    return gMeme;
}

function findCurrElement() {
    var currElement = gMeme.lines.find(line => line.id === gMeme.selectedElementId);
    if (!currElement) {
        currElement = gMeme.stickers.find(sticker => sticker.id === gMeme.selectedElementId);
    }
    return currElement;
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function changeSize(diff) {
    var changeFactor = 3;
    var currElement = findCurrElement();
    if (currElement.size) currElement.size += diff * changeFactor;
    else {
        currElement.width += diff * changeFactor;
        currElement.height += diff * changeFactor;
    }
}

function moveUp() {
    gMeme.lines[gMeme.selectedLineIdx].positionY -= 10;
}

function moveDown() {
    gMeme.lines[gMeme.selectedLineIdx].positionY += 10;
}

function switchLine() {
    if (gElementId-1 !== gMeme.selectedElementId) gMeme.selectedElementId++;
    else gMeme.selectedElementId = 1;
    var currElement = findCurrElement();
    if(currElement.txt) gMeme.selectedLineIdx = currElement.lineIdx;
}

function alignText(direction) {
    var currElement = findCurrElement();
    currElement.align = direction;
}

function setStrokeColor(color) {
    var currElement = findCurrElement();
    currElement.colorStroke = color;
}

function setFillColor(color) {
    var currElement = findCurrElement();
    currElement.colorFill = color;
}

function setFont(font) {
    var currElement = findCurrElement();
    currElement.font = font;
}

function addLine() {
    if (gMeme.lines.length === 0) createMeme();
    var newPosY = (gMeme.lines[gMeme.lines.length - 1].positionY + gMeme.lines[gMeme.lines.length - 2].positionY) / 2;
    var newLine = {
        txt: 'Text',
        size: 30,
        font: 'Impact',
        align: 'center',
        colorStroke: 'black',
        colorFill: 'white',
        positionX: gElCanvas.width / 2,
        positionY: newPosY,
        id: gElementId++,
        lineIdx: gMeme.lines.length
    }
    gMeme.lines.push(newLine);
}

function deleteLine() {
    var currElement = findCurrElement();   
    if (currElement.txt) gMeme.lines.splice(gMeme.selectedLineIdx,1);
    else gMeme.stickers.splice(gMeme.selectedStickerIdx, 1);
    // update id's
    gMeme.lines.forEach(line => {
        if (line.id > currElement.id) {
            line.id--;
            line.lineIdx--;
        }
    });
    gMeme.stickers.forEach(sticker => {
        if (sticker.id > currElement.id) {
            sticker.id--;
            sticker.stickerIdx--;
        }
    });
    gElementId--;
    gMeme.selectedElementId =1;
    gMeme.selectedLineIdx = 0;
    gMeme.selectedStickerIdx = 0;
}

function addSticker(elImg, imgSrc) {
    var currSticker = {};
    currSticker['src'] = imgSrc;
    currSticker['positionX'] = gElCanvas.width/2;
    currSticker['positionY'] = gElCanvas.height/2;
    currSticker['width'] = elImg.width;
    currSticker['height'] = elImg.height;
    currSticker['id'] = gElementId++;
    currSticker['stickerIdx'] = gMeme.stickers.length-1;
    gMeme.stickers.push(currSticker);
}

function saveMeme() {
    setMyMemes();
    var dataUrl = gElCanvas.toDataURL();
    gMyMemes.push(dataUrl);
    localStorage.setItem('My Memes', JSON.stringify(gMyMemes));
}

function setMyMemes() {
    var myMemes = JSON.parse(localStorage.getItem('My Memes'));
    if (myMemes) gMyMemes = myMemes;
}