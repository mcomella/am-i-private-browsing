var _TEST_KEY = 'am-i-private-browsing';
var _TEST_VALUE = 'apparently not';

var _CLASS_PASS = "pass";
var _CLASS_FAIL = "fail";

function updatePass(id) {
    document.getElementById(id).className = _CLASS_PASS;
}

function updateFail(id) {
    document.getElementById(id).className = _CLASS_FAIL;
}

function runTest(test) {
    if (!test.isSupported) {
        alert(test.id + 'is not supported'); // todo: update not supported.
        return new Promise(function(resolve, reject) { resolve(); });
    }

    var isFailed;
    return test.isFailed().then(function(isFailedInner) {
        isFailed = isFailedInner;
        return test.init();
    }).then(function() {
        // We block for init before returning results to avoid premature page reload.
        if (isFailed) {
            updateFail(test.id);
        } else {
            updatePass(test.id);
        }
    });
}

var _tests = [{
    id: "localStorage",
    isSupported: !!window.localStorage,
    init: function() {
        return new Promise(function(resolve, reject) {
            window.localStorage.setItem(_TEST_KEY, _TEST_VALUE);
            resolve();
        });
    },
    isFailed: function() {
        return new Promise(function(resolve, reject) {
            resolve(window.localStorage.getItem(_TEST_KEY) !== null);
        });
    },

}, {
    id: "sessionStorage",
    isSupported: !!window.sessionStorage,
    init: function() {
        return new Promise(function(resolve, reject) {
            window.sessionStorage.setItem(_TEST_KEY, _TEST_VALUE);
            resolve();
        });
    },
    isFailed: function() {
        return new Promise(function(resolve, reject) {
            resolve(window.sessionStorage.getItem(_TEST_KEY) !== null);
        });
    },

/*}, {
    id: 'indexedDB',
    isSupported: !!window.indexedDB,

    //.onsuccess .onerror .onupgradeneeded
    init: function() {
        return new Promise(function(resolve, reject) {
            var req = window.indexedDB.open('TestDB', 1);
            req.onerror = function(event) { reject("error: + " event.target.errorCode); };
            req.onsuccess = function(event) { reject("upgrade expected"); };
            req.onupgradeneeded = function(event) {
                var db = event.target.result;
                db.createObjectStore("pbTest", { keyPath: "id" });
                db.transaction.oncomplete = function(event) {
                    var pbTestObjStore = db.transaction("pbTest", "readwrite").objectStore("pbTest");
                    pbTestObjStore.add({id: 100});
                    resolve();
                };
            };
        });
    },
    isFailed: function() {
        var req = window.
    },
    */
}];

window.onload = function() {
    for (var i = 0; i < _tests.length; i++) {
        runTest(_tests[i]);
    }
}
