'use strict';

//判断访问终端
var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) //是否为移动终端

        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function insertStyle() {
    var //定义屏幕高清度 
    dpr = 1,

    //定义缩放比例
    scale = 1,

    //获取html节点
    docEl = document.documentElement,

    //创建style
    fontEl = document.createElement('style'),

    //查找meta[name="viewport"]节点
    metaEl = document.querySelector('meta[name="viewport"]'),
        clientW = 0;

    //获取屏幕高清度（四舍五入）

    dpr = Math.round(window.devicePixelRatio || 1);

    //是否为移动设备
    if (!browser.versions.mobile) {
        //否=自定义宽度480px
        clientW = 480;
        docEl.style.width = '480px';
        docEl.style.margin = '0 auto';
    } else {
        //是=获取屏幕宽度
        clientW = window.screen.width;
    }

    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + scale * clientW + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);
    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.id = "styleHtml";
    fontEl.innerHTML = 'html{font-size:' + clientW / 10 + 'px!important;}';
};

insertStyle();

//窗口大小改变刷新页面
window.addEventListener("resize", function () {
    var time;
    window.clearTimeout(time);
    time = setTimeout(function () {
        var tynode = document.getElementById("styleHtml");
        tynode.parentNode.removeChild(tynode);
        insertStyle();
    }, 100);
}, false);