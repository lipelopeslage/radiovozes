module.exports = {
	init: function(embedFonts){
		var utils = require('./utils.js');
		var ui = require('./ui.js')(utils);
		ui.init(embedFonts);
	}
}