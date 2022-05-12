import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';

@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {

  categories: any;
  chosenCategory: any;

  constructor(private pytania: PytaniaTestService, private http: HttpClient) { }

  ngOnInit(): void {
    this.chosenCategory='';
    this.getCategory();
  }

  getCategory() {
    this.pytania.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    })
  }

  setCategory(category) {
    this.chosenCategory= category;
  }
}
