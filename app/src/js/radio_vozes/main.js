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