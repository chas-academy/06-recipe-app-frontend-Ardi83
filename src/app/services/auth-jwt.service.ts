import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthJwtService {
  private logUrl = "http://recipe/api";

  constructor(private http: HttpClient) {}

  signup(data) {
    return this.http.post(`${this.logUrl}/signup`, data);
  }

  login(data) {
    return this.http.post(`${this.logUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.logUrl}/sendPasswordResetLink`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.logUrl}/resetPassword`, data)
  }
}
