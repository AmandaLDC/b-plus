const express = require('express');
const router = express.Router();
const pg = require('pg');

const config = {
    user: "postgres",
    database: "tic",
    password: "facefbd",
    port: 5432,
    max: 10,
    idleTimeoutMills: 30000,
};
const canal = new pg.Pool(config);

//CONSULTAR LISTA

//Consulta Todas As Listas
router.get('/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'select * from tb_listas order by id_lista';
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
        const sql = 'select * from tb_listas where id_lista = ' + req.params.id;
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
        const sql = 'select * from tb_listas where id_usuario = ' + req.params.id;
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
//INSERIR LISTA

//Inserir Info da Lista
router.post('/', function (req, res, next) {
    canal.connect(function(erro, conexao, feito){
        console.log(req.body);
      if (erro){
        return console.error('erro ao conectar no banco', erro);
      }
        const sql = 'insert into tb_listas (nome_lista, id_usuario, categoria_lista, situacao_lista, tipo_lista, data_criacao) values (\'' + req.body.nome_lista + '\', \'' + req.body.id_usuario + '\', \'' + req.body.categoria_lista + '\',\'' + req.body.situacao_lista + '\',\'' + req.body.tipo_lista + '\',\'' + req.body.data_criacao + '\')';
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

//ATUALIZAR LISTA

router.put('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = "update tb_listas set nome_lista = '" + req.body.nome_lista +
            "', categoria_lista = '" + req.body.categoria_lista + "', situacao_lista = '" + req.body.situacao_lista +
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

//REMOVER LISTA

router.delete('/:id', function (req, res, next) {
	canal.connect(function(erro, conexao, feito){
		if (erro){
			return console.error('erro ao conectar no banco', erro);
		}
        const sql = 'delete from tb_listas where id_lista =  ' + req.params.id;
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
