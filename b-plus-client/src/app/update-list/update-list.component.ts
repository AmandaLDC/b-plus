import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { ActivatedRoute, Route,Router } from '@angular/router';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

    model: any = {};
    lista: any = {};
    id : any = 0;
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
        private _apiService: ApiService) {}

    ngOnInit() {
      this.id = this.rote.snapshot.params['id'];
    }

    onSubmit() {
      this.lista = {
        nome_lista: this.model.nome,
        categoria_lista: this.model.categoria,
        situacao_lista: this.model.situacao
      }
      let endpoint = this._apiService.removeList(this.id);
      console.log(endpoint);
      console.log(this.lista);
      this.http.put(endpoint, this.lista, this.options)
      .subscribe(resposta => {
        console.log('Atualizado com sucesso');
        this.router.navigate(['/home-page']);
      }, (erro) => {
        console.log(erro);
      });
    }
  }
