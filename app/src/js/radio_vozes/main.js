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

			window.onload = ui.bindEvents;
			
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
			setTimeout(this.updateDisplay.bind(this), 3000);
		}.bind(this));
	}

}