'use strict';

var gTrans = {
    'nav-gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'nav-my-memes': {
        en: 'My Memes',
        he: 'הממים שלי'
    },
    'nav-about': {
        en: 'About',
        he: 'עליי'
    },
    'show-more': {
        en: 'show more',
        he: 'הצג יותר'
    },
    'placeholder-search': {
        en: 'Search',
        he: 'חפש'
    },
    funny: {
        en: 'funny',
        he: 'מצחיק'
    },
    dog: {
        en: 'dog',
        he: 'כלב'
    },
    person: {
        en: 'person',
        he: 'בן אדם'
    },
    trump: {
        en: 'trump',
        he: 'טראמפ'
    },
    usa: {
        en: 'usa',
        he: 'ארצות הברית'
    },
    president: {
        en: 'president',
        he: 'נשיא'
    },
    cute: {
        en: 'cute',
        he: ''
    },
    animal: {
        en: 'animal',
        he: 'חיה'
    },
    cat: {
        en: 'cat',
        he: 'חתול'
    },
    child: {
        en: 'child',
        he: 'ילד'
    },
    tv: {
        en: 'tv',
        he: 'טלוויזיה'
    },
    surprised: {
        en: 'surprised',
        he: 'מופתע'
    },
    laugh: {
        en: 'laugh',
        he: 'לצחוק'
    },
    obama: {
        en: 'obama',
        he: 'אובמה'
    },
    boxing: {
        en: 'boxing',
        he: ''
    },
    sport: {
        en: 'sport',
        he: ''
    },
    strong: {
        en: 'strong',
        he: 'חזק'
    },
    you: {
        en: 'you',
        he: 'אתה'
    },
    'di caprio': {
        en: 'di caprio',
        he: 'די קפריו'
    },
    movie: {
        en: 'movie',
        he: 'סרט'
    }, 
    actor: {
        en: 'actor',
        he: 'שחקן'
    },
    drink: {
        en: 'drink',
        he: 'שתייה'
    },
    glasses: {
        en: 'glasses',
        he: 'משקפיים'
    },
    exactly: {
        en: 'exactly',
        he: 'בדיוק'
    },
    right: {
        en: 'right',
        he: 'נכון'
    },
    putin: {
        en: 'putin',
        he: 'פוטין'
    },
    russia: {
        en: 'russia',
        he: 'רוסיה'
    },
    toys: {
        en: 'toys',
        he: 'צעצועים'
    },
    'toy story': {
        en: 'toy story',
        he: ''
    },
    'save-btn': {
        en: 'Save',
        he: 'שמור'
    },
    'download-btn': {
        en: 'Download',
        he: 'הורד'
    },
    'share-btn': {
        en: 'Share',
        he: 'שתף'
    },
    copyright: {
        en: '&copy All Rights Reserved 2020',
        he: 'כל הזכויות שמורות 2020'
    }
}

var gCurrLang = 'en';


function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    if (!gTrans[transKey]) return 'UNKNOWN';
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    // If translation not found - use english
    if (!trans) trans = transMap['en'];
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);
        if (el.nodeName === 'INPUT') el.placeholder = trans;
        else el.innerText = trans;
    }
}