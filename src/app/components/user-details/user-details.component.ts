import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    state: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zip: ['', [Validators.required]],


  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit()  {
    this.userForm.valueChanges.subscribe(console.log);
  }
  onSubmit(){
    if(this.userForm.valid){ 
      console.log(this.userForm.controls);
      this.userService.saveUserDetails(this.userForm.value).subscribe((res) => {
        if(res){
          console.log(res);
          // localStorage.setItem("userAccessToken","true");
          this.router.navigateByUrl("/navbar"); 

        }else{
          console.log("Error");

        }
      });  

    }else{
      Swal.fire('Please fill in all the details');
    }

  }

}
