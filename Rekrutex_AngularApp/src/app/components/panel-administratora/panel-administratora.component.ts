import { Component, OnInit } from '@angular/core';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-panel-administratora',
  templateUrl: './panel-administratora.component.html',
  styleUrls: ['./panel-administratora.component.css']
})

export class PanelAdministratoraComponent implements OnInit {

  ngOnInit(): void {
    
  }
id:any= "jeden";
tabChange(ids:any){
  this.id = ids;
}



}
