import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Uzytkownik } from 'src/app/_models/uzytkownik';
import { Router } from '@angular/router';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  constructor(private pytania: PytaniaTestService, private authService: AuthService) { }

  users: any =[];
  chosenCategory= 'Informatyk';
  categories: any;
  wyswietlanie: boolean=false;
  iterator=0;
  sorted = [];

  ngOnInit(): void {
    this.getCategory();
    this.iterator=0;

  }

  getCategory() {
    this.pytania.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    })
  }

  wyswietl() {
    var e = (document.getElementById("test")) as HTMLSelectElement;
    this.chosenCategory = e.value;
    this.getUsers();
    this.wyswietlanie=true;
  }

  getUsers() {
    let categorydata = {
      kategoria: this.chosenCategory
    }
    this.authService.getUsersByCategory(categorydata).subscribe(response => {
      this.users = response;
      this.sorted=this.users;
      this.sorted=this.sorted.sort((a, b) => (Number(a.wynik) > Number(b.wynik)) ? -1 : 1);
    }, error => {
      console.log(error);
    })
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {

        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  shuffle(array) {
    array.sort(this.dynamicSort("wynik"));
  }

}
