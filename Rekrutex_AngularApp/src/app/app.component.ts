import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Uzytkownik } from './_models/uzytkownik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Rekrutex_AngularApp';
  user : any;
  isUser: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.setCurrentUser();
  }
  
  setCurrentUser() {
    this.user = this.auth.getCurrentUser();
    if(this.user.Id!=null){
      this.isUser=true;
    }
  }

  redirect(){
    this.router.navigateByUrl("/strona-glowna")
    .then(() => {
      window.location.reload();
    });
  }

  toggleGreyTheme(): void {
    document.body.classList.toggle('gray-scale');
 }

  logout() {
    this.auth.logout();
    this.isUser = false;
    this.redirect();
  }

}
