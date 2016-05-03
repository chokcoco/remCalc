// 以 320 的设备宽度为基准，320 下 10px 为 1rem
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// 另外一种 rem 适配方案
(function() {
  var dpr, rem, scale;
  var docEl = document.documentElement;
  var fontEl = document.createElement('style');
  var metaEl = document.querySelector('meta[name="viewport"]');

  dpr = window.devicePixelRatio || 1;
  rem = docEl.clientWidth * 2 / 10;
  scale = 1 / dpr;


  // 设置viewport，进行缩放，达到高清效果
  metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

  // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute('data-dpr', dpr);

  // 动态写入样式
  docEl.firstElementChild.appendChild(fontEl);
  fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

  // 给js调用的，某一dpr下rem和px之间的转换函数
  window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
  };
  window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
  };

  window.dpr = dpr;
  window.rem = rem;
})();
