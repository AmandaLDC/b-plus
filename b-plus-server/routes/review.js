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

//CONSULTAR COMENTARIOS

//Consulta Todos Os Comentarios
router.get('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_comentario order by data_criacao';
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows);
  });
});
})

//Consulta Os Comentários Por Id_Lista
router.get('/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_comentario where id_lista = ' + req.params.id;
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

//Consulta Os Comentários Por Id_Livros
router.get('/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_comentario where id_livro = ' + req.params.id;
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

//Consulta Os Comentarios Por id_usuario
router.get('/user/:id', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'select * from tb_comentario where id_usuario = ' + req.params.id;
  console.log(sql);
  conexao.query(sql, function(erro, resultado){
    feito();
    if (erro){
      return console.error('Erro na consulta da tabela', erro);
    }
    res.json(resultado.rows);
  });
});
})

//INSERIR COMENTARIOS

//Inserir Comentario
router.post('/', function (req, res, next) {
canal.connect(function(erro, conexao, feito){
	console.log(req.body)
  if (erro){
    return console.error('erro ao conectar no banco', erro);
  }
  var sql = 'insert into tb_comentario (id_comentario, conteudo_comentario, avaliaco_comentario, id_usuario, id_livro, id_lista, data_criacao) values (\'' + req.body.id_comentario + '\', \''+ req.body.conteudo_comentario + '\', \''+ req.body.avaliacao_comentario + '\',\'' + req.body.id_usuario + '\',\'' + req.body.id_livro + '\',\'' + req.body.data_criacao +'\')';
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

//Atualizar Comentario De Lista
router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update tb_comentario set conteudo_comentario = '" + req.body.conteudo_comentario +
				"', avaliaco_comentario = '" + req.body.avaliaco_comentario +
        "' where id_lista =  " + req.params.id;
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

//Atualizar Comentario De Livro
router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
		var sql = "update tb_comentario set conteudo_comentario = '" + req.body.conteudo_comentario +
				"', avaliaco_comentario = '" + req.body.avaliaco_comentario +
        "' where id_livro =  " + req.params.id;
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

//Remover Comentario De Lista
router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from tb_comentario where id_lista =  ' + req.params.id;
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

//Remover Comentario De Livro
router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
    var sql = 'delete from tb_comentario where id_livro =  ' + req.params.id;
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
