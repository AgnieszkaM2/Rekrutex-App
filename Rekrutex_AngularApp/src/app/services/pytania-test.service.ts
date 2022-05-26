import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Pytanie} from '../_models/pytania'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PytaniaTestService {

  constructor(private http: HttpClient) { }

  //private category = new BehaviorSubject('Informatyk');
  //currentCategory$ = this.category.asObservable();

  //bazowe url do api
  readonly BaseURL= 'http://localhost/rekrutex/api';
  
  //url do konkretnego skryptu api
  readonly getTestQuestionPath = this.BaseURL + "/pytania_test.php";
  readonly getCategoryPath = this.BaseURL + "/kategorie.php";
  readonly getQuestionsPath = this.BaseURL + "/pytania.php";
  readonly resultPath = this.BaseURL + "/wynik.php";
  readonly uzytkownicy = this.BaseURL + "/uzytkownicyPanel.php";
  readonly pytania = this.BaseURL + "/pytaniaPanel.php";
  readonly dodanie = this.BaseURL + "/dodaniePanel.php";
  //funkcja wykonująca zapytanie do api i zwracająca jego wynik
  getTestQuestion() {
    return this.http.get<Pytanie[]>(this.getTestQuestionPath);
  }

  getQuestions(data): Observable <any> {
    return this.http.post<Pytanie[]>(this.getQuestionsPath, data);
  }

  getCategories() {
    return this.http.get(this.getCategoryPath);
  }

  getUsers(){
    return this.http.get(this.getCategoryPath);
  }

  //changeCategory(category) {
  //  this.category.next(category)
  //}

  sendResult(data): Observable<any> {
    return this.http.post(this.resultPath, data);
  }


}

/*Moduł serwisu - zawiera funkcję przeznaczoną do wykonywania zapytania z frontendu do api (po zdefiniowanym adresie url api)
do konkretnego sktuptu api (w tym przypadku pytania_test.php) i zwracania konkretnego rezultatu (w tym przypadku zwracanie listy pytań).
Moduł importuje stworzony wcześniej model pytania i wykorzystuje go przy zwracaniu rezultatu funkcji getTestQuestions().
Moduł po utworzeniu można wykorzystywać w wszystkich komponentach, w których go potrzebujemy poprzez odpowiednie importowanie go.
*/
