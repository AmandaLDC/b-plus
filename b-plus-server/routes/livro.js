var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
	user: "postgres",
	database: "tic",
	password:"Khaleesi2603",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
var canal = new pg.Pool(config);

//CONSULTAR LIVROS

//Consulta Os Livros Por Id_Lista

//Consulta As Listas Por Id_Lista
router.get('/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_lista_livro where id_lista = ' + req.params.id;
  console.log(sql);
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows[0]);
  });
});
})

//INSERIR LIVROS

//Inserir Livro na Lista
router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql =
	'insert into tb_lista_livro (id_lista, id_livro) values (\'' + req.body.id_lista + '\', \''+ req.body.id_livro + '\')';
  console.log(sql);
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na inserção dos dados', erro);
    }
    res.json(resultado.rows);
  });
});
})

//REMOVER LIVRO

//Remover Os Livros Por Id_Lista
router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from tb_lista_livro where id_lista =  ' + req.params.id;
    console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito();
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows);
		});
	});
})

module.exports = router;
