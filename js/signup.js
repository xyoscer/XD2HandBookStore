(function(){
    var signBtn = document.getElementById('sign');
    var flag = false;//用于验证表单的标志   
    var ajaxResult = false;
   //验证输入表单的密码，tel,email格式是否正确
	 function regValue(array){                
                var input=document.getElementById(array[0]+"_"+array[1]);               
                var value=input.value.trim();
                var focusMsg = ["必填，字符数应为2~11位","必填，密码字符数应为6~11位",
       "填写正确的联系方式","填写正确的邮箱格式如：xxx@163.com"];     
                var wrongStyle = function(array) {      	
                    var targetObj = document.getElementById(array[0]+"_"+array[1]);
                        targetObj.nextElementSibling.style.color = 'red';
                        targetObj.style.borderBottom = '1px solid red';
                        targetObj.nextElementSibling.innerHTML = focusMsg[parseInt(array[1])];
                   };
               
                switch (parseInt(array[1])){                 
                    case 1:  
                        flag=/^\S{6,11}$/.test(value);
                        break;
                    case 2:
                        flag=/^[1][0-9]{10}$/.test(value);                
                        break;
                    case 3:                          
                        flag = /^(\S)+[@]{1}(\S)+[.]{1}(\w)+$/.test(value);                     
                        break;
                  
                }
                    if(flag) {
                        input.style.borderBottom = "1px solid lightgreen";
                            
                       }else {
                       wrongStyle(array);
                        
                    }
            }
        /*
         *表单输入框获得焦点时，之前的错误提醒样式统一去除
         */

      var focusStyle = function(array) {                	
             var targetObj = document.getElementById(array[0]+"_"+array[1]);
                 targetObj.style.borderBottom = "";                 
                 targetObj.nextElementSibling.innerHTML = "";
            };
    //给除过用户名的的表单添加focus,blur事件
	  var inputs=document.getElementsByTagName("input");
            [].forEach.call(inputs,function(v){
              if(v!=inputs[0]){
                var array = [];
                var array=v.getAttribute("id").split("_"); 
                EventUtil.addHandler(v,"blur",function(){
                   regValue(array);
                }); 
                EventUtil.addHandler(v,"focus",function(){
                   focusStyle(array);
                }); 
              }
            	
             });

    
   
               
  
EventUtil.addHandler(inputs[0],"blur",function(){
   var input=document.getElementById('username_0');               
   var value=input.value.trim();
   var getLength = value.length;
            if(getLength>=2&&getLength<=11){
                  //与数据库Ajax通信，确保注册用户名在数据库中不存在
                   var data="username="+value;
                   var callback = ajaxResultdeal; //ajax的回调函数,处理存在不存在页面的显示问题
                   //传递给检查用户名是否存在的url页面
                  url='http://luoyu.site:8080/userManage/userNameExist';
                   toAjax(url,data,callback);
                 }else {
                    input.nextElementSibling.style.color = 'red';
                    input.style.borderBottom = '1px solid red';
                    input.nextElementSibling.innerHTML = "必填，字符数应为2~11位";
                 }

 }); 
EventUtil.addHandler(inputs[0],"focus",function(){
    var targetObj = document.getElementById('username_0'); 
        targetObj.style.borderBottom = "";                
        targetObj.nextElementSibling.innerHTML = "";
});
  //跨浏览器创建xmlhttp对象
  function createXMLHttpRequest(){
    var xmlobj;
      if(window.ActiveXObject){
        xmlobj=new ActiveXObject("Microsoft.XMLHTTP");
      }
      else if(window.XMLHttpRequest){
        xmlobj=new XMLHttpRequest();
      }
      return xmlobj;
 } 

  function toAjax(url,data,callback){
        var xmlobj =  createXMLHttpRequest();       
         xmlobj.onreadystatechange=function(){
        if(xmlobj.readyState==4&&xmlobj.status==200){
           callback(xmlobj.responseText);                   
        }
        else {
          ajaxResult = false;
        }
      }    
      xmlobj.open("POST",url,true);
      xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
      xmlobj.send(data);
      
    }
    //ajax后台返回数据，在页面进行响应显示
  function ajaxResultdeal(response){ 
      var data = JSON.parse(response);         
      var parsedata = data['boolResult'];       
       if(parsedata.result) {//true表示用户名存在           
               ajaxResult = false;  
               alert(parsedata.result);     
             var tip = document.getElementById('username_0');
                tip.nextElementSibling.style.color = 'red';
                tip.style.borderBottom = '1px solid red';
                tip.nextElementSibling.innerHTML = "用户名已经存在";
        }else {   
         alert(parsedata.result);        
            ajaxResult = true;
           inputs[0].style.borderBottom = "1px solid lightgreen";
            
        }           
    }
//提交按钮注册点击事件
  EventUtil.addHandler(signBtn,"click",function(e){         
                if(flag&&ajaxResult){                                          
                       alert("提交成功");

                }else{
                   alert("提交失败");
                   EventUtil.preventDefault(e); 
                }
                   
   });
})();