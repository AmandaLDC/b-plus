import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { SearchService } from '../search/search.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

    model: any = {};
    lista: any = {};
    id: any = 0;
    removiveis: any = [];
    book: any = {};
    results: any = [];
    suggestions: any = [];
    queryField: FormControl = new FormControl();
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
        private rote: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private _apiService: ApiService,
        private _searchService: SearchService) {}

    ngOnInit() {
      this.id = this.rote.snapshot.params['id'];
      this.getBooks(this.id);
      this.queryField.valueChanges
      .distinctUntilChanged()
      .subscribe(queryField =>
        this._searchService.search(queryField)
        .subscribe(response => this.results = response)
      );
    }

    onSubmit() {

      this.lista = {
        nome_lista: this.model.nome,
        categoria_lista: this.model.categoria,
        situacao_lista: this.model.situacao
      };

      const endpoint = this._apiService.removeList(this.id);
      this.http.put(endpoint, this.lista, this.options)
      .subscribe(resposta => {
        console.log('Atualizado com sucesso');
        this.router.navigate(['/home-page']);
      }, (erro) => {
        console.log(erro);
      });
    }

    onClickInsert(i) {
      this.book = {
        id_lista: this.id,
        id_livro: this.results[i].id_material
      };
      const endpoint = this._apiService.insertBook();
      this.http.post(endpoint, this.book, this.options)
      .subscribe(resposta => {
        console.log('Inserido com sucesso');
        this.getBooks(this.id);
      }, (erro) => {
        console.log(erro);
      });
    }

    getBooks(id) {
      const endpoint = this._apiService.getBookList(id);
      this.http.get(endpoint, this.options).subscribe(data => {
        this.removiveis = data;
      });

    }

    onClickRemove(i) {
      const endpoint = this._apiService.removeBook(this.id, this.removiveis[i].id_livro);
      this.http.delete(endpoint, this.options).subscribe(resposta => {
          console.log('Deletada com sucesso');
          this.refreshPage();
      }, (erro) => {
        console.log(erro);
      });
    }

    refreshPage(){
      this.ngOnInit();
    }
  }
