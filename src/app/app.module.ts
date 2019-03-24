import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { RecipeViewDetailsComponent } from "./recipe-view-details/recipe-view-details.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from "./profile/profile.component";
import { RequestResetComponent } from "./password/request-reset/request-reset.component";
import { ResponseResetComponent } from "./password/response-reset/response-reset.component";

import { RecipeService } from "./services/recipe.service";
import { AuthJwtService } from "./services/auth-jwt.service"
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeComponent,
    HomeComponent,
    FooterComponent,
    RecipeFormComponent,
    SignupComponent,
    RecipeViewDetailsComponent,
    LoginComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SnotifyModule
  ],
  providers: [RecipeService, AuthJwtService, TokenService,
    AuthService, AfterLoginService, BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
