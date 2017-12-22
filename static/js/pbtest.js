var _TEST_KEY = 'am-i-private-browsing';
var _TEST_VALUE = 'apparently not';

var _pbLocalStorage = {
    isSupported: !!window.localStorage,
    init: function() { window.localStorage.setItem(_TEST_KEY, _TEST_VALUE); },
    hasOldData: function() { return window.localStorage.getItem(_TEST_KEY) !== null; },
};

if (_pbLocalStorage.isSupported) {
    if (!_pbLocalStorage.hasOldData()) {
        alert('pass!');
    } else {
        alert('fail!');
    }

    _pbLocalStorage.init();
}

// feature name, feature test
// if test does not pass, modify feature class
//
// initialize new test.
