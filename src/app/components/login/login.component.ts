import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  isUserLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.login(this.loginForm.value).subscribe((res) => {
        if(res){
          console.log(res);
          localStorage.setItem("userAccessToken","true");
          this.router.navigateByUrl("/home"); 

        }else{
          console.log("Invalid email/password ");

        }
        
      });
    } else {
      Swal.fire('Please fill in all the details!');
      console.error('Form is invalid'); // 
    }
  }
}
