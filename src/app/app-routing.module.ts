import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
  { path: 'recipe', component: RecipeComponent, pathMatch: 'full'},   
  { path: 'recipe/new/:id', component: RecipeFormComponent},   
  { path: 'recipe/new', component: RecipeFormComponent},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
