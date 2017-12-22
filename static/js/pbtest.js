var _TEST_KEY = 'am-i-private-browsing';
var _TEST_VALUE = 'apparently not';

var _CLASS_PASS = "pass";
var _CLASS_FAIL = "fail";

var _localStorage = {
    id: "localStorage",
    isSupported: !!window.localStorage,
    init: function() { window.localStorage.setItem(_TEST_KEY, _TEST_VALUE); },
    isFailed: function() { return window.localStorage.getItem(_TEST_KEY) !== null; },
};

var _sessionStorage = {
    id: "sessionStorage",
    isSupported: !!window.sessionStorage,
    init: function() { window.sessionStorage.setItem(_TEST_KEY, _TEST_VALUE); },
    isFailed: function() { return window.sessionStorage.getItem(_TEST_KEY) !== null; },
};

var _indexedDB = {
    id: 'indexedDB',
    isSupported: !!window.indexedDB,

    _open: function() { return window.indexedDB.open('PB', 1); },
    //.onsuccess .onerror .onupgradeneeded
    init: function() { },
    isFailed: function() { },
};

function updatePass(id) {
    document.getElementById(id).className = _CLASS_PASS;
}

function updateFail(id) {
    document.getElementById(id).className = _CLASS_FAIL;
}

function runTest(test) {
    if (!test.isSupported) {
        alert(test.id + 'is not supported'); // todo
    } else if (test.isFailed()) {
        updateFail(test.id);
    } else {
        updatePass(test.id);
    }

    test.init(); // for page reload.
}

var _tests = [
    _localStorage,
    _sessionStorage,
    //_indexedDB,
];

window.onload = function() {
    for (var i = 0; i < _tests.length; i++) {
        runTest(_tests[i]);
    }
}
