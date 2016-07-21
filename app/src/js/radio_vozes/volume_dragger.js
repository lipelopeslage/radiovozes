module.exports = function(volumeDOM){
	var slider = volumeDOM.querySelectorAll('.slider')[0], dragger = volumeDOM.querySelectorAll('.dragger')[0];
	console.log('>', volumeDOM, dragger)


	dragger.onmousedown = function(){
		console.log('mousedown');
		document.body.onmousemove = mouseMoveHandler;
	}
	dragger.onmouseup = function(){
		console.log('mouseup');
		document.body.onmousemove = null;
	}
	volumeDOM.onmouseout = function(){
		console.log('mouse out')
	}
	/*document.body.onmousemove = function(){
		console.log('mousemove');
	}*/
	function mouseMoveHandler(e){
		var sliderHeight = slider.clientHeight, sliderBounds = slider.getBoundingClientRect();
		var top = sliderBounds.top, left = sliderBounds.left;
		console.log(top, left, e.clientY, e.screenY)
		
	}
}