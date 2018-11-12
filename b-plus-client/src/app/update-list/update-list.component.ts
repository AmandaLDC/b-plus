import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

    model: any = {};
    lista: any = [];
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
    }

    onSubmit(){
      let endpoint = this._apiService.postList();
      this.http.put(endpoint, this.model, this.options)
      .subscribe(resposta => {
        console.log("Inserido com sucesso");
      }, (erro) => {
        console.log(erro);
      });
    }

}
