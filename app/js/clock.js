document.body.onload = start;

function start(){
	var canvas = document.getElementById("canvas");
	var cxt = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var r = width/2; //半径
	function render(){
		cxt.clearRect(0,0,width,height);
		cxt.save();
		cxt.translate(width/2,height/2);
		// 画轮廓
		cxt.beginPath();
		var img = document.createElement("img");
		img.src = "./app/imgs/clock_b.png";
		var pat=cxt.createPattern(img,"repeat");
		cxt.lineWidth = r*0.1;//轮廓圆宽度
		cxt.strokeStyle=pat;
		cxt.fillStyle = "#fff";
		// cxt.strokeStyle = "#76b852";//轮廓圆颜色
		cxt.arc(0,0,r-r*0.05,0,2*Math.PI); //圆
		cxt.fill();
		cxt.stroke();
		cxt.closePath();
		// 画内圆
		cxt.beginPath();
		cxt.lineWidth = 1;
		cxt.strokeStyle = "#ccc";
		var radi2 = r*0.85; //半径
		cxt.arc(0,0,radi2,0,2*Math.PI); //圆
		cxt.stroke();
		cxt.closePath();
		// 画刻度 使用Math.sin(deg)、Math.cos(deg)来计算圆上点的坐标
		// 每隔6度画一个点
		var hour = [6,5,4,3,2,1,12,11,10,9,8,7],i = 0;
		for(var deg = 0;deg<360;deg=deg+6){
			var spotX = radi2*Math.sin(deg*2*Math.PI/360);
			var spotY = radi2*Math.cos(deg*2*Math.PI/360);
			var spot = r*0.02; //刻度半径
			cxt.beginPath();
			cxt.fillStyle = "#ccc";
			if(deg%30==0){
				cxt.fillStyle = "#333";
				spot = r*0.025;
				var textX =(radi2*0.8)*Math.sin(deg*2*Math.PI/360); //文字x坐标
				var textY =(radi2*0.8)*Math.cos(deg*2*Math.PI/360); //文字y坐标
				cxt.font = r*0.2 + "px Arial"; 
				cxt.textBaseline = "middle";// 文字垂直对齐方式
				cxt.textAlign = "center";   // 文字水平对齐方式
				cxt.fillText(hour[i],textX,textY);
				i++;
			}
			cxt.arc(spotX,spotY,spot,0,2*Math.PI);
			cxt.fill();
			cxt.closePath();
		}
		// 画中心
		cxt.beginPath();
		cxt.arc(0,0,r*0.05,0,2*Math.PI);
		cxt.stroke();
		cxt.closePath();
	}
	function drawHour(h,m){
		// 时针
		h = h + m/60;
		cxt.save();
		cxt.beginPath();
		cxt.rotate(2*Math.PI/12*h);
		cxt.lineWidth = r*0.05;
		cxt.strokeStyle = "#ccc";
		cxt.lineCap = "round";
		cxt.moveTo(0,r*0.4*0.2);
		cxt.lineTo(0,-r*0.4*0.8);
		cxt.stroke();
		cxt.closePath();
		cxt.restore();
	}
	function drawMinute(m,s){
		// 分针
		m = m + s/60;
		cxt.save();
		cxt.beginPath();
		cxt.rotate(2*Math.PI/60*m);
		cxt.strokeStyle = "#ccc";
		cxt.lineWidth = 3;
		cxt.lineCap = "round";
		cxt.moveTo(0,r*0.6*0.2);
		cxt.lineTo(0,-r*0.6*0.8);
		cxt.stroke();
		cxt.closePath();
		cxt.restore();
	}
	function drawSecond(s){
		// 秒针
		cxt.save();
		cxt.beginPath();
		cxt.rotate(2*Math.PI/60*s);
		cxt.strokeStyle = "#76b852";
		cxt.lineWidth = 1;
		cxt.lineCap = "round";
		cxt.moveTo(0,r*0.8*0.2);
		cxt.lineTo(0,-r*0.8*0.8);
		cxt.stroke();
		cxt.closePath();
		cxt.restore();
	}
	function drawGuid(){
		var now = new Date();
		h = now.getHours();
		m =now.getMinutes();
		s = now.getSeconds();
		drawHour(h,m);
		drawMinute(m,s);
		drawSecond(s);
	}
	setInterval(function(){
		render();
		drawGuid();
		cxt.restore();
	},30/1000)

}