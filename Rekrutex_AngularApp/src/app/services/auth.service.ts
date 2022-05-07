import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Uzytkownik } from '../_models/uzytkownik';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  //bazowe url do api
  readonly BaseURL= 'http://localhost/rekrutex/api';
  
  //url do konkretnego skryptu api
  readonly registerPath = this.BaseURL + "/register.php";
  readonly loginPath = this.BaseURL + "/login.php";

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  login(data): Observable<any> {
    return this.http.post(this.loginPath, data).pipe(
      map((response: any) => {
        let user=JSON.stringify(response);
        user=JSON.parse(user);
        if(user){
          let userId= user['id'];
          let userName=user['imie'];
          let userLastName=user['nazwisko'];
          let userType=user['czy_administrator'];
          this.saveData(userId, userName, userLastName,userType);
        }
      })
    )
  }
  
  saveData(userId, userName, userLastName,userType) {
    if(userType==1){
      sessionStorage.setItem('id', userId);
      sessionStorage.setItem('name', userName);
      sessionStorage.setItem('lastname', userLastName);
      sessionStorage.setItem('userType', 'admin');
    }else{
      sessionStorage.setItem('id', userId);
      sessionStorage.setItem('name', userName);
      sessionStorage.setItem('lastname', userLastName);
      sessionStorage.setItem('userType', 'user');
    }
    
  }


  getData() {
    let user= {
      Id: sessionStorage.getItem('id'),
      Name:sessionStorage.getItem('name'),
      LastName:sessionStorage.getItem('lastname'),
      UserType:sessionStorage.getItem('userType'),

    }
    return user;
  }

  getCurrentUser(){
    return this.getData();
  }

  removeData() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('lastname');
    sessionStorage.removeItem('userType');
  }

  logout() {
    this.removeData();
  }

}
