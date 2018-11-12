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

  lista: any = {};
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
    let endpoint = this._apiService.getListById(this.id);
    this.http.get(endpoint, this.options).subscribe(data => {
      this.pageInit(data);
    })
  }

  pageInit(data){
    this.lista = data;
  }

  removeList(){
    let endpoint = this._apiService.removeList(this.id);
    this.http.remove(endpoint, this.options)
    .subscribe(resposta => {
        this.ngOnInit();
        console.log("Remoção com sucesso");
    })
  }

}
