(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
/* 
	parametros: 
	1) String - Tipo de player ('box' ou null)
	2) Booleano - Embedar font ou não
*/
//radio_vozes.init('', true);

/*var request = new XDomainRequest();

request.open('GET', 'https://radiovozes.airtime.pro/api/live-info-v2');
request.setRequestHeader('Access-Control-Allow-Origin', '*');
request.setRequestHeader('Access-Control-Allow-Methods', 'GET');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();*/

/*var api = document.createElement('script');
api.setAttribute('src','https://radiovozes.airtime.pro/api/live-info-v2?callback=teste');
window.teste = function(e){
	console.log(e)
}
document.querySelectorAll('head')[0].appendChild(api);

*/

/*

STREAM URL:
https://radiovozes.airtime.pro/api/station-metadata


*/
},{"./radio_vozes/main.js":2}],2:[function(require,module,exports){
var ui, utils, type, embedFonts, streamURL, player;

module.exports = {
	init: function(t, e){
		utils = require('./utils.js');
		type = t;
		embedFonts = e;

		utils.fetchStreamURL(function(streamData){
			var audioDOM;
			streamURL = streamData[0].url;
			player = this.buildPlayer();
			audioDOM = player.querySelectorAll('audio')[0];
			utils.initStream(audioDOM);
			this.bindEvents();
			ui.bindEvents();
			
		}.bind(this));
	},
	buildPlayer: function(){
		
		ui = require('./ui.js');
		ui.init(type || 'default', embedFonts);		

		return ui.getDOM();
	},
	bindEvents: function(){
		player.addEventListener('play', function(){
			utils.playAudio();
		});

		player.addEventListener('pause', function(){
			utils.pauseAudio();
		});

		player.addEventListener('volume', function(e){
			utils.setVolume(e.detail.value);
		});

		player.setStreamURL(streamURL);

		this.updateDisplay();
	},
	updateDisplay: function(){
		utils.fetchLiveInfo(function(res){
			player.updateDisplay(res);
			utils.getShowThumb(function(res){
				player.updateThumb(res);
			})
			//setTimeout(this.updateDisplay.bind(this), 3000);
		}.bind(this));
	}

}
},{"./ui.js":3,"./utils.js":4}],3:[function(require,module,exports){
var playerDOM, volumeDOM, streamURL, liveData;
module.exports = {
	init: function(type, embedFonts){
		if(embedFonts) this.appendHeader();
		if(RVPlayerIsMobile()) document.querySelector('html').setAttribute('data-mobile','true');
		this.appendPlayer(type);
	},
	setStreamURL: function(url){
		var sources = playerDOM.querySelectorAll('audio source');
		[].slice.call(sources).map(function(dom){
			dom.setAttribute('src', url);
		});
	},
	appendPlayer: function(type){
		playerDOM = this.getPlayerNode(type);
		volumeDOM = playerDOM.querySelectorAll('.volume')[0]
		require('./volume_dragger.js')(volumeDOM);
		document.body.appendChild(playerDOM);
	},
	appendHeader: function(){
		var node = document.createElement('link');
		node.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,700,700italic,400italic');
		node.setAttribute('rel', 'stylesheet');
		node.setAttribute('type', 'text/css');
		document.querySelectorAll('head')[0].appendChild(node);
	},
	updateDisplay: function(res){
		var showInfo = playerDOM.querySelectorAll('.show-info')[0], info = res;
		showInfo.querySelectorAll('.show-name')[0].innerHTML = info.shows.current.name;
		showInfo.setAttribute('href', 'https://radiovozes.com/'+info.shows.current.url);
		playerDOM.querySelectorAll('.label')[0].innerHTML = info.tracks.current.name;
	},
	updateThumb: function(img){
		playerDOM.querySelectorAll('.show-info .thumb')[0].innerHTML = '<img src="'+img+'">';
	},
	getPlayerNode: function(type){
		var node = document.createElement('div'), html = '';
		
		html += '<div class="holder">';
		html += '<span class="logo"><svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g fill="#ffffff"><path d="M239.378 128c0 61.415-49.965 111.379-111.378 111.379-61.415 0-111.379-49.964-111.379-111.379C16.621 66.585 66.585 16.621 128 16.621c61.413 0 111.378 49.964 111.378 111.379zM128 0C57.42 0 0 57.42 0 128s57.42 128 128 128 128-57.42 128-128S198.58 0 128 0z"></path><path d="M121 40h14.934v44.804H121V40z"></path></g></svg></span>';
		html += '<div class="controls"><button class="toggle"><span>No ar</span></button>';
		html += this.getVolumeString()+this.getAudioString();
		html += '<a class="show-info" href="https://radiovozes.com/radio-vozes"><span class="thumb"></span><span class="show-name">Rádio Vozes</span></a></div>';
		html += '<div class="label"><strong class="track">Nat Pethit - Romeo</strong></div>';
		html += '<a class="schedule" href="https://radiovozes.com/programacao">Programação</a>';
		html += '</div>';

		node.setAttribute('id', 'rv-player-new');
		if(type == 'box') node.setAttribute('data-type', 'box')
		node.innerHTML = html;	

		return node;
	},
	getAudioString: function(){
		var html = '';
		html += '<audio><source src="" type="audio/ogg"><source src="" type="audio/mpeg">Your browser does not support the audio element.</audio>';
		return html;
	},
	getVolumeString: function(){
		var html = '';
		html += '<span class="volume"><span class="slider">';
		html += '<span class="progress_bg"><span class="progress"></span></span>';
		html += '<span class="dragger_holder"><span class="dragger"></span></span></span><span class="hit"></span></span>';
		return html;
	},
	getDOM: function(){
		playerDOM.updateDisplay = this.updateDisplay;
		playerDOM.setStreamURL = this.setStreamURL;
		playerDOM.updateThumb = this.updateThumb;
		return playerDOM;
	},
	bindEvents: function(){
		var toggleBtn = playerDOM.querySelectorAll('.controls .toggle')[0];
		volumeDOM.addEventListener('volume', function(e){
			playerDOM.dispatchEvent(new CustomEvent('volume', {detail:{value:e.detail.value}}));
		});
		toggleBtn.onclick = function(){
			if(!toggleBtn.className.match(/playing/g)){
				toggleBtn.className = toggleBtn.className + ' playing';
				playerDOM.dispatchEvent(new RVPlayerEvent('play'));
			}else{
				toggleBtn.className = toggleBtn.className.replace(' playing', '');
				playerDOM.dispatchEvent(new RVPlayerEvent('pause'));
			}
		}
	}
}
},{"./volume_dragger.js":5}],4:[function(require,module,exports){
var audioDOM;
module.exports = {
	ajaxCall: function(url, callback, isCrossDomain){
		var xhr, crossdomain;

		crossdomain = isCrossDomain || false;

		if(!isCrossDomain){
			xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200)
					callback.call(this, xhr.responseText);
			}
			xhr.open('GET', url);
			xhr.send();
		}else{
			var api = document.createElement('script');
			var time = new Date().getTime();
			api.setAttribute('src',url+'?callback=callbackRVz'+time);
			api.setAttribute('data-type', 'ajax');
			window['callbackRVz'+time] = function(e){
				var node = document.querySelectorAll('script[data-type=ajax]')[0];
				document.querySelectorAll('head')[0].removeChild(node);
				callback.call(this, e);
				window['callbackRVz'+time] = null;
			}
			document.querySelectorAll('head')[0].appendChild(api);
		}
	},
	fetchLiveInfo: function(callback){
		this.ajaxCall('https://radiovozes.airtime.pro/api/live-info-v2', function(res){
			callback.call(this, res);
		}, true);
	},
	fetchStreamURL: function(callback){
		this.ajaxCall('https://radiovozes.airtime.pro/api/station-metadata', function(res){
			var items = [];
			for(var i in res.stream_data){
				items.push(res.stream_data[i]);
			}
			callback.call(this, items);
		}, true);
	},
	getShowThumb: function(callback){
		this.ajaxCall('https://api.radiovozes.com/v1/live', function(res){
			var json = JSON.parse(res), image;
			image = json[0].images.default;
			callback.call(this, image);
		})
	},
	initStream: function(dom){
		audioDOM = dom;
	},
	playAudio: function(){
		audioDOM.play();
	},
	pauseAudio: function(){
		audioDOM.pause();
	},
	setVolume: function(p){
		audioDOM.volume = p;
	}
}
},{}],5:[function(require,module,exports){
module.exports = function(volumeDOM){
	var slider = volumeDOM.querySelectorAll('.slider')[0], 
		dragger = volumeDOM.querySelectorAll('.dragger')[0],
		progressHolder = volumeDOM.querySelectorAll('.progress_bg')[0],
		progressBar = progressHolder.querySelectorAll('.progress')[0],
		draggerHolder = volumeDOM.querySelectorAll('.dragger_holder')[0];


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

		volumeDOM.dispatchEvent(new RVPlayerEvent('volume', {value:p/100}));
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
		//console.log(p)
		dragger.style.bottom = (p-100)+'%';
		progressBar.style.height = p+'%';
	}
}
},{}]},{},[1])