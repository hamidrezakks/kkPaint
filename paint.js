// JavaScript Document
var cPushArray = new Array();
var cStep = -1;

var penSize = 5;
var penColor = "#000000";
var drawMode = '1';
var canvasMouseDown = false;
var lastCanvas;

var canvas;
var ctx;
var ctxMode = 0;

var tText = "";

var lastX = null, lastY = null;
$("document").ready(function() {
	
	$("#pen-size").click(function() {
        $("#pen-frame").stop().fadeIn(100);
    });
	$("#pen-frame").mouseleave(function() {
        $("#pen-frame").stop().fadeOut(400);
    }).mouseenter(function() {
        $("#pen-frame").stop().fadeIn(100);
    });
	
	$("#js-pen-size").on("change mousemove", function(){
		var range = $(this).val();
		penSize = range;
		$("#js-pen-size-demo").css({'margin':(-range/2)+'px '+(-range/2)+'px 0 0','width':range+'px','height':range+'px'});
    });
	
	$("#pen-color").click(function() {
        $("#color-frame").stop().fadeIn(100);
    });
	$("#color-frame").mouseleave(function() {
        $("#color-frame").stop().fadeOut(400);
    }).mouseenter(function() {
        $("#color-frame").stop().fadeIn(100);
    });
	
	$("#js-pen-color").on("change", function(){
		penColor = $(this).val();
		$("#js-pen-size-demo").css({'background-color':penColor});
    });
	
	$("#pen-tool").click(function() {
        $("#tools-frame").stop().fadeIn(100);
    });
	$("#tools-frame").mouseleave(function() {
        $("#tools-frame").stop().fadeOut(400);
    }).mouseenter(function() {
        $("#tools-frame").stop().fadeIn(100);
    });
	
	$(".tbtn.active").click(function() {
		$(".tbtn.active").removeClass("selected");
		$(this).addClass("selected");
		drawMode = $(this).attr("tid").toString();
		if(drawMode == "0")
		{
			$("#text-popup").stop().fadeIn(100);
		}
    });
	
	$("#js-text-confirm").click(function() {
        $("#text-popup").stop().fadeOut(100);
		tText = $("#js-text").val();
    });
	
	$("#load-image").click(function(e) {
    	handleImage(e); 
    });
	
	$("#load-cimage").click(function() {
        $("#load-frame").stop().fadeIn(100);
    });
	$("#load-frame").mouseleave(function() {
        $("#load-frame").stop().fadeOut(400);
    }).mouseenter(function() {
        $("#load-frame").stop().fadeIn(100);
    });
	
	$("#load-url").click(function() {
        $("#url-frame").stop().fadeIn(100);
    });
	$("#url-frame").mouseleave(function() {
        $("#url-frame").stop().fadeOut(400);
    }).mouseenter(function() {
        $("#url-frame").stop().fadeIn(100);
    });
	
	canvas = document.getElementById('main-canvas');
	canvas.width = $("#main-container").width();
	canvas.height = $("#main-container").height();	
	lastCanvas = canvas.toDataURL();
	ctx = canvas.getContext('2d')
	
	eraseAll();
	lastCanvas = canvas.toDataURL();
	cPush();
	
	$("#js-url-image").keyup(function(e){
		if(e.keyCode == 13)
		{
			loadUrlImage($(this).val());
		}
	});
	
	var imageLoader = document.getElementById('js-load-image');
    imageLoader.addEventListener('change', handleImage, false);
	
	document.getElementById('downloadLnk').addEventListener('click', download, false);
			
	$("#main-canvas").mousedown(function(e) {
		canvasMouseDown = true;
		var parentOffset = $(this).parent().offset()
	   	var relX = e.pageX - parentOffset.left;
	   	var relY = e.pageY - parentOffset.top;
		
		ctxMode = 0;
        switch(drawMode)
		{
			case '0':
				drawText(relX, relY, true);
				lastX = relX;
				lastY = relY;
			break;
			case '1':
				drawObject(relX, relY, 1, true);
				lastX = relX;
				lastY = relY;
			break;
			case '2':
				drawObject(relX, relY, 2, true);
				lastX = relX;
				lastY = relY;
			break;
			case '3':
				drawObject(relX, relY, 3, true);
				lastX = relX;
				lastY = relY;
			break;
			case '4':
				drawObject(relX, relY, 4, true);
				lastX = relX;
				lastY = relY;
			break;
			case '5':
				drawObject(relX, relY, 5, true);
				lastX = relX;
				lastY = relY;
			break;
			case '6':
				drawObject(relX, relY, 1, true);
				if(lastX == null)
				{
					lastX = relX;
					lastY = relY;
				}
			break;
			case '7':
				spray(relX, relY, true);
			break;
			case '8':
				eraseRect(relX, relY, true);
			break;
		}
    }).mousemove(function(e) {
        var parentOffset = $(this).parent().offset()
	   	var relX = e.pageX - parentOffset.left;
	   	var relY = e.pageY - parentOffset.top;
		
		if(canvasMouseDown)
		{
			ctxMode = 1;
			switch(drawMode)
			{
				case '0':
					drawText(relX, relY, true);
				break;
				case '1':
					drawObject(relX, relY, 1, true);
				break;
				case '2':
					drawObject(relX, relY, 2, true);
				break;
				case '3':
					drawObject(relX, relY, 3, true);
				break;
				case '4':
					drawObject(relX, relY, 4, true);
				break;
				case '5':
					drawObject(relX, relY, 5, true);
				break;
				case '6':
					drawObject(relX, relY, 1, true);
				break;
				case '7':
					spray(relX, relY, true);
				break;
				case '8':
					eraseRect(relX, relY, true);
				break;
			}
		}
    });
	$("#main-canvas").mouseup(function(e) {
		var parentOffset = $(this).parent().offset()
	   	var relX = e.pageX - parentOffset.left;
	   	var relY = e.pageY - parentOffset.top;
		if(relX < 0) relX = 0;
		if(relY < 0) relY = 0;
		if(relX > canvas.width - 1) relX = canvas.width - 1;
		if(relY > canvas.height - 1) relX = canvas.height - 1;
		
		if(canvasMouseDown)
		{
			ctxMode = 2;
			switch(drawMode)
			{
				case '0':
					drawText(relX, relY);
					lastX = null;
					lastY = null;
				break;
				case '1':
					drawObject(relX, relY, 1);
					lastX = null;
					lastY = null;
				break;
				case '2':
					drawObject(relX, relY, 2);
					lastX = null;
					lastY = null;
				break;
				case '3':
					drawObject(relX, relY, 3);
					lastX = null;
					lastY = null;
				break;
				case '4':
					drawObject(relX, relY, 4);
					lastX = null;
					lastY = null;
				break;
				case '5':
					drawObject(relX, relY, 5);
					lastX = null;
					lastY = null;
				break;
				case '6':
					drawObject(relX, relY, 1);
					lastX = relX;
					lastY = relY;
				break;
				case '7':
					spray(relX, relY);
				break;
				case '8':
					eraseRect(relX, relY);
				break;
				case '9':
					eraseAll();
				break;
			}
		}
		canvasMouseDown = false;
		cPush();
    });
	$("#undo").click(function() {
        cUndo();
    });
	$("#redo").click(function() {
        cRedo();
    });
});

function drawObject(tX, tY, tMode, temp)
{
	if(temp == null) temp = false;
	if(ctxMode == 0) ctx.beginPath();
	
	ctx.strokeStyle = penColor;
	ctx.lineWidth = penSize;
	
	if(lastCanvas != null)
	{
		var canvasPic = new Image();
		canvasPic.src = lastCanvas;
		canvasPic.onload = function () {
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			ctx.drawImage(canvasPic, 0, 0);
			if(ctxMode == 1) ctx.beginPath();
			if(lastX == null || lastY == null)
			{
				ctx.moveTo(tX, tY);
			}
			else
			{
				switch(tMode)
				{
					case 1:
						ctx.moveTo(lastX, lastY);
						ctx.lineTo(tX, tY);
					break;
					case 2:
						drawRect(lastX, lastY, tX, tY);
					break;
					case 3:
						drawTriangle(lastX, lastY, tX, tY);
					break;
					case 4:
						drawCircle(lastX, lastY, tX, tY);
					break;
					case 5:
						drawEllipse(lastX, lastY, tX, tY);
					break;
				}		
			}
			ctx.stroke();
	
			if(ctxMode == 2) ctx.closePath();
			if(!temp) lastCanvas = canvas.toDataURL();
		}
	}
}

function drawRect(tX1, tY1, tX2, tY2)
{
	var tX, tY, tW, tH;
	if(tX1 < tX2)
	{
		tX = tX1;
		tW = tX2 - tX1;
	}
	else
	{
		tX = tX2;
		tW = tX1 - tX2;
	}
	
	if(tY1 < tY2)
	{
		tY = tY1;
		tH = tY2 - tY1;
	}
	else
	{
		tY = tY2;
		tH = tY1 - tY2;
	}
	ctx.moveTo(tX, tY);
	ctx.rect(tX, tY, tW, tH);
}

function drawTriangle(tX1, tY1, tX2, tY2)
{
	var tX, tY, tW, tH;
	var vX1, vY1, vX2, vY2, vX3, vY3;
	if(tX1 < tX2)
	{
		tX = tX1;
		tW = tX2 - tX1;
	}
	else
	{
		tX = tX2;
		tW = tX1 - tX2;
	}
	
	vX1 = tX;
	vY1 = tY1;
	vX3 = tX + tW;
	vY3 = tY1;
	vX2 = tX + tW/2;
	vY2 = tY2;
	
	ctx.moveTo(vX1, vY1);
	ctx.lineTo(vX2, vY2);
	ctx.lineTo(vX3, vY3);
	ctx.lineTo(vX1, vY1);
}

function drawCircle(tX1, tY1, tX2, tY2)
{
	var tR;
	
	tR = Math.abs(tX1 - tX2)*Math.abs(tX1 - tX2) + Math.abs(tY1 - tY2)*Math.abs(tY1 - tY2);
	tR = Math.sqrt(tR);
	
	ctx.moveTo(tX1+tR, tY1);
	ctx.arc(tX1, tY1, tR, 0, Math.PI*2, true);
}

function drawEllipse(tX1, tY1, tX2, tY2)
{
	var tX, tY, tW, tH;
	if(tX1 < tX2)
	{
		tX = tX1;
		tW = tX2 - tX1;
	}
	else
	{
		tX = tX2;
		tW = tX1 - tX2;
	}
	
	if(tY1 < tY2)
	{
		tY = tY1;
		tH = tY2 - tY1;
	}
	else
	{
		tY = tY2;
		tH = tY1 - tY2;
	}
	
	var kappa = .5522848,
	ox = (tW / 2) * kappa, // control point offset horizontal
	oy = (tH / 2) * kappa, // control point offset vertical
	xe = tX + tW,           // x-end
	ye = tY + tH,           // y-end
	xm = tX + tW / 2,       // x-middle
	ym = tY + tH / 2;       // y-middle
	
	ctx.beginPath();
	ctx.moveTo(tX, ym);
	ctx.bezierCurveTo(tX, ym - oy, xm - ox, tY, xm, tY);
	ctx.bezierCurveTo(xm + ox, tY, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, tX, ym + oy, tX, ym);
}

function spray(tX, tY, temp)
{
	if(temp == null) temp = false;
	if(!temp) 
	{
		lastCanvas = canvas.toDataURL();
		return
	}
	ctx.strokeStyle = penColor;
	ctx.fillStyle = penColor;
	ctx.lineWidth = penSize;
	ctx.beginPath();
	for(i = -penSize; i <= penSize; i++)
	{
		for(j = -penSize; j <= penSize; j++)
		{
			if(i*i + j*j < penSize*penSize && Math.random() > 0.7)
			{
				//ctx.moveTo(i,j);
				ctx.fillRect(i+tX, j+tY, 1, 1);
			}
		}
	}
	ctx.closePath();
}

function eraseRect(tX, tY, temp)
{
	if(temp == null) temp = false;
	if(!temp) 
	{
		lastCanvas = canvas.toDataURL();
		return
	}
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.fillRect(tX-(penSize/2), tY-(penSize/2), penSize, penSize);
	ctx.closePath();
}

function eraseAll()
{
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.closePath();
	lastCanvas = canvas.toDataURL();
}

function drawText(tX, tY, temp)
{
	if(temp == null) temp = false;
	if(ctxMode == 0) ctx.beginPath();
	
	ctx.strokeStyle = penColor;
	ctx.lineWidth = penSize;
	ctx.fillStyle = penColor;
	
	if(lastCanvas != null)
	{
		var canvasPic = new Image();
		canvasPic.src = lastCanvas;
		canvasPic.onload = function () {
			ctx.clearRect(0,0,canvas.width,canvas.height); 
			ctx.drawImage(canvasPic, 0, 0);
			if(ctxMode == 1) ctx.beginPath();
			ctx.font = (penSize+5)+"px serif";
			tX = tX - ctx.measureText(tText).width/2;
			if(lastX == null || lastY == null)
			{
				ctx.moveTo(tX, tY);
				ctx.fillText(tText, tX, tY);
			}
			else
			{
				ctx.fillText(tText, tX, tY);	
			}
			ctx.stroke();
	
			if(ctxMode == 2) ctx.closePath();
			if(!temp) lastCanvas = canvas.toDataURL();
		}
	}
}

function cPush() {
	cStep++;
	if (cStep < cPushArray.length) { cPushArray.length = cStep; }
	cPushArray.push(document.getElementById('main-canvas').toDataURL());
}
function cUndo() {
	if (cStep > 0) {
		cStep--;
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		console.log(cPushArray[cStep]);
		canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
	}
}
function cRedo() {
	if (cStep < cPushArray.length - 1) {
		cStep++;
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
	}
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
			lastCanvas = canvas.toDataURL();
			cPush();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
}

function loadUrlImage(adrs) {
	var img = new Image();
	img.src = adrs;
	img.setAttribute('crossOrigin', 'anonymous');
	img.onload = function(){
		ctx.drawImage(img,0,0);
		lastCanvas = document.getElementById('main-canvas').toDataURL();
		cPush();
	}
}