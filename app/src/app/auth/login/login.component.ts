import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:User = new User()

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.logIn(this.user).subscribe(res => {
      if(res.auth == true) {
        this.authService.token = res.token;
        console.log(res.token)
        this.authService.me().subscribe(res => {
          this.authService.user = res;
          this.authService.saveUser()
          this.router.navigate(['/'])
        })
      }
    })
  }
}
