import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-page',
  templateUrl: './recommended-page.component.html',
  styleUrls: ['./recommended-page.component.css']
})
export class RecommendedPageComponent implements OnInit {

  user : any = JSON.parse(localStorage.getItem("user"));

  constructor() { }

  ngOnInit() {
  }

}
