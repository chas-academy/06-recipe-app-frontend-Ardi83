import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit{
  recipes$: Recipe[];
  links: Links = {
    prev: "",
    next: ""
  };
  categories = ["starter", "snack", "main_course", "dessert", "salad", "sauce"];
  public access = "Insert access password!";

  constructor(
    private recipeservice: RecipeService,
    private router: Router,
    private Auth: AuthService
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
    this.router.navigate(["recipe/new/" + id]);
  }

  delete(id) {
    if (confirm("Are you sure to delete recipe with id: " + id + "?")) {
      this.recipeservice.deleteById(id).subscribe(() => {
        this.getRecipes();
      });
    }
  }

  view(id) {
    this.router.navigate(["recipe/view/" + id]);
  }

  filterBy(category) {
    this.getRecipes(category);
  }


  ngOnInit() {
    this.Auth.authstatus.subscribe( value => this.loggedIn = value);
  }

}
