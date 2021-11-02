import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponseData>;
  constructor(private authService: AuthService) { }
  ngOnInit() { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if( form.invalid ) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if( this.isLoginMode ) this.authObs = this.authService.login(email, password);
    else this.authObs = this.authService.signup(email, password);
    this.authObs.subscribe(
      resData => { this.isLoading = false; console.log(resData); },
      errorMessage => { this.isLoading = false; this.error = errorMessage; console.log(errorMessage); }
    );
    form.reset();
  }
}
