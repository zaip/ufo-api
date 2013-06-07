/**
 * frisby.js: Exemplo de consumo de api
 * (C) 2012, Alex Piaz
 */
var frisby   = require('/usr/lib/node_modules/frisby/lib/frisby.js');
var protocol = 'http://'
var domain   = 'ufo-api.zaip.net';
//var auth_url = protocol+'alex:2122'+'@localhost/auth';
var url      = protocol+domain;

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'Accept': 'application/json; charset=utf-8' }
  }
});

// frisby.create('Inspecionando o corpo da mensagem http')
//   .get('http://asciime.heroku.com/generate_ascii?s=THE TRUTH IS OUT THERE')
//   .inspectBody()
// .toss()

frisby.create('Garantir que a resposta solicitada em JSON está mesmo em JSON')
	.get(url + '/v1/casos/1')
	.expectStatus(200)
	.expectHeaderContains('content-type', 'application/json')
	.expectJSONTypes('_links', {
		self: Object
	})
	.expectJSONTypes('prev', {
		href: function(val) { expect(val).toBeTypeOrNull(String); }
	})
	.expectJSONTypes('_embedded', {
		id: Number,
		nome: String,
		descricao: String,
		ano: Number,
		pais: String

	})
	.toss()

frisby.create('Garantir que uma requisição POST não é aceita pela API')
	.post(url + '/v1/casos/1')
	.expectStatus(405)
	.toss()