/**
 * frisby.js: Exemplo de consumo de api
 * (C) 2012, Alex Piaz
 */
var frisby   = require('/usr/lib/node_modules/frisby/lib/frisby.js');
var protocol = 'http://'
var domain   = 'api.piaz.com.br';
var auth_url = protocol+'alex:2122'+'@localhost/auth';
var url      = protocol+domain;

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'Accept': 'application/json; charset=utf-8' }
  }
});

frisby.create('Inspecionando o corpo da mensagem http')
  .get('http://asciime.heroku.com/generate_ascii?s=THE TRUTH IS OUT THERE')
  .inspectBody()
.toss()