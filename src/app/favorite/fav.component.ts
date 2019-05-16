import { Router } from '@angular/router';
import { RecipeService } from './../services/recipe.service';
import { FavoriteService } from './../services/favorite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <h1 class="text-info" *ngIf="loading">Loading ...</h1>
    <h1 class="text-info" *ngIf="favRecipes.length < 1 && !loading">You have not any recipes in your favorite list :)</h1>
    <table class="table" *ngIf="favRecipes.length > 0">
    <thead>
        <th>Picture</th>
        <th>Author</th>
        <th>Meal</th>
        <th>Allergic type</th>
        <th>Category</th>
        <th>Rank</th>
        <th>Favorite</th>
    </thead>
    <tbody>
      <tr *ngFor="let recipe of favRecipes">
        <td *ngIf="recipe.meal.image" ><img style="cursor: pointer;" width="100px" src="{{ recipe.meal.image }}" (click)="view(recipe.id)"/></td>
        <td>{{ recipe.author}}</td>
        <td>{{recipe.meal.name}}</td>
        <td>{{recipe.meal.allergic_type}}</td>
        <td>{{recipe.meal.type}}</td>
        <td>{{ recipe.rating }}</td>
        <td>
          <button type="button" class="btn btn-primary" (click)="removeFromFav(recipe.id)">
            Remove
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="8" *ngIf="error" class="text-danger">{{error}}</td>
      </tr>
    </tbody>
</table>
  `,
  styles: [``]
})
export class FavComponent implements OnInit {
  favs = [];
  recipes = [];
  favRecipes = [];
  error = '';
  loading = true;
  constructor(private favoriteService: FavoriteService, private recipeService: RecipeService, private router: Router) { }
  
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(r => {
      this.recipes = r;
    });
    this.favoriteService.getAllFave().subscribe(x => {
      this.favs = x;
      this.recipes.forEach(element => {
        if (this.favs.indexOf(element.id.toString()) > -1) {
          this.favRecipes.push(element);
        }
      });
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  removeFromFav(id) {
    this.favRecipes = [];
    this.loading = true;
    this.favoriteService.removeFromFave(id).subscribe(x => {
      this.recipeService.getAllRecipes().subscribe(r => {
        this.recipes = r;
      });
      this.favoriteService.getAllFave().subscribe(x => {
        this.favs = x;
        this.recipes.forEach(element => {
          if (this.favs.indexOf(element.id.toString()) > -1) {
            this.favRecipes.push(element);
          }
        });
        this.loading = false;
      });
      this.loading = true;
    }, err => {
      alert(err.error);
    });
  }
  view(id) {
    this.router.navigate(['recipe/view/' + id]);
  }
  

}
