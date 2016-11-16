    function randomNum(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
    function randomColor(){
      
       var  _r = Math.floor(Math.random() * 255);
        var _g = Math.floor(Math.random() * 255);
        var _b = Math.floor(Math.random() * 255);
        return "rgb("+_r+","+_g+","+_b+")";
    }   
    function drawPic(){
        var $canvas = document.getElementById("canvas");
        var _str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var _picTxt = "";
        var _num = 4;
        var _width = $canvas.width;
        var _height = $canvas.height;
        var ctx = $canvas.getContext("2d");
      
        ctx.fillStyle = randomColor();
        ctx.fillRect(0,0,_width,_height);
        //写字符
        for(var i=0; i<_num; i++){
            var x = (_width-10)/_num*i+10;
            var y = randomNum(_height/2,_height);
            var deg = randomNum(-45,45);
            var txt = _str[randomNum(0,_str.length)];
            _picTxt += txt;
            ctx.fillStyle = randomColor();         
            ctx.font ='bold 30px sans-serif';
            ctx.textBaseline = "bottom";
            ctx.textAlign = "center";//设置文字的水平对齐方式
            ctx.translate(x,y); //平移坐标轴原点
            ctx.rotate(deg*Math.PI/180);//以坐标轴原点进行旋转
            ctx.fillText(txt, 0,0);
            ctx.rotate(-deg*Math.PI/180);
            ctx.translate(-x,-y);
        }
        //画直线
        for(var i=0; i<_num; i++){
            ctx.strokeStyle = randomColor();
            ctx.beginPath();
            ctx.moveTo(randomNum(0,_width), randomNum(0,_height));
            ctx.lineTo(randomNum(0,_width), randomNum(0,_height));
            ctx.stroke();
        }
        for(var i=0; i<_num*10; i++){
            ctx.fillStyle = randomColor();
            ctx.beginPath();
            ctx.arc(randomNum(0,_width),randomNum(0,_height), 1, 0, 2*Math.PI);
            ctx.fill();
        }
        
        return _picTxt;
    }
   