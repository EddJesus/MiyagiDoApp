import { Users } from './../../interface/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: Users = {};

  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log(this.userLogin);
  }

}
