import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';
import { ApiService } from '../api-endpoints/api.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  model: any = {};
  results: any = {
                  titulo : '',
                  tipo : '',
                  autor : [],
                  volume : 0,
                  edicao : 0,
                  ano : '',
                  editora : '',
                  assuntos : [],
                  n_disponivel : 0,
                  n_total : 0
                };
  review: any = {};
  user: any = JSON.parse(localStorage.getItem('user'));
  options: any = {
                    Headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin' : '*',
                      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
                      'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token, content-type'
                    }),
                    withCredentials: false
                  };

  constructor(
    private _apiService: ApiService,
    private _searchService: SearchService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    const livro_endpoint = this._searchService.getdataforid_material();

    if (livro_endpoint !== '0') {
      this.http.get(livro_endpoint, this.options).subscribe(data => {
        this.pageInit(data);
      });
    } else {
      JSON.parse(localStorage.getItem('book'));
    }
  }

  pageInit(data) {
    let autor_endpoint = this._searchService.getdataforautor();
    let assunto_endpoint = this._searchService.getdataforassunto();
    const ex = data[0].id_exemplar;
    autor_endpoint = autor_endpoint + ex;
    assunto_endpoint = assunto_endpoint + ex;

    const t = data[0].titulo_material;
    const tipo = data[0].nome_tipo;
    const ne = data[0].edicao_exemplar;
    const ano = data[0].edicao_ano;
    const ed = data[0].nome_editora;
    const nd = this.getnd(data);
    const nt = this.getnt(data);
    let v;
    if (data[0].volume_exemplar === '0') {
      v = 'Único';
    } else {
      v = data[0].volume_exemplar;
    }
    // @ts-ignore
    const autor;
    const assuntos = [];


    this.results = {
      titulo: t,
      exemplar: ex,
      tipo: tipo,
      autor: autor,
      volume: v,
      edicao: ne,
      ano: ano,
      editora: ed,
      assuntos: assuntos,
      n_disponivel: nd,
      n_total: nt
    };

    this.http.get(autor_endpoint, this.options).subscribe(response => {
      this.getAutor(response);
      this.http.get(assunto_endpoint, this.options).subscribe(e => {
        this.getAssunto(e);
        localStorage.setItem('book', JSON.stringify(this.results));
      });
    });
  }

  getAutor(data) {
    this.results.autor = data;
  }

  getAssunto(data) {
    this.results.assuntos = data;
  }


  getnt(data) {
    let r = 0;
    for (const x in data) {
      r++;
    }
    return r;
  }

  getnd(data) {
    let r = 0;
    for (const x in data) {
      if (data[x].situacao_exemplar === 'D') {
        r++;
      }
    }
    return r;
  }

  newReview() {
    this.router.navigate(['/create-review']);
  }

  getDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const dn = dd + '/' + mm + '/' + yyyy;
    return dn;
  }

  onSubmit() {
    const dn = this.getDate();
    this.review = {
      id_usuario: this.user.id_aluno,
      conteudo_comentario: this.model.comentario,
      id_livro: this.results.ex,
      data_criacao: dn,
    };
    const endpoint = this._apiService.postReview();
    this.http.post(endpoint, this.review, this.options)
      .subscribe(resposta => {
        console.log('Inserido com sucesso');
      }, (erro) => {
        console.log(erro);
      });
  }
}
