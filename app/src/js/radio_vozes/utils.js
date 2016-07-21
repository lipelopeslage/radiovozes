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