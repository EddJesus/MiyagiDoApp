import { Users } from './../interface/users';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user:Users) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user:Users) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {

  }

  getAuth() {
    return this.afa;
  }
}
