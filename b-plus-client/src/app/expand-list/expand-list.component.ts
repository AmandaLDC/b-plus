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

<<<<<<< HEAD
  // use localStorage to get list id from last page;
  lista: any = JSON.parse(localStorage.getItem('list'));
  user: any = JSON.parse(localStorage.getItem('user'));
  options: any = {
=======
  lista: any = JSON.parse(localStorage.getItem("list"));;
  user : any = JSON.parse(localStorage.getItem("user"));
  options : any = {
>>>>>>> bbdb5a22f2181a88cb7794dbc249a465300af6ce
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

  pageInit(data) {
  }

<<<<<<< HEAD
  removeList() {
    const endpoint = this._apiService.listId();
=======
  removeList(){
    let endpoint = this._apiService.listId();
>>>>>>> bbdb5a22f2181a88cb7794dbc249a465300af6ce
    this.http.delete(endpoint, this.options)
    .subscribe(resposta => {
        this.ngOnInit();
        console.log('Remoção com sucesso');
    });
  }

  newReview() {
    this.router.navigate(['/create-review']);
  }

<<<<<<< HEAD
  updateList(id) {
    this.router.navigate(['/aluno-edita', id]);
=======
  updateList(id){
    this.router.navigate(['/update-list']);
>>>>>>> bbdb5a22f2181a88cb7794dbc249a465300af6ce
  }

}
