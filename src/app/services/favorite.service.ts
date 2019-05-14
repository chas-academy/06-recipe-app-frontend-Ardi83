import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class FavoriteService {
  private apiUrl = 'http://recipe-backend.ardinasiri.chas.academy/api/';
  httpOptions;

  constructor(private httpClient: HttpClient, private router: Router, private tokenService: TokenService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.get()
      })
    };
  }

  addToFave(id) {
    return this.httpClient.post(`${this.apiUrl}addToList`, { recipeId: id }, this.httpOptions);
  }
  removeFromFave(id) {
    return this.httpClient.post(`${this.apiUrl}removeFromList`, { recipeId: id }, this.httpOptions);
  }
  getAllFave(): Observable<any[]> {
    return this.httpClient.get(`${this.apiUrl}getFavList`, this.httpOptions) as any;
  }
}
