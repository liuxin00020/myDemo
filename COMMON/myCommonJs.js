/** 显示
 * @param obj 需要显示的对象
 */
function show(obj) {
    obj.style.display = "block";
}

/** 隐藏
 * @param obj 需要隐藏的对象
 */
function hide(obj) {
    obj.style.display = "none";
}

/** 获取Id下的class对象
 * @param id:对象Id
 * @param classname:id下的className
 *  @return class标签数组
 * */
function getClass(id, classname) {
    if (document.getElementsByClassName) {//支持类名获取
        if (id) {//存在id,获取id下的class
            var eleid = document.getElementById(id);
            return eleid.getElementsByClassName(classname);
        } else {
            return document.getElementsByClassName(classname);
        }
    }
    //不支持类名获取（IE8）
    var arr = [];//存储返回classs数组
    var dom = [];//存储dom节点
    if (id) {
        dom = document.getElementById(id).getElementsByTagName("*");//id下的所有元素
    } else {//无Id,则查询所有节点，遍历找到类节点
        dom = document.getElementsByTagName("*");
    }
    for (var i = 0; i < dom.length; i++) {//遍历dom节点，找到包含classname的节点
        var txtarr = dom[i].className.split(" ");//多个class分割
        for (var j = 0; j < txtarr.length; j++) {//遍历classs数组
            if (txtarr[j] == classname) {//判断是否有classname，有则插入数组
                arr.push(dom[i]);
            }
        }
    }
    return arr;
}

/** $("#demo")  $(".demo")  $("div")
 *  @param id || class || tagName
 */

function $(str) {
    var s = str.charAt(0); //返回首个字符串 #
    var ss = str.substr(1); //返回第1个之后的字符 demo
    switch (s) {
        case "#" :
            return document.getElementById(ss);
            break;
        case "." : {
            return getClass("", ss);
            break;
        }
        default : {
            return document.getElementsByTagName(str);
            break;
        }
    }
}

/**
 * 封装scrollTop 和 scrollLeft
 * @return {left:scrollLeft , top:scrollTop}
 * */
function scroll() {
    if (window.pageYOffset != null) {
        return {"left": window.pageXOffset, "top": window.pageYOffset};
    }
    // 检测是否是怪异模式的浏览器 就是没有<!DOCTYPE html>
    else if (document.compatMode == "CSS1Compat") { // 已声明
        return {"left": document.documentElement.scrollLeft, "top": document.documentElement.scrollTop};
    }
    // 剩下是怪异模式的
    return {"left": document.body.scrollLeft, "top": document.body.scrollTop};
}

/** 封装可视化区域宽度和高度
 * @return {width:10 , height:10}
 * */
function client() {
    if (window.innerWidth != null) { // IE9+ 及新浏览器
        return {width: window.innerWidth, height: innerHeight};
    }
    else if (document.compatMode == "CSS1Compat") { // 标准浏览器
        return {width: document.documentElement.clientWidth};
    }
    else { // 怪异浏览器
        return {width: document.body.clientWidth, height: document.body.clientHeight};
    }
}

/** 防止冒泡
 * @param event 事件对象
 * */
function forbidBubble(event) {
    var event = event || window.event;
    if (event && event.stopPropagation) { // 标准浏览器
        event.stopPropagation();
    } else { // IE9-
        event.cancelBubble = true;
    }
}

/** 获取当前事件对象Id  如document.onclick事件，点击id=mask元素，则返回mask
 * @return targetId（存在event,返回事件操作Id） || null（不存在event）
 * @param event 事件对象
 * */
function getTargetId(event) {
    var event = event || window.event;
    if (event) {
        return event.target ? event.target.id : event.srcElement.id;
    } else {
        return null;
    }
}
/** 获取选中的文字
 * @param event 时间对象
 * @return 字符串
 * */
function getSelectionTxt(event) {
    var event = event || window.event;
    if(event && event.getSelection){ // 标准浏览器
        return event.getSelection().toString();
    }else{ // IE9-
        return event.selection.createRange().text;
    }
}

/** 在元素内选中文字后300毫秒弹出对话框
 * @param obj:弹出框对象
 * @param mouseX:鼠标x坐标
 * @param mouseY:鼠标Y坐标  txt:选中的文本
*/
function showBox(obj,mouseX,mouseY,txt) {
    // 300毫秒后显示
    setTimeout(function () {
        obj.style.display = "block";
        obj.style.left = mouseX + "px";
        obj.style.top = mouseY + "px";
        obj.innerHTML = txt;
    },300);

}

/**
 * 匀速运动函数
 * @param obj 运动的盒子
 * @param target 相对盒子的offsetLeft目标位置
 */
function animateUniform(obj, target) {
    clearInterval(obj.timer); // 先清除定时器
    // 走到target位置，判断应该+还是-
    var speed = obj.offsetLeft < target ? 5 : -5;
    // 定时开始
    obj.timer = setInterval(function () {
        var result = target - obj.offsetLeft; // 定时器停下来的变量，他们的差值不可能小于5
        obj.style.left = obj.offsetLeft + speed + "px";
        if (Math.abs(result) <= 5) { // 绝对值，差值小于5，则到位置
            clearInterval(obj.timer);
            obj.style.left = target + "px"; // 盒子定位到目标位置
        }
    }, 30)
}

/**
 * 缓动动画函数
 * @param obj 动画对象
 * @param target 目标位置
 */
function animateVariable(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 动画原理  移动距离 = 对象距离 + 步长
        var step = (target - obj.offsetLeft) / 10; // 步长
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 步长取整 确保对象到达目标位置
        obj.style.left = obj.offsetLeft + step + "px";
        if (obj.style.left == target) {
            clearInterval(obj.timer);
        }
    }, 30);
}

/** 判断浏览器是否在IE9及以下
 * @return true 是IE9以下
 * */
function isIE9() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (isIE && fIEVersion <= 9) {//IE9及以下，返回true
        return true;
    }
}

/** 根据自身宽度自动设置字体大小
 * @param 对象，倍数，最大值
 * */
function autoFont(obj, multiple, maxSize) {
    obj.css("font-size", parseInt(obj.width() * multiple) + "px");
    if (obj.fontSize() > maxSize) {
        obj.css("font-size", maxSize + "px");
    }
}