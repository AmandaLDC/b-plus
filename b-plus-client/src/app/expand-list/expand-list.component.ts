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
        console.log(resposta);
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

  newReview() {
    this.router.navigate(['/create-review']);
  }

  updateList() {
    this.router.navigate(['/update-list', this.lista.id_lista]);
  }

}
