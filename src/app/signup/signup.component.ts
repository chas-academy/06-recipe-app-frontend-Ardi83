import { TokenService } from './../services/token.service';
import { AuthJwtService } from "./../services/auth-jwt.service";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public erro = [];

  constructor(
    private auth: AuthJwtService,
    private Token: TokenService,
    private router: Router
    ) {}

  onSubmit() {
    this.auth.signup(this.form).subscribe(
      data => this.handleResponse(data),
      errorr => this.handleError(errorr)
      );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(err) {
    this.erro = err.error.errors;
  }

  ngOnInit() {}
}
