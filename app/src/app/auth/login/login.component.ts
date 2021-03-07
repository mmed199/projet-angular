import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:User = new User()

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.logIn(this.user).subscribe(res => {
      if(res.auth == true) {
        this.authService.loggedIn = true;
        this.authService.token = res.token;
        console.log(res.token)
        this.authService.me().subscribe(res => {
          this.authService.user = res;
          console.log(this.authService.user)
        })
      }
    })
  }
}
