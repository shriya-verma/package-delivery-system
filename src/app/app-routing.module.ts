import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ParcelComponent } from './components/parcel/parcel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
const routes: Routes = [
  {
    path: "", 
    redirectTo: "login",
    pathMatch: "full"
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [AuthenticationGuard]}, 
  // { path: 'userDetails', component: UserDetailsComponent}, 
  { path: 'navbar', component: NavbarComponent , canActivate: [AuthenticationGuard]},
  { path: 'parcel', component: ParcelComponent , canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
