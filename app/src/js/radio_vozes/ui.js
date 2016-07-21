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