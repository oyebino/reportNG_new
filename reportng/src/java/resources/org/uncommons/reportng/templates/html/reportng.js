function toggleElement(elementId, displayStyle)
{
    var element = document.getElementById(elementId);
    var current = element.currentStyle
                ? element.currentStyle['display']
                : document.defaultView.getComputedStyle(element, null).getPropertyValue('display');
    element.style.display = (current == 'none' ? displayStyle : 'none');
}

function toggle(toggleId)
{
    var toggle = document.getElementById ? document.getElementById(toggleId) : document.all[toggleId];
    toggle.textContent = toggle.innerHTML == '\u25b6' ? '\u25bc' : '\u25b6';
}

function imgShow(outerdiv, innerdiv, bigimg, _this){  
    var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性  
  
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/  
    $("<img/>").attr("src", src).load(function(){  
    	var windowW = $(window).width()>window.screen.availWidth?document.body.clientWidth:$(window).width();//获取当前窗口宽度  
        var windowH = $(window).height()>window.screen.availHeight?document.body.clientHeight:$(window).height();//获取当前窗口高度  
        var realWidth = this.width;//获取图片真实宽度  
        var realHeight = this.height;//获取图片真实高度  
        var imgWidth, imgHeight;  
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
          
        if(realHeight>windowH*scale) {//判断图片高度  
            imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
            imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
            if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
                imgWidth = windowW*scale;//再对宽度进行缩放  
            }  
        } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度  
            imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放  
                        imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度  
        } else {//如果图片真实高度和宽度都符合要求，高宽不变  
            imgWidth = realWidth;  
            imgHeight = realHeight;  
        }  
                $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
          
        var w = (windowW-imgWidth)/2;//计算图片与窗口左边距  
        var h = (windowH-imgHeight)/2;//计算图片与窗口上边距  
        $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性  
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
    });  
      
    $(outerdiv).click(function(){//再次点击淡出消失弹出层  
        $(this).fadeOut("fast");  
    });  
}  

var url = [];
var title = [];
var url_index = 0;

// viewmore()

function viewmore(e) {
  // var str = "./images/card@1x.png;./images/data_ic_9@2x.png";
  // url = str.split(";")
  document.getElementById("preview-bg").style.width = "100%";
  url_index = 0;
  url = e.target.attributes["data-preview"]['value'].split("%%")
  document.getElementById("preview-img").src = url[url_index]
  url.forEach(function(val){
	var str=val.split("/")[val.split("/").length-1].split(".")[0]
	console.log(str)
	title.push(str)
	})
//	document.getElementById("preview-title").innerText  = title[url_index]
}

function move(number) {
  if (url_index + number >= 0 && url_index + number <= url.length - 1) {
    url_index = url_index + number;
    document.getElementById("preview-img").style.width = "0%";
    setTimeout(() => {
      document.getElementById("preview-img").src = url[url_index]
//	  document.getElementById("preview-title").innerText  = title[url_index]
      document.getElementById("preview-img").style.width = "100%";
    }, 300);
  }
}

function closemodal(number) {
  document.getElementById("preview-bg").style.width = "0%";
}