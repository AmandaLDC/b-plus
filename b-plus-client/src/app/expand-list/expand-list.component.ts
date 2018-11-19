import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expand-list',
  templateUrl: './expand-list.component.html',
  styleUrls: ['./expand-list.component.css']
})
export class ExpandListComponent implements OnInit {

  lista: any = JSON.parse(localStorage.getItem('list'));
  results: any = [];
  review: any = [];
  comment: any = [];
  model: any = {};
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
      private http: HttpClient,
      private router: Router,
      private _apiService: ApiService) {}

  ngOnInit() {
    const endpoint = this._apiService.getBookList(this.lista.id_lista);
    this.http.get(endpoint, this.options).subscribe(resposta => {
        this.results = resposta;
        this.getComments(resposta);
    }, (erro) => {
      console.log(erro);
    });
  }

  removeList(i) {
    const endpoint = this._apiService.removeList(this.lista.id_lista);
    this.http.delete(endpoint, this.options).subscribe(resposta => {
        console.log('Deletada com sucesso');
        this.router.navigate(['/home-page']);
    }, (erro) => {
      console.log(erro);
    });
  }

  updateList() {
    this.router.navigate(['/update-list', this.lista.id_lista]);
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
      avaliaco_comentario: this.model.nota,
      id_lista: this.lista.id_lista,
      data_criacao: dn,
    }
    const endpoint = this._apiService.postReviewList();
    this.http.post(endpoint, this.review, this.options)
      .subscribe(resposta => {
        console.log('Inserido com sucesso');
        this.ngOnInit();
      }, (erro) => {
        console.log(erro);
      });
  }

  getComments(data){
    const endpoint = this._apiService.reviewList(this.lista.id_lista);
    this.http.get(endpoint, this.options)
      .subscribe(resposta => {
        this.comment = resposta;
      }, (erro) => {
        console.log(erro);
      })
  }
  removeComments(i){
    const endpoint = this._apiService.reviewList(this.comment[i].id_comentario);
    this.http.delete(endpoint, this.options)
      .subscribe(resposta => {
        console.log('Removido com sucesso');
        this.ngOnInit();
      }, (erro) => {
        console.log(erro);
      })
  }

}
