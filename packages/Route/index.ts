const href : String = window.location.href

//通过正则匹配获取当前页面的url中的参数
function getParam(name : String) : String{
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
    var r =  window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r!=null){
     strValue= unescape(r[2]);
    }
    return strValue;
}

export default  {
    href: href,
    getParam: getParam
} 