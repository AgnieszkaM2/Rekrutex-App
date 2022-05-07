import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Uzytkownik } from 'src/app/_models/uzytkownik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  
  user: any;
  loginForm: FormGroup;
  loginStatus: boolean=false;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      'userLogin': [''],
      'password': ['']})
  }

  ngOnInit(): void {
  }

  get userLogin() {
    return this.loginForm.get('userLogin')
    
  }

  get password() {
    return this.loginForm.get('password')
    
  }

  redirecting: boolean=false;
  timer = 5;
  interval;
  
  redirect(){
    this.router.navigateByUrl("/strona-glowna")
    .then(() => {
      window.location.reload();
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
      } else {
        this.timer = 5;
      }
    },1000)
  }
  
login() {
    let loginData = {
      
      login: this.loginForm.value.userLogin,
      haslo: this.loginForm.value.password
    };
    this.authService.login(loginData).subscribe(
      data => {
      console.log(data);
      console.log('success');
      this.loginStatus=true;
      this.startTimer();
      setTimeout(() => {
        this.redirecting=true;
        this.redirect(); 
      }, 5000);  //5s  
      
    },
    (error) => {
      this.loginError=true;
    })  
  }

  logout() {
    this.authService.logout();
    this.loginStatus = false;
  }
  goBack(): void {
    this.loginError=false;
  }

}
