import { RecipeService } from './../services/recipe.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public randomId;

  constructor (private recipeService: RecipeService) {
    this.recipeService.getRecipes().subscribe((x: any) => {
      this.randomId = x.data.map(x => x.id)[Math.floor(Math.random()*x.data.map(x => x.id).length)];
    })
  }
}
