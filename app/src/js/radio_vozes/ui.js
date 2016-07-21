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