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

//Consulta Todos Os Comentarios de Livros
router.get('livro/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_livro order by data_criacao';
        conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Consulta Todos Os Comentarios de Listas
router.get('lista/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_lista order by data_criacao';
        conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Consulta Os Comentários Por Id_Lista
router.get('/lista/:id', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_lista where id_lista = ' + req.params.id;
        console.log(sql);
      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Consulta Os Comentários Por Id_Livros
router.get('/livro/:id', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_livro where id_livro = ' + req.params.id;
        console.log(sql);
      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Consulta Os Comentarios Por id_usuario de Livros
router.get('livro/usuario/:id', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_livro where id_usuario = ' + req.params.id;
        console.log(sql);
      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Consulta Os Comentarios Por id_usuario de Listas
router.get('lista/usuario/:id', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_comentario_lista where id_usuario = ' + req.params.id;
        console.log(sql);
      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na consulta da tabela', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//INSERIR COMENTARIOS

//Inserir Comentario de  Livros
router.post('/livro/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
        console.log(req.body)
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'insert into tb_comentario_livro (conteudo_comentario, avaliaco_comentario, id_usuario, id_livro, data_criacao) values (\'' + req.body.conteudo_comentario + '\', \'' + req.body.avaliaco_comentario + '\', \'' + req.body.id_usuario + '\', \'' + req.body.id_livro + '\', \'' + req.body.data_criacao + '\')';
        console.log(sql);

      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na inserção dos dados', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//Inserir Comentario de Listas
router.post('/lista/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
        console.log(req.body)
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'insert into tb_comentario_lista (conteudo_comentario, avaliaco_comentario, id_usuario, id_lista, data_criacao) values (\'' + req.body.conteudo_comentario + '\', \'' + req.body.avaliaco_comentario + '\',\'' + req.body.id_usuario + '\', \'' + req.body.id_lista + '\',\'' + req.body.data_criacao + '\')';
        console.log(sql);

      conexao.query(sql, function(erro, resultado){
        feito();
        if (erro){
          return console.error('Erro na inserção dos dados', erro);
        }
        res.json(resultado.rows);
      });
    });
});

//ATUALIZAR COMENTARIO

//Atualizar Comentario De Lista
router.put('/lista/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = "update tb_comentario_lista set conteudo_comentario = '" + req.body.conteudo_comentario +
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
});

//Atualizar Comentario De Livro
router.put('/livro/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = "update tb_comentario_livro set conteudo_comentario = '" + req.body.conteudo_comentario +
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
});

//REMOVER COMENTARIO

//Remover Comentario De Lista
router.delete('/lista/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = 'delete from tb_comentario_lista where id_comentario =  ' + req.params.id;
        console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito();
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows);
		});
	});
});

//Remover Comentario De Livro
router.delete('/livro/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = 'delete from tb_comentario_livro where id_comentario =  ' + req.params.id;
        console.log(sql);
		conexao.query(sql, function(erro, resultado){
			feito();
			if (erro){
				return console.error('Erro na remoção dos dados', erro);
			}
			res.json(resultado.rows);
		});
	});
});

module.exports = router;
