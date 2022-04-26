import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  //Zmienna przechowująca listę z pytaniami zwracanymi z api
  Questions: any;

  //konstruktor- odpowiednio zdefiniowane argumenty pozwalają na korzystanie z zaimportowanego serwisu PytaniaTestService i modułu HttpClient
  constructor(private pytania: PytaniaTestService, private http: HttpClient) {}

  //funkcja wykonująca się przy załadowaniu strony
  ngOnInit(): void {
    this.getQuestions();
  }

  //funkcja pobierająca pytania do wcześniej utworzonej zmiennej 
  getQuestions() {
    this.pytania.getTestQuestion().subscribe(response => {
      this.Questions = response;
    }, error => {
      console.log(error);
    })
  }

}
/*
Plik z typescriptem do obsługi części rzeczy na stronie danego komponentu (czyli coś podobnego do tego
jak w normalnym htmlu umieszczacie skrypt z js, tylko tu używacie typescriptu i macie do niego 
osobny plik który już jest powiązany z html strony i nie trzeba go nigdzie importować).
W funkcji wykonującej się przy załadowaniu strony możecie używać wszystkich metod, które chcecie żeby się wykonywały 
od razu przy ładowaniu strony (metody te muszą oczywiście być gdziekolwiek zdefiniowane w tym pliku lub odpowiednio do niego zaimportowane).
W funkcji do pobierania listy pytań korzystacie z funkcji zdefiniowanych w serwisie PytaniaTestService,
w przypadku normalnego wykonania się funkcji rezultat jest przypisywany do wcześniej zdefiniowanej zmiennej, jeśli 
wystąpi gdzieś błąd przy pobieraniu pytań - komunikat błędu zostaje wypisany w konsoli.
*/
