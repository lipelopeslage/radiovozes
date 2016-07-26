window.RVPlayer = require('./radio_vozes/main.js');

window.RVPlayerEvent = function(type, data){
	var evt = (data) ? document.createEvent('CustomEvent') : document.createEvent('Event');
	if(data)
		evt.initCustomEvent(type, true, true, data);
	else
		evt.initEvent(type, true, true);
	return evt;
}

window.RVPlayerIsMobile = function(){
	return navigator.userAgent.match(/Android|Blackberry|iPhone|iPad|Opera Mini|IEMobile/i);
}

window.RVPlayer.init(true);