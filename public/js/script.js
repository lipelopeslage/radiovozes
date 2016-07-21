(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var radio_vozes = require('./radio_vozes/main.js');
/* 
	parametros: 
	1) String - Tipo de player ('box' ou null)
	2) Booleano - Embedar font ou não
*/
radio_vozes.init('box', true);

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
			utils.fetchLiveInfo(function(res){
				player = this.buildPlayer(res);
				audioDOM = player.querySelectorAll('audio')[0];
				utils.initStream(audioDOM);
				this.bindEvents();
				ui.bindEvents();
			}.bind(this));
			
		}.bind(this));
	},
	buildPlayer: function(liveData){
		
		ui = require('./ui.js');
		ui.init(type || 'default', embedFonts, liveData);

		return ui.getDOM();
	},
	bindEvents: function(){
		player.addEventListener('play', function(){
			utils.playAudio();
		});

		player.addEventListener('pause', function(){
			utils.pauseAudio();
		});

		ui.setStreamURL(streamURL);
	}

}
},{"./ui.js":3,"./utils.js":4}],3:[function(require,module,exports){
var playerDOM, streamURL, liveData;
module.exports = {
	init: function(type, embedFonts, liveData){
		if(embedFonts) this.appendHeader();
		this.appendPlayer(type);
		this.renderDisplay(liveData);
	},
	setStreamURL: function(url){
		var sources = playerDOM.querySelectorAll('audio source');
		[].slice.call(sources).map(function(dom){
			dom.setAttribute('src', url);
		});
	},
	appendPlayer: function(type){
		playerDOM = this.getPlayerNode(type);
		require('./volume_dragger.js')(playerDOM.querySelectorAll('.volume')[0]);
		document.body.appendChild(playerDOM);
	},
	appendHeader: function(){
		var node = document.createElement('link');
		node.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,700,700italic,400italic');
		node.setAttribute('rel', 'stylesheet');
		node.setAttribute('type', 'text/css');
		document.querySelectorAll('head')[0].appendChild(node);
	},
	renderDisplay: function(res){
		var showInfo = playerDOM.querySelectorAll('.show-info')[0];
		showInfo.innerHTML = res.shows.current.name;
		showInfo.setAttribute('href', '/'+res.shows.current.url);
		playerDOM.querySelectorAll('.label')[0].innerHTML = res.tracks.current.name;
	},
	getPlayerNode: function(type){
		var node = document.createElement('div'), html = '';
		
		html += '<div class="holder">';
		html += '<span class="logo"><svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g fill="#ffffff"><path d="M239.378 128c0 61.415-49.965 111.379-111.378 111.379-61.415 0-111.379-49.964-111.379-111.379C16.621 66.585 66.585 16.621 128 16.621c61.413 0 111.378 49.964 111.378 111.379zM128 0C57.42 0 0 57.42 0 128s57.42 128 128 128 128-57.42 128-128S198.58 0 128 0z"></path><path d="M121 40h14.934v44.804H121V40z"></path></g></svg></span>';
		html += '<div class="controls"><button class="toggle"><span>No ar</span></button>';
		html += this.getVolumeString()+this.getAudioString();
		html += '<a class="show-info" href="https://radiovozes.com/radio-vozes"><img src=""><span>Rádio Vozes</span></a></div>';
		html += '<div class="label"><strong class="track">Nat Pethit - Romeo</strong></div>';
		html += '<a class="schedule" href="/programacao">Programação</a>';
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
		html += '<span class="progress_bg"><span class="progress"></span><span class="dragger"></span></span>';
		html += '</span><span class="hit"></span></span>';
		return html;
	},
	getDOM: function(){
		return playerDOM;
	},
	bindEvents: function(){
		var toggleBtn = playerDOM.querySelectorAll('.controls .toggle')[0];
		toggleBtn.onclick = function(){
			if(!toggleBtn.className.match(/playing/g)){
				toggleBtn.className = toggleBtn.className + ' playing';
				playerDOM.dispatchEvent(new Event('play'));
			}else{
				toggleBtn.className = toggleBtn.className.replace(' playing', '');
				playerDOM.dispatchEvent(new Event('pause'));
			}
		}
	}
}
},{"./volume_dragger.js":5}],4:[function(require,module,exports){
var audioDOM;
module.exports = {
	ajaxCall: function(url, callback){
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
	},
	fetchLiveInfo: function(callback){
		this.ajaxCall('https://radiovozes.airtime.pro/api/live-info-v2', function(res){
			callback.call(this, res);
		});
	},
	fetchStreamURL: function(callback){
		this.ajaxCall('https://radiovozes.airtime.pro/api/station-metadata', function(res){
			var items = [];
			for(var i in res.stream_data){
				items.push(res.stream_data[i]);
			}
			callback.call(this, items);
		});
	},
	initStream: function(dom){
		audioDOM = dom;
	},
	playAudio: function(){
		audioDOM.play();
	},
	pauseAudio: function(){
		audioDOM.pause();
	}
}
},{}],5:[function(require,module,exports){
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
},{}]},{},[1])