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