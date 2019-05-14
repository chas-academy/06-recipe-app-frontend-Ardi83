import { FavComponent } from './favorite/fav.component';
import { BeforeLoginService } from './services/before-login.service';
import { ResponseResetComponent } from "./password/response-reset/response-reset.component";
import { RequestResetComponent } from "./password/request-reset/request-reset.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RecipeViewDetailsComponent } from "./recipe-view-details/recipe-view-details.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { SignupComponent } from "./signup/signup.component";
import { AfterLoginService } from './services/after-login.service';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "recipe", component: RecipeComponent, pathMatch: "full" },
  { path: "recipe/new/:id", component: RecipeFormComponent, canActivate: [AfterLoginService] },
  { path: "recipe/new", component: RecipeFormComponent, canActivate: [AfterLoginService] },
  { path: "recipe/view/:id", component: RecipeViewDetailsComponent },
  { path: "login", component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: "signup", component: SignupComponent, canActivate: [BeforeLoginService] },
  { path: "profile", component: ProfileComponent, canActivate: [AfterLoginService] },
  { path: "request-password-reset", component: RequestResetComponent, canActivate: [BeforeLoginService] },
  { path: "response-password-reset", component: ResponseResetComponent, canActivate: [BeforeLoginService] },
  { path: 'myfav', component: FavComponent, canActivate: [AfterLoginService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
