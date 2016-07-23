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