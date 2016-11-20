
(function(){
  var code;//用来记录页面的验证码
  var codeResult = false;
   document.getElementById("canvas").onclick = function(e){
        e.preventDefault();
       code =  drawPic();
    };
	var name = document.getElementById('name');
  var pwd = document.getElementById('pwd');
  var Code =document.getElementById('WriteCode');
  var login = document.getElementById('valite');
  var tips=document.getElementsByClassName('tips');
  var remeber = document.getElementById("remeber");
  var result=false;//用来标志ajax返回结果是否正确
  
  name.onblur = function() {
     validateName(event);
       return false;
  }
  pwd.onblur = function() {
     validatePwd(event);
       return false;
  }
  remeber.onclick  = function() {
    var data = {};
      data.name = name.value.trim();
      data.pwd = pwd.value.trim();
      var jsonobj = JSON.stringify(data);
    CookieUtil.set(data.name,jsonobj);
  }
  //验证名字
  var validateName = function(event) { 
   var nameValue = name.value.trim();   
     var getLength = nameValue.length;
         if(getLength== 0){
          event.target.nextElementSibling.innerHTML ='姓名不能为空';           
             wrongStyle(event); 
             return false;          
        }
         else if(getLength>= 4 && getLength <= 16){
          rightStyle(event);                          
             return false;
        }  
        else {
        event.target.nextElementSibling.innerHTML = '字符数应为4~16位';
        wrongStyle(event); 
        return false;        
        }  

  };
   //正确时的样式函数
var rightStyle = function(event) {
   event.target.nextElementSibling.style.color = 'lightgreen';
     event.target.style.borderBottom = '1px solid lightgreen';
};
//错误的样式函数
var wrongStyle = function(event) {
   event.target.nextElementSibling.style.color = 'red';
     event.target.style.borderBottom = '1px solid red';
};
//验证密码
var  validatePwd = function(event) {
  var pwdValue = pwd.value.trim();
  var patrn=/^(\w){6,20}$/;  
   if(pwdValue.match(patrn)) {      
       AjaxtoData();
       rightStyle(event);
   }else {
        event.target.nextElementSibling.innerHTML = '密码输入为6-20个字母、数字、下划线';
        wrongStyle(event); 
   }
}
   //与数据库Ajax通信，确保用户名密码一致
   var AjaxtoData = function() { 
      var nameValue = name.value.trim();
      var pwdValue = pwd.value.trim();     
      var data={username:nameValue,userpwd:pwdValue};
      //将对象转换为JSON串，通过ajax进行传递
      var jsonobj=JSON.stringify(data);
      var cb = ajaxResultdeal; //ajax的回调函数
      //传递给检查用户名与密码是否一致的url页面
      url='http://127.0.0.1/XD2HandBookStore/test.php?data='+jsonobj+"&r="+Math.random();
        toAjax(url,cb);
   }

  //跨浏览器创建xmlhttp对象
  function createXMLHttpRequest(){
      if(window.ActiveXObject){
        xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
      }
      else if(window.XMLHttpRequest){
        xmlobj=new XMLHttpRequest();
      }
 } 

  function toAjax(url,callback){
         createXMLHttpRequest();       
         xmlobj.onreadystatechange=function(){
        if(xmlobj.readyState==4&&xmlobj.status==200){
           callback(xmlobj.responseText);                   
        }
        else {
          result = false;
        }
      }    
      xmlobj.open("GET",url,true);
      /*xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
      xmlobj.send(data);*/
      xmlobj.send(null);
    }
    //ajax后台返回数据，在页面进行响应显示
  function ajaxResultdeal(response){  
       if(response == "1") {
             result=true;
        }else {
          tips[1].innerHTML="你输入账号与密码不否";
          tips[1].style.color = 'red';
          tips[0].previousElementSibling.style.borderBottom = '1px solid red';
          tips[1].previousElementSibling.style.borderBottom = '1px solid red';
            result=false;
        }        
               
      }
  //验证验证码
   code = drawPic();
   Code.onblur = function() {
      var getCode = Code.value;
      if(getCode === code) {
         codeResult = true;
      }else {
          this.parentNode.lastElementChild.innerHTML = "验证验输入有误";
          this.parentNode.lastElementChild.style.color = "red";
           codeResult = false;
      }
   }
   Code.onclick = function() {
     this.parentNode.lastElementChild.innerHTML = "";
     
   }
  //提交按钮事件
 login.onclick = function() {
    if(result&&codeResult) {
      alert("登录成功");
    }
    else {
      alert("ajax验证失败");
      return false;
    }
  
 }  
var CookieUtil={    
    set:function(name,value,expires,path,domain,secure){
      var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
      if(expires instanceof Date){
        cookieText+="; expires="+expires.toGMTString();
      }
      if(path){
        cookieText+="; path"+path;
      }
      if(domain){
        cookieText+="; domain="+domain;
      }
      if(secure){
        cookieText+="; secure";
      }
      document.cookie=cookieText;
    },
    unset:function(name,path,domain,secure){
      this.set(name,"",new Date(0),path,domian,secure);
    },
    get:function(name){
      var cookieName=encodeURIComponent(name)+"=";
      var cookieStart=document.cookie.indexOf(cookieName);
      var cookieValue=null;
      if(cookieStart>-1){
        var cookieEnd=document.cookie.indexOf(";",cookieStart);
        if(cookieEnd==-1){
            cookieEnd=document.cookie.length;       
           }
   cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
      }
      return cookieValue;
    }, 
  } ;  

 
})();
	