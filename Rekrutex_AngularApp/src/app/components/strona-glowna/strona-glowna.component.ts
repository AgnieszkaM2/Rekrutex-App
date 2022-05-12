import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent implements OnInit {

  user : any;
  isUser: boolean = false;

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.user = this.auth.getCurrentUser();
    console.log(this.user);
    if(this.user.Id!=null){
      this.isUser=true;
    }
  }

}
