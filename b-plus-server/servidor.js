// Carrega o modulo HTTP do Node
let http = require("http");

// Cria um servidor HTTP e uma escuta de requisições para a porta 3000
http.createServer(function(request, response) {

  // Configura o cabeçalho da resposta com um status HTTP e um Tipo de Conteúdo
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Manda o corpo da resposta "Olá Mundo"
   response.end('Server Running');
}).listen(3000);

// Imprime no console a URL de acesso ao servidor
console.log('Servidor executando em http://127.0.0.1:3000/');
