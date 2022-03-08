import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationGuard } from 'src/app/authentication.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$:boolean = true;


  constructor(private router: Router,
    private authenticate: AuthenticationGuard) { }

  ngOnInit(): void {
  }
  getValue():boolean{
    this.isLoggedIn$= this.authenticate.IsLoggedIn;
    console.log(" Value nav: " + this.isLoggedIn$);
    return this.isLoggedIn$;

  }

  LogoutClick(){
    console.log("Cleared");
    localStorage.clear();
    this.authenticate.isUserLoggedIn();
    this.router.navigateByUrl("/login");
    
  }

}
