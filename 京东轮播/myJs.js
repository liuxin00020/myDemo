/* 封装Id下的class对象*/
function getClass(id,classname) {
    if(document.getElementsByClassName){//支持类名获取
        if(id){//存在id,获取id下的class
            var eleid = document.getElementById(id);
            return eleid.getElementsByClassName(classname);
        }else{
            return document.getElementsByClassName(classname);
        }
    }
    //不支持类名获取（IE8）
    var arr = [];//存储返回classs数组
    var dom = [];//存储dom节点
    if(id){
        dom = document.getElementById(id).getElementsByTagName("*");//id下的所有元素
    }else{//无Id,则查询所有节点，遍历找到类节点
        dom = document.getElementsByTagName("*");
    }
    for(var i=0;i<dom.length;i++){//遍历dom节点，找到包含classname的节点
        var txtarr = dom[i].className.split(" ");//多个class分割
        for(var j=0;j<txtarr.length;j++){//遍历classs数组
            if(txtarr[j]==classname){//判断是否有classname，有则插入数组
                arr.push(dom[i]);
            }
        }
    }
    return arr;
}