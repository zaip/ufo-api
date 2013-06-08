/**
 * frisby.js: Exemplo de consumo de api
 * (C) 2012, Alex Piaz
 */
var frisby   = require('/usr/lib/node_modules/frisby/lib/frisby.js');
var protocol = 'http://'
var domain   = 'ufo-api.zaip.net';
//var auth_url = protocol+'alex:2122'+'@localhost/auth';
var url      = protocol+domain;
var endpoint = url + '/v1/casos/1';

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'Accept': 'application/json; charset=utf-8' }
  }
});

// frisby.create('Inspecionando o corpo da mensagem http')
//   .get('http://asciime.heroku.com/generate_ascii?s=THE TRUTH IS OUT THERE')
//   .inspectBody()
// .toss()

frisby.create('Verificar se o recurso está acessível')
	.get(endpoint)
	.expectStatus(200)
.toss()

frisby.create('Garantir que a resposta solicitada em JSON está mesmo em JSON')
	.get(endpoint)
	.expectHeaderContains('content-type', 'application/json')
.toss()

frisby.create('Garantir que o JSON retornado tem a estrutura desejada')
	.get(endpoint)
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

frisby.create('Garantir que uma requisição POST no recurso não seja aceita pela API')
	.post(endpoint)
	.expectStatus(405)
.toss()

