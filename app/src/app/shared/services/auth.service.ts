import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:boolean = false;
  user:User
  token:string = ""

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

  logOut() {
    this.loggedIn = false;
  }

  isAdmin():Promise<any> {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserAdmin;
  }
}
