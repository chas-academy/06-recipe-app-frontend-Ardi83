import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipe-view-details',
  templateUrl: './recipe-view-details.component.html',
  styleUrls: ['./recipe-view-details.component.scss']
})
export class RecipeViewDetailsComponent {
id: any;
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
  ingredients: [],
  rating: 0,
  comments: []
};
  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(param => {this.id = +param['id'] || null;
    if (this.id) {
      this.recipeService.getRecipe(this.id).subscribe((x: any) => { 
        this.recipe = x ;
        })
      } 
    });   
  }

 

}
