import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/interface/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public userRegister: Users = {};

  constructor() { }

  ngOnInit() {
  }

  register(){
    
  }

}
