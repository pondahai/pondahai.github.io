  'use strict';
  function downloadCurrentDocument () {

    var base64doc = btoa(unescape(encodeURIComponent(document.documentElement.outerHTML))),
        a = document.createElement('a'),
        e = new MouseEvent('click');

    a.download = 'doc.html';
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);
  };
