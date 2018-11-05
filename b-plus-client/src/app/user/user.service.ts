import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl: string = 'http://dev2.unifacef.com.br:8000/api/matriculadoGrad/';
data: any;

constructor(private _http: HttpClient){ }

  save(str : string){
    str = str.replace(' ', '%');
    this.data = str;
    console.log(str);
  }

  getdataforid_aluno(){
    let _URL = this.baseUrl + this.data;
    return _URL
  }
}
