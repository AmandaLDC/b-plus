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

//CONSULTAR LISTA

//Consulta Todas As Listas
router.get('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_lista order by id_lista';
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows);
  });
});
})

//Consulta As Listas Por Id_Lista
router.get('/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from lista where id_lista = ' + req.params.id;
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

//Consulta As Listas Por id_usuario
router.get('/user/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from lista where id_usuario = ' + req.params.id;
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
//INSERIR LISTA

//Inserir Info da Lista
router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql =
	'insert into tb_lista (nome_lista, categoria_lista, situacao_lista, tipo_lista, data_criacao)
		values
		(\'' + req.body.nome + '\', \''+ req.body.categoria + '\',\'' + req.body.situacao + '\',\'' + req.body.tipo + '\',\'' +inserir data aqui'\')';
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

//INSERIR LIVROS NA LISTA
router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql =
	'insert into tb_lista_livro (id_lista, id_livro) values
		(\'' + req.body.id_lista + '\', \''+ req.body.id_livro + '\')';
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

//ATUALIZAR LISTA

router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update tb_lista set nome_lista = '" + req.body.nome +
				"', categoria_lista = '" + req.body.categoria + "', situacao_lista = '" + req.body.situacao +
        "' where id_lista =  " + req.body.codigo;
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

//REMOVER LISTA

router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from tb_lista where id_lista =  ' + req.params.id;
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
