import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  model: any = {};
  lista: any = {};
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
    this.lista = {
      nome_lista: this.model.nome,
      id_usuario: this.user.id_aluno,
      categoria_lista: this.model.categoria,
      situacao_lista: this.model.situacao,
      tipo_lista: 'NOR',
      data_criacao: dn
    };
    const endpoint = this._apiService.postList();
    this.http.post(endpoint, this.lista, this.options)
    .subscribe(resposta => {
      console.log('Inserido com sucesso');
      this.router.navigate(['/home-page']);
    }, (erro) => {
      console.log(erro);
    });
  }
}

