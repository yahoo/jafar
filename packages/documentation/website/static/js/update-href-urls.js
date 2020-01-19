/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

// adding suffix of "index.html" to the header link,
// because we refer to S3 and they will not auto trnslate the directory referer to inner index.html
!(function () {
  let isReady = false;

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementsByTagName('HEADER')[0];
    const logo = header.childNodes[0];
    const href = `${logo.href}index.html`;
    logo.setAttribute('href', href);
  });

  window.addEventListener('message', (event) => {
    if (isReady && event.data && typeof event.data === 'string' && event.data.indexOf('#') > -1) {
      location.hash = event.data;
    }
  });

  const syncLocationWithIframe = (event) => {
    isReady = true;

    const frames = document && document.getElementsByClassName('hosted-frame');
    if (frames.length) {
      Object.values(frames || []).forEach(frame => {
        const demoUrl = frame.getAttribute('demo');
        const host = demoUrl.substr(0, demoUrl.indexOf('html') + 4);
        frame.src = `${host}${location.hash}`;
      });
    }
  };

  const syncLocationWithIframeDelayed = (event) => {
    setTimeout(()=> {
      syncLocationWithIframe(event);
    }, 20); 
  };

  window.addEventListener('load', syncLocationWithIframeDelayed);
  window.addEventListener('popstate', syncLocationWithIframe);
}());
