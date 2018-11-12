import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

user : any = JSON.parse(localStorage.getItem("user"));
book : any = JSON.parse(localStorage.getItem("book"));
list : any = JSON.parse(localStorage.getItem("list"));
constructor(){ }


//ENDPOINTS THAT CALL STUDENT USER DATA

  getLogin(id){
    let url = 'http://dev2.unifacef.com.br:8000/api/matriculadoGrad/' + id;
    return url;
  }

  getAluno(){
    let url = 'http://dev2.unifacef.com.br:8000/api/matriculadoGrad/' + this.user.id_aluno;
    return url;
  }

  getDisciplinaAluno(){
    let url = 'http://dev2.unifacef.com.br:8000/api/inscricoesDisciplinaGrad/id_aluno' + this.user.id_aluno;
    return url;
  }

  getEmprestimoAluno(){
    let url = 'http://dev2.unifacef.com.br:8000/api/emprestimoAluno/' + this.user.id_aluno;
    return url;
  }


//ENDPOINTS THAT CALL STAFF USER DATA

  getDocente(){
    let url = 'http://dev2.unifacef.com.br:8000/api/docente/' + this.user.id_docente;
    return url;
  }

  getDisciplinaDocente(){
    let url = 'http://dev2.unifacef.com.br:8000/api/disciplinaDocente/' + this.user.id_docente;
    return url;
  }

  getEmprestimoDocente(){
    let url = 'http://dev2.unifacef.com.br:8000/api/emprestimoAluno/' + this.user.id_docente;
    return url;
  }

  //ENDPOINTS THAT CALL DISCIPLINES DATA

  getDisciplina(){
    let url = 'http://dev2.unifacef.com.br:8000/api/disciplinaGrad/' //+ this.disciplina.id_disciplina_serie;
    return url;
  }

  //ENDPOINTS THAT CALL FOR BOOK DATA

  getLivros(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplar';
    return url;
  }

  getLivroByIdExemplar(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplar/' + this.book.id_exemplar;
    return url;
  }

  getLivroByIdMaterial(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplarMaterial' + this.book.id_material;
    return url;
  }

  getLivroByTitulo(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplarTitulo/' + this.book.titulo_material;
    return url;
  }
  getAssuntoByIdExemplar(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplarAssunto/' + this.book.id_exemplar;
    return url;
  }

  getAutorByIdExemplar(){
    let url = 'http://dev2.unifacef.com.br:8000/api/exemplarAutor/' + this.book.id_exemplar;
    return url;
  }

  //ENDPOINTS THAT CALL FROM THE NODE API

// getListByListId(){
//    let url = 'http://localhost:3000/lista' + this.user.id_aluno;
//    return url;
//  }

  getListByUserId(){
    let url = 'http://localhost:3000/lista/user/' + this.user.id_aluno;
    return url;
  }

  postList(){
    let url = 'http://localhost:3000/lista/'
    return url;
  }

  listId(){
    let url = 'http://localhost:3000/lista/' + this.list.id_lista;
    return url;
  }
}
