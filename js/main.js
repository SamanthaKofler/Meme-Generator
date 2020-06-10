'use strict';

var gImgs = [];
var gImgId = 1;

createImgs();
function createImgs() {
    createImgObj(['funny', 'trump', 'person']);
    createImgObj(['dog', 'cute']);
}

function createImgObj(keywords) {
    var img = {
        url: 'meme-imgs (square)/' + gImgId+ '.jpg',
        id: gImgId++,
        keywords: keywords
    }
    gImgs.push(img);
}

