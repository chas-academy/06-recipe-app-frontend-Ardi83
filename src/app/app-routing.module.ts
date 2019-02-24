import { HomeComponent } from './home/home.component';
import { RecipeViewDetailsComponent } from './recipe-view-details/recipe-view-details.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},   
  { path: 'recipe', component: RecipeComponent, pathMatch: 'full'},   
  { path: 'recipe/new/:id', component: RecipeFormComponent},   
  { path: 'recipe/new', component: RecipeFormComponent},   
  { path: 'recipe/view/:id', component: RecipeViewDetailsComponent},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
