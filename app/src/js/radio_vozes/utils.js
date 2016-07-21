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