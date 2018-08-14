import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;
  public userAction: Subject<string>;
  public loggedIn: boolean;
  constructor() { 
    this.userAction = new Subject<string>();
    this.loggedIn = false;
  }

  setToken(t) {
    this.token = t;
  }

  getToken() {
    return this.token;
  }

  login() {
    this.userAction.next('loggedIn');
    this.loggedIn = true;
  }

  logout() {
    this.userAction.next('loggedOut');
    this.loggedIn = false;
  }
}
