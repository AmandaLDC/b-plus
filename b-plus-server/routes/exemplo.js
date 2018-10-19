var express = require('express');
var router = express.Router();

var pg = require('pg');

// JSON de configuração de conexão com banco de dados
var config = {
	user: "postgres",
	database: "tic",
	password: "facef",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
// cria o canal de comunicação com o banco de dados
var canal = new pg.Pool(config);


// rota para consultar no MongoDB os alunos
router.get('/', function (req, res, next) {
// conecta no banco a partir do canal
canal.connect(function(erro, conexao, feito){
  if (erro){ // ocorreu um erro
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from student order by codigo';
  conexao.query(sql, function(erro, resultado){
    feito(); // libera a conexão
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows); // retorna ao cliente as linhas do select
  });
});
})

router.get('/:id', function (req, res, next) {
// conecta no banco a partir do canal
canal.connect(function(erro, conexao, feito){
  if (erro){ // ocorreu um erro
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from student where codigo = ' + req.params.id;
  console.log(sql);
  conexao.query(sql, function(erro, resultado){
    feito(); // libera a conexão
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows[0]); // retorna ao cliente as linhas do select
  });
});
})

// rota para inserir no MongoDB um aluno 
router.post('/', function (req, res, next) {
// conecta no banco a partir do canal
canal.connect(function(erro, conexao, feito){
  if (erro){ // ocorreu um erro
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'insert into student (nome, endereco, rg) values (\'' + req.body.nome + 
        '\', \''+ req.body.endereco + '\',\'' + req.body.rg + '\')';
  console.log(sql);

  conexao.query(sql, function(erro, resultado){
    feito(); // libera a conexão
    if (erro){
      return console.error('Erro na inserção dos dados', erro);
    }
    res.json(resultado.rows); // retorna ao cliente o resultado da inserção
  });
});
})

// rota para atualizar no MongoDB um aluno
router.put('/:id', function (req, res, next) {
  	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update student set nome = '" + req.body.nome + 
				"', endereco = '" + req.body.endereco + "', rg = '" + req.body.rg + 
        "' where codigo =  " + req.body.codigo;
      
    console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da atualização
		});
	});
})

// rota para remove no MongoDB um aluno
router.delete('/:id', function (req, res, next) {
  	// conecta no banco a partir do canal
	canal.connect(function(erro, conexao, feito){
		if (erro){ // ocorreu um erro
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from student where codigo =  ' + req.params.id;
    console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito(); // libera a conexão
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows); // retorna ao cliente o resultado da remoção
		});
	});
})

// exporta router
module.exports = router;