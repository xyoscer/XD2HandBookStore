(function(){
    var signBtn = document.getElementById('sign');
    var flag = false;
    var flag1 = false;
    var result = false;
    var userData = {};
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
                    case 0:                         
                         var getLength = value.length;
                         if(getLength>=2&&getLength<=11){
                         	  //与数据库Ajax通信，确保注册用户名在数据库中不存在
                              var data="username="+value;
                              var cb = ajaxResultdeal; //ajax的回调函数
                              //传递给检查用户名是否存在的url页面
                              url='http://luoyu.site:8088/userManage/login';
                               toAjax(url,data,cb);
                               if(result){
                               	flag = true;
                               }else { //说明用户名已经存在
                                 flag1 = true;
                               }
                             // flag = true;
                         	  
                         }else{
                         	flag = false;
                         }                     
                      
                        break;
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
                        var str = array[0];
                        //将正确的表单数据存入对象中                       
                        userData[str] = value;      
                       }else if(flag1) {
                        var tip = document.getElementById(array[0]+"_"+array[1]);
                        tip.nextElementSibling.style.color = 'red';
                        tip.style.borderBottom = '1px solid red';
                        tip.nextElementSibling.innerHTML = "用户名已经存在";
                    }else {
                       wrongStyle(array);
                        
                    }
            }
      var focusStyle = function(array) {                	
             var targetObj = document.getElementById(array[0]+"_"+array[1]);                 
                 targetObj.nextElementSibling.innerHTML = "";
            };

	  var inputs=document.getElementsByTagName("input");
            [].forEach.call(inputs,function(v){
            	var array = [];
                var array=v.getAttribute("id").split("_");                
                EventUtil.addHandler(v,"blur",function(){
                   regValue(array);
                }); 
                EventUtil.addHandler(v,"click",function(){
                   focusStyle(array);
                }); 
             });

       EventUtil.addHandler(signBtn,"click",function(e){         
                if(flag){
                      var jsonuserData = JSON.stringify(userData);
                      alert(jsonuserData);
                       alert("提交成功");

                }else{
                	 alert("提交失败");
                	 EventUtil.preventDefault(e); 
                    }
                   
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
          result = false;
        }
      }    
      xmlobj.open("POST",url,true);
      xmlobj.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
      xmlobj.send(data);
      
    }
    //ajax后台返回数据，在页面进行响应显示
  function ajaxResultdeal(response){ 
       
       if(response == "true") {
            result = true;
        }else {
         
            result = false;
        }        
               
      }
})();