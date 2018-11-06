import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})


export class SearchService {

baseUrl: string = 'http://dev2.unifacef.com.br:8000/api/exemplarTitulo/';
data: any = 0;

constructor(private _http: HttpClient){ }


search(queryString: string) {
      queryString = queryString.replace(' ', '%');
      if(queryString == ""){
        return new EmptyObservable();
      }
      let _URL = this.baseUrl + queryString;
      const options = {
        Headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : '*',
          "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
          "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
        }),
        withCredentials: false
      }
      console.log(_URL)
      return this._http.get(_URL, options);
  }

  save(str : string){
    this.data = str;
    console.log(str);
  }

  getdataforid_material(){
    if(this.data == 0){
      return "0";
    }
    let baseUrlId = 'http://dev2.unifacef.com.br:8000/api/exemplarMaterial/';
    let _URL = baseUrlId + this.data;
    return _URL
  }

  getdataforautor(){
    if(this.data == 0){
      return "0";
    }
    let baseUrlId = 'http://dev2.unifacef.com.br:8000/api/exemplarAutor/';
    let _URL = baseUrlId + this.data;
    return _URL
  }

  getdataforassunto(){
    if(this.data == 0){
      return "0";
    }
    let baseUrlId = 'http://dev2.unifacef.com.br:8000/api/exemplarAssunto/';
    let _URL = baseUrlId + this.data;
    return _URL
  }
}
