import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "./../services/recipe.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "recipe-view-details",
  templateUrl: "./recipe-view-details.component.html",
  styleUrls: ["./recipe-view-details.component.scss"]
})
export class RecipeViewDetailsComponent implements OnInit {
  @Input() randomId;

  id: number;
  recipe: Recipe = {
    author: "",
    title: "",
    instructure: "",
    name: "",
    description: "",
    country: "",
    type: "",
    allergic_type: "",
    energy: 0,
    preparing_time: "",
    cooking_time: "",
    image: "",
    ingredients: [],
    rating: 0,
    comments: []
  };
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.id = +param["id"] || null;
      if (this.id) {
        this.recipeService.getRecipe(this.id).subscribe((x: any) => {
          this.recipe = x;
        });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.randomId) {
        this.recipeService.getRecipe(this.randomId).subscribe((x: any) => {
          this.recipe = x;
        });
      }
    }, 1500);
  }
}
