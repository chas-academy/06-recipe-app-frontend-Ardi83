import { FavoriteService } from './../services/favorite.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipes$: Recipe[];
  links: Links = {
    prev: '',
    next: ''
  };
  categories = ['starter', 'snack', 'main_course', 'dessert', 'salad', 'sauce'];
  public access = 'Insert access password!';

  public error = '';

  constructor(
    private recipeservice: RecipeService,
    private router: Router,
    private Auth: AuthService,
    private favoriteService: FavoriteService
    ) {
    this.getRecipes();
  }
  public loggedIn: boolean;

  getRecipes(category?: string) {
    if (category) {
      this.recipeservice.getRecipes().subscribe((response: GetRecipes) => {
        this.recipes$ = response.data.filter(
          (x: any) => x.meal.type === category
        );
        this.links = response.links;
      });
    } else {
      this.recipeservice.getRecipes().subscribe((response: GetRecipes) => {
        this.recipes$ = response.data;
        this.links = response.links;
      });
    }
  }
  getRecipesPrev(link) {
    this.recipeservice
      .getRecipesPrev(link)
      .subscribe((response: GetRecipes) => {
        this.recipes$ = response.data;
        this.links = response.links;
      });
  }
  getRecipesNext(link) {
    this.recipeservice
      .getRecipesNext(link)
      .subscribe((response: GetRecipes) => {
        this.recipes$ = response.data;
        this.links = response.links;
      });
  }

  edit(id) {
    this.router.navigate(['recipe/new/' + id]);
  }

  delete(id) {
    if (confirm('Are you sure to delete recipe with id: ' + id + '?')) {
      this.recipeservice.deleteById(id).subscribe(() => {
        this.getRecipes();
      });
    }
  }

  view(id) {
    this.router.navigate(['recipe/view/' + id]);
  }

  filterBy(category) {
    this.getRecipes(category);
  }

  searchMeal(e) {
    if (!e.target.value) {
      this.getRecipes();
      return;
    }
    if (e.keyCode === 8) {
      e.target.value = '';
    }
    let r: any = [];
    let l: any = {};
    this.recipeservice.getRecipes().subscribe((response: GetRecipes) => {
      r = response.data;
      l = response.links;

      if (l.next) {
        this.recipeservice.getRecipesNext(l.next).subscribe((p: GetRecipes) => {
          p.data.forEach(element => {
            r.push(element);
          });
          l = p.links;
          this.recipes$ = r.filter(i => i.meal.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
        });
      } else {
        this.recipes$ = r.filter(i => i.meal.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
      }
    });
  }

  addToFav(id) {
    this.favoriteService.addToFave(id).subscribe(x => {
    }, err => {
      alert(err.error);
    });
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe( value => this.loggedIn = value);
  }
}
