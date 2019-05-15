import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl: string = 'http://recipe-backend.ardinasiri.chas.academy/api/recipes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  getRecipes(): Observable<GetRecipes> {
    return this.httpClient.get(this.apiUrl) as Observable<GetRecipes>;
  }
  getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.get('http://recipe-backend.ardinasiri.chas.academy/api/allrecipes') as Observable<Recipe[]>;
  }
  getRecipesPrev(prevApi): Observable<GetRecipes> {
    return this.httpClient.get(prevApi) as Observable<GetRecipes>;
  }
  getRecipesNext(nextApi): Observable<GetRecipes> {
    return this.httpClient.get(nextApi) as Observable<GetRecipes>;
  }

  getRecipe(id): Observable<GetRecipe> {
    return this.httpClient.get(this.apiUrl + '/' + id) as Observable<GetRecipe>;
  }

  deleteById(id) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  createRecipe(recipe: Recipe) {
    let ings = recipe.ingredients;
    let recipeWithoutIngredients = recipe;
    delete recipeWithoutIngredients.ingredients;

    this.httpClient
      .post(this.apiUrl, recipeWithoutIngredients, this.httpOptions)
      .subscribe((x: any) => {
        this.httpClient
          .post(
            this.apiUrl + '/' + x.data.id + '/ingredients',
            ings,
            this.httpOptions
          )
          .subscribe(() => {
            this.router.navigate(['recipe']);
          });
      });
  }

  updateRecipe(id, recipe: any) {
    // let ings = recipe.ingredients;
    let recipeWithoutIngredients = recipe;
    delete recipeWithoutIngredients.ingredients;
    recipeWithoutIngredients.name = recipe.meal.name;
    recipeWithoutIngredients.description = recipe.meal.description;
    recipeWithoutIngredients.country = recipe.meal.country;
    recipeWithoutIngredients.energy = recipe.meal.energy;
    recipeWithoutIngredients.preparing_time = recipe.meal.preparing_time;
    recipeWithoutIngredients.cooking_time = recipe.meal.cooking_time;
    recipeWithoutIngredients.image = recipe.meal.image;
    recipeWithoutIngredients.allergic_type = recipe.meal.allergic_type;
    recipeWithoutIngredients.type = recipe.meal.type;

    this.httpClient
      .put(this.apiUrl + '/' + id, recipeWithoutIngredients, this.httpOptions)
      .subscribe((x: any) => {
        this.router.navigate(['/recipe']);
      });
  }
}
