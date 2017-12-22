var _TEST_KEY = 'am-i-private-browsing';
var _TEST_VALUE = 'apparently not';

var _CLASS_PASS = "pass";
var _CLASS_FAIL = "fail";

var _pbLocalStorage = {
    id: "localStorage",
    isSupported: !!window.localStorage,
    init: function() { window.localStorage.setItem(_TEST_KEY, _TEST_VALUE); },
    isFailed: function() { return window.localStorage.getItem(_TEST_KEY) !== null; },
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
    _pbLocalStorage,
];

window.onload = function() {
    for (var i = 0; i < _tests.length; i++) {
        runTest(_tests[i]);
    }
}
