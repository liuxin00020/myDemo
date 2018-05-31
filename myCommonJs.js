//判断浏览器是否在IE9及以下
function isIE9(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (isIE && fIEVersion <= 9) {//IE9及以下，返回true
        return true;
    }
}

/*根据自身宽度自动设置字体大小
* 对象，倍数，最大值
* */
function autoFont(obj,multiple,maxSize) {
    obj.css("font-size", parseInt(obj.width() * multiple) + "px");
    if(obj.fontSize() > maxSize){
        obj.css("font-size",maxSize + "px");
    }
}