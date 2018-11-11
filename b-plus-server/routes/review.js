var express = require('express');
var router = express.Router();

var pg = require('pg');

var config = {
	user: "postgres",
	database: "tic",
	port: 5432,
	max: 10,
	idleTimeoutMills: 30000,
}
var canal = new pg.Pool(config);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//CONSULTAR COMENTARIO

//Consulta Todas As Comentarios
router.get('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_comentario order by id_comentario';
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows);
  });
});
})

//Consulta Comentarios Por Id_comentario
router.get('/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from comentario where id_comentario = ' + req.params.id;
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

//INSERIR COMENTARIO

router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql =
	'insert into tb_comentario (avaliacao_comentario, id_usuario, conteudo_comentario, data_criacao, id_usuario, id_livro, id_lista)
		values
		(\''+ req.body.avaliacao + '\',\'' + req.body.usuario + '\',\'' + req.body.conteudo + '\',\'' + res.body.data'\')';
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

//ATUALIZAR COMENTARIO

router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update tb_comentario set conteudo_comentario = '" + req.body.conteudo +
				"', avaliacao_comentario = '" + req.body.avaliacao +
        "' where id_comentario =  " + req.body.codigo;
    console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito();
			if (erro){
				return console.error('Erro na atualização dos dados', erro);
			}
			res.json(resultado.rows);
		});
	});
})

//REMOVER COMENTARIO

router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from tb_comentario where id_comentario =  ' + req.params.id;
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
