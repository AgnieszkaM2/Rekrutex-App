import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Uzytkownik } from './_models/uzytkownik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Rekrutex_AngularApp';
  user : any;
  isUser: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.setCurrentUser();
  }
  
  setCurrentUser() {
    this.user = this.auth.getCurrentUser();
    console.log(this.user);
    if(this.user.Id!=null){
      this.isUser=true;
    }
  }

  logout() {
    this.auth.logout();
    this.isUser = false;
  }

}
