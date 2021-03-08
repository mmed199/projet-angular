import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService,
              private router:Router) {}


  logOut() {
    this.authService.logOut()
  }

  logedIn() {
    return this.authService.loggedIn()
  }
}
