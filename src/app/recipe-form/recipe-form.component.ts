import { RecipeService } from './../services/recipe.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  
})
export class RecipeFormComponent {
  id;

  recipe: Recipe = {
      author: '',
      title: '',
      instructure: '',
      name: '',
      description: '',
      country: '',
      type: '',
      allergic_type: '',
      energy: 0,
      preparing_time: '',
      cooking_time: '',
      image: '',
      ingredients: []
  };

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {
      this.id = +param['id'] || null;
      if (this.id) {
        this.recipeService.getRecipe(this.id).subscribe((x: any) => {
          console.log(x);
          
          this.recipe = x;
        });
      }
    });
  }
 
  allergic_type = [ 
    {id:1, name: 'normal'},
    {id:2, name: 'vegan'},
    {id:3, name: 'vegetarian'},
    {id:4, name: 'lactoseFree'},
    {id:5, name: 'glutenFree'},
  ]
  type = [ 
    {id:1, name: 'starter'},
    {id:2, name: 'snack'},
    {id:3, name: 'main_course'},
    {id:4, name: 'dessert'},
    {id:5, name: 'salad'},
    {id:6, name: 'sauce'},
  ]

  addIngredient(value: Ingredient) {
    this.recipe.ingredients.push(value);
  }

  onSubmit() 
  {
    if (!this.id) {
      this.recipeService.createRecipe(this.recipe);
    } else {
      this.recipeService.updateRecipe(this.id, this.recipe);
    }
  }
}
