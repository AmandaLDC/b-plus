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

//CONSULTAR LISTA

//Consulta Todas As Listas
router.get('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_listas order by id_lista';
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
  var sql = 'select * from tb_listas where id_lista = ' + req.params.id;
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
  var sql = 'select * from tb_listas where id_usuario = ' + req.params.id;
  console.log(sql);
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado);
  });
});
})
//INSERIR LISTA

//Inserir Info da Lista
router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
	console.log(req.body)
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'insert into tb_listas (id_lista, nome_lista, id_usuario, categoria_lista, situacao_lista, tipo_lista, data_criacao) values (\'' + req.body.id_lista + '\', \'' + req.body.nome_lista + '\', \''+ req.body.id_usuario + '\', \''+ req.body.categoria_lista + '\',\'' + req.body.situacao_lista + '\',\'' + req.body.tipo_lista + '\',\'' + req.body.data_criacao +'\')';
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

//ATUALIZAR LISTA

router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update tb_listas set nome_lista = '" + req.body.nome +
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
    var sql = 'delete from tb_listas where id_lista =  ' + req.params.id;
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
