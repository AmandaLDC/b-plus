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

  lista: any;
  user : any = JSON.parse(localStorage.getItem("user"));
  options : any = {
                    Headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      "Access-Control-Allow-Origin" : '*',
                      "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
                      "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
                    }),
                    withCredentials: false
                  }

  constructor(
      private http: HttpClient,
      private router: Router,
      private _apiService: ApiService) {}

  ngOnInit() {
    if(this.user == null){
      this.router.navigate(['/home-page']);
    } else {
      let endpoint = this._apiService.getListByUserId(this.user.id_aluno);
      this.http.get(endpoint, this.options).subscribe(data => {
        this.pageInit(data);
      })
    }
  }

  getDate(){
    let today = new Date();
    let dd = today.getDate();
    console.log(dd);
    let mm = today.getMonth()+1;
    console.log(mm);
    let yyyy = today.getFullYear();
    let dn = dd + '/' + mm + '/' + yyyy;
    return dn;
  }

  pageInit(data){
    this.lista = data;
    const endpoint = this._apiService.postList();
    if(this.lista == 0){
      let dn = this.getDate();
      let lista_notification = {
        nome_lista: "Notificações",
        id_usuario: this.user.id_aluno,
        categoria_lista: "Notificações",
        situacao_lista: "PES",
        tipo_lista: "NOT",
        data_criacao: dn
      }

      let lista_favoritos = {
        nome_lista: "Favoritos",
        id_usuario: this.user.id_aluno,
        categoria_lista: "Favoritos",
        situacao_lista: "PES",
        tipo_lista: "FAV",
        data_criacao: dn
      }

      this.http.post(endpoint, lista_notification, this.options)
      .subscribe(resposta => {
          console.log("Inserido com sucesso");
      }, (erro) => {
        console.log(erro);
      });

      this.http.post(endpoint, lista_favoritos, this.options)
      .subscribe(resposta => {
          console.log("Inserido com sucesso");
      }, (erro) => {
        console.log(erro);
      });
      let getendpoint = this._apiService.getListByUserId();
      this.http.get(endpoint, this.options).subscribe(data => {
        this.lista = data;
      });
      this.router.navigate(['/home-page']);
    }
  }

  expandList(i){
    localStorage.setItem("list", JSON.stringify(this.lista[i]));
    this.router.navigate(['/expand-list']);
  }
}
