var isLocalStorageSupported = !!window.localStorage;

function testLocalStorage() {
    alert('local storage!');
}

if (isLocalStorageSupported) {
    testLocalStorage();
}
