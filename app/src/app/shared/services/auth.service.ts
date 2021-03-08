import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User
  public token:string = ""

  uri = "http://localhost:8010/api/auth/"

  constructor(private http: HttpClient) { }

  logIn(user:User): Observable<any> {
    return this.http.post(this.uri + "login", user)
  }

  me():Observable<any> {
    return this.http.get(this.uri + "me", {
      headers: {
        "x-access-token" : `${this.token}`
      }
    })
  }

  saveUser() {
    localStorage.setItem('currentUser', JSON.stringify(this.user));
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

  logOut() {
    this.user = null
    localStorage.removeItem('currentUser');
  }

  loggedIn():boolean {
    this.getUser()
    return this.user ? true : false
  }

  isAdmin() {
    this.getUser()
    return this.user != null && this.user.role == "admin";
  }
}
