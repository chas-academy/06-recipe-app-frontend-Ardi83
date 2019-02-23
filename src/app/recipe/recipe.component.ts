import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  recipes$: Recipe[];
  filterRecipes: any[];
  
  constructor(private recipeservice: RecipeService, private router: Router) {
    this.getRecipes();
  }
  
  getRecipes() {
    this.recipeservice.getRecipes()
    .subscribe(response => {
      this.recipes$ = response.data;
    });
  }

  edit(id) {
    this.router.navigate(['recipe/new/' + id]);
  }
  
  delete(id) {
    if(confirm('Are you sure to delete recipe with id: ' + id + '?')) {
      this.recipeservice.deleteById(id).subscribe(() => {
        this.getRecipes();
      })
    }
  }

  //    getRecipes() {
  //      this._http.get<Recipe[]>(this.apiUrl);
  //   }
  //   addComment(id) {
  //     console.log(id);
      
  //   }
    
  //   filterBy(en) {
  //     this._http.get(this.apiUrl)
  //     .subscribe(response => {
  //       this.filterRecipes = response.filter(x => x.meal.energy === en);
  //     })  
  // }

  // //  post Http

  
}
