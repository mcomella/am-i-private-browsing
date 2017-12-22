var _TEST_KEY = 'am-i-private-browsing';
var _TEST_VALUE = 'apparently not';

var _CLASS_PASS = "pass";
var _CLASS_FAIL = "fail";

var _pbLocalStorage = {
    id: "localStorage",
    isSupported: !!window.localStorage,
    init: function() { window.localStorage.setItem(_TEST_KEY, _TEST_VALUE); },
    hasOldData: function() { return window.localStorage.getItem(_TEST_KEY) !== null; },
};

function updatePass(id) {
    document.getElementById(id).className = _CLASS_PASS;
}

function updateFail(id) {
    document.getElementById(id).className = _CLASS_FAIL;
}

window.onload = function() {
    if (_pbLocalStorage.isSupported) {
        if (!_pbLocalStorage.hasOldData()) {
            updatePass(_pbLocalStorage.id);
        } else {
            updateFail(_pbLocalStorage.id);
        }

        _pbLocalStorage.init();
    }
}

// feature name, feature test
// if test does not pass, modify feature class
//
// initialize new test.
