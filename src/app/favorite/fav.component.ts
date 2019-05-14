import { Router } from '@angular/router';
import { RecipeService } from './../services/recipe.service';
import { FavoriteService } from './../services/favorite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <table class="table">
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
  constructor(private favoriteService: FavoriteService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(r => {
      this.recipes = r.data;
    });
    this.favoriteService.getAllFave().subscribe(x => {
      this.favs = x;
      this.recipes.forEach(element => {
        if (this.favs.indexOf(element.id.toString()) > -1) {
          this.favRecipes.push(element);
        }
      });
    });
  }
  removeFromFav(id) {
    this.favRecipes = [];
    this.favoriteService.removeFromFave(id).subscribe(x => {
      this.recipeService.getRecipes().subscribe(r => {
        this.recipes = r.data;
      });
      this.favoriteService.getAllFave().subscribe(x => {
        this.favs = x;
        this.recipes.forEach(element => {
          if (this.favs.indexOf(element.id.toString()) > -1) {
            this.favRecipes.push(element);
          }
        });
      });
    }, err => {
      alert(err.error);
    });
  }
}
