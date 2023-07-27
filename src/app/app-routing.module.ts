import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"home",
    canActivate:[AuthGuard],
    component:HomeComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"login",
    canActivate:[AuthGuard],
    component:LoginComponent
  },
  {
    path:"test",
    component:TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
