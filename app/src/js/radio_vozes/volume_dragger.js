module.exports = function(volumeDOM){
	var slider = volumeDOM.querySelectorAll('.slider')[0], 
		dragger = volumeDOM.querySelectorAll('.dragger')[0],
		progressHolder = volumeDOM.querySelectorAll('.progress_bg')[0],
		progressBar = progressHolder.querySelectorAll('.progress')[0],
		draggerHolder = volumeDOM.querySelectorAll('.dragger_holder')[0];

		
	console.log('>', draggerHolder)


	dragger.onmousedown = function(){
		//console.log('mousedown');
		document.onmousemove = mouseMoveHandler;
	}
	document.onmouseup = function(){
		//console.log('mouseup');
		document.onmousemove = null;
	}
	draggerHolder.onmousedown=function(e){
		var sliderHeight = slider.clientHeight, sliderBounds = slider.getBoundingClientRect();
		var top = sliderBounds.top, left = sliderBounds.left;
		var progressBounds = progressHolder.getBoundingClientRect();
		var percent = ((e.clientY)-top)-progressHolder.offsetTop
		percent = progressBounds.height - percent
		percent = (percent/progressBounds.height)*100;

		updateStatus(percent);
	}
	
	function mouseMoveHandler(e){
		var sliderHeight = slider.clientHeight, sliderBounds = slider.getBoundingClientRect();
		var top = sliderBounds.top, left = sliderBounds.left;
		var progressBounds = progressHolder.getBoundingClientRect();
		var percent = ((e.clientY)-top)-progressHolder.offsetTop
		percent = progressBounds.height - percent
		percent = (percent/progressBounds.height)*100;

		//percent = progressBounds.height / percent
		//console.log(top, left, e.clientY, e.screenY)
		//console.log(progressHolder.offsetTop, progressBounds.height)
		//console.log(percent/progressBounds.height)

		
		if(sliderBounds.top == 0){
			document.onmousemove = null;
			return;
		}
		
		updateStatus(percent);		
	}

	function updateStatus(p){
		if(p < 0)
			p = 0;
		else if(p > 100)
			p = 100;

		volumeDOM.dispatchEvent(new CustomEvent('volume', {detail:{value:p/100}}));
		updateView(p);
	}

	function updateView(p){
		if(p <= 50 && p > 0){
			volumeDOM.className = "volume mid_volume";
		}else if(p > 50){
			volumeDOM.className = "volume";
		}else{
			volumeDOM.className = "volume muted";
		}
		console.log(p)
		dragger.style.bottom = (p-100)+'%';
		progressBar.style.height = p+'%';
	}
}