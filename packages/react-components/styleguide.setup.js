window.addEventListener('hashchange', () => {
    window.parent.postMessage(location.hash, '*'); // eslint-disable-line
});