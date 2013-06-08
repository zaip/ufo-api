/**
 * frisby.js: Exemplo de consumo de api
 * (C) 2012, Alex Piaz
 */
var frisby   = require('/usr/lib/node_modules/frisby/lib/frisby.js');

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'Accept': 'application/json; charset=utf-8' }
  }
});



frisby.create('Verificar se o recurso está acessível')
	.get('http://httpstatusdogs.com/420-enhance-your-calm')
	.expectStatus(200)
	.expectBodyContains('http://httpstatusdogs.com/wp-content/uploads/420.jpg')
.toss()
