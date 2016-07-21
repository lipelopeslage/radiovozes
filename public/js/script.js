(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var radio_vozes = require('./radio_vozes/main.js');
/* 
	parametros: 
	1) Booleano - Embedar font ou não
*/
radio_vozes.init(true);
},{"./radio_vozes/main.js":2}],2:[function(require,module,exports){
module.exports = {
	init: function(embedFonts){
		var utils = require('./utils.js');
		var ui = require('./ui.js')(utils);
		ui.init(embedFonts);
	}
}
},{"./ui.js":3,"./utils.js":4}],3:[function(require,module,exports){
module.exports = function(utils){
	return {
		init: function(embedFonts){
			if(embedFonts) this.appendHeader();
			this.appendPlayer();
		},
		appendPlayer: function(){
			document.body.appendChild(utils.getPlayerDOM());//innerHTML = html;
		},
		appendHeader: function(){
			var node = document.createElement('link');
			node.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,700,700italic,400italic');
			node.setAttribute('rel', 'stylesheet');
			node.setAttribute('type', 'text/css');
			document.querySelectorAll('head')[0].appendChild(node);
		}
	}
}
},{}],4:[function(require,module,exports){
module.exports = {
	getPlayerDOM: function(){
		var node = document.createElement('div'), html = '';
		
		html += '<div class="holder">';
		html += '<span class="logo"><svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g fill="#ffffff"><path d="M239.378 128c0 61.415-49.965 111.379-111.378 111.379-61.415 0-111.379-49.964-111.379-111.379C16.621 66.585 66.585 16.621 128 16.621c61.413 0 111.378 49.964 111.378 111.379zM128 0C57.42 0 0 57.42 0 128s57.42 128 128 128 128-57.42 128-128S198.58 0 128 0z"></path><path d="M121 40h14.934v44.804H121V40z"></path></g></svg></span>';
		html += '<div class="controls"><button class="toggle playing"><span>No ar</span></button>';
		html += this.getVolumeString();
		html += '<a href="https://radiovozes.com/radio-vozes"><img src="https://radiovozes.airtime.pro/api/station-logo">Rádio Vozes</a></div>';
		html += '<div class="label"><strong class="track">Nat Pethit - Romeo</strong></div>';
		html += '<a class="schedule" href="/programacao">Programação</a>';
		html += '</div>';

		node.setAttribute('id', 'rv-player-new');
		node.innerHTML = html;	

		return node;
	},
	getVolumeString: function(){
		var html = '';
		html += '<span class="volume"><span class="slider">';
		html += '<span class="progress_bg"><span class="progress"></span><span class="dragger"></span></span>';
		html += '</span><span class="hit"></span></span>';
		return html;
	}
}
},{}]},{},[1])