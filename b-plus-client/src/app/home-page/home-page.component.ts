import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
      private http: HttpClient,
      private router: Router,
      private _apiService: ApiService) {}

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

  static getDate() {
    const today = new Date();
    const dd = today.getDate();
    console.log(dd);
    const mm = today.getMonth() + 1;
    console.log(mm);
    const yyyy = today.getFullYear();
    const dn = dd + '/' + mm + '/' + yyyy;
    return dn;
  }

  ngOnInit() {
    const endpoint = this._apiService.getListByUserId();
    this.http.get(endpoint, this.options).subscribe(data => {
      this.pageInit(data);
    });
  }

  pageInit(data) {
    const endpoint = this._apiService.postList();
    if (data == null) {
      const dn = HomePageComponent.getDate();
      const lista_notification = {
        nome_lista: 'Notificações',
        id_usuario: this.user.id_aluno,
        categoria_lista: null,
        situacao_lista: 'PES',
        tipo_lista: 'NOT',
        data_criacao: dn
      };

      const lista_favoritos = {
        nome_lista: 'Favoritos',
        id_usuario: this.user.id_aluno,
        categoria_lista: null,
        situacao_lista: 'PES',
        tipo_lista: 'FAV',
        data_criacao: dn
      };

      this.http.post(endpoint, lista_notification, this.options)
      .subscribe(resposta => {
          console.log('Inserido com sucesso');
      }, (erro) => {
        console.log(erro);
      });

      this.http.post(endpoint, lista_favoritos, this.options)
      .subscribe(resposta => {
          console.log('Inserido com sucesso');
      }, (erro) => {
        console.log(erro);
      });

      this.http.get(endpoint, this.options).subscribe(data => {
        this.lista = data;
        console.log(this.lista);
      });

    } else {
      this.lista = data;
      console.log(data);
    }
  }

  expandList(i) {
    localStorage.setItem('list', JSON.stringify(this.lista[i]));
    this.router.navigate(['/expand-list']);
  }
}
