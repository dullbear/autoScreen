# 移动端适屏方案
## 简介
> rem响应式布局，通过使用一个脚本就可以rem自适应，不用再为各种设备宽度不同而烦恼如何实现自适应的问题。

## 效果图规范
效果图大小=手机屏幕大小X手机高清率,字体大小=理想字体X手机高清率。假如已iphone5为设计参考，整体字体大小为12px,那么效果图大小应该为640px，字体大小为36px，个人建议为咯适屏，效果图基于320px3来做设计~~

## JS代码
```
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
```
## SASS代码

```
/* 360为效果图分辨率 */
$pageWdith:360/10;

/* 效果图应对那种高清屏设计 */
$devicePixelRatio:3;

/* 效果px转换为适应rem */
@function rem($px) {
    @return $px/$pageWdith/$devicePixelRatio*1rem;
}

/* 手机高清屏获取不同像素图片 */
@mixin backgroundSet($picName, $picType:jpg) {
    background-image: url(../Images/1x/#{$picName}.#{$picType});
    background-image: -webkit-image-set(url(../Images/1x/#{$picName}.#{$picType}) 1x, url(../Images/2x/#{$picName}.#{$picType}) 2x, url(../Images/3x/#{$picName}.#{$picType}) 3x, url(../Images/3x/#{$picName}.#{$picType}) 4x);
    background-image: image-set(url(../Images/1x/#{$picName}.#{$picType}) 1x, url(../Images/1x/#{$picName}.#{$picType}) 2x, url(../Images/3x/#{$picName}.#{$picType}) 3x, url(../Images/3x/#{$picName}.#{$picType}) 4x);
    background-repeat: no-repeat;
    background-size: contain;
}
```
> [DEMO](http://demo.dullbear.com/demo/weather/)
> [部分源码github地址](https://github.com/dullbear/autoScreen)

## 相关阅读

>[rem自适应布局](http://caibaojian.com/flexible-js.html)
>[HTML5响应式图片技术中文图解](http://www.zhangxinxu.com/wordpress/2015/11/anatomy-of-responsive-images/)
