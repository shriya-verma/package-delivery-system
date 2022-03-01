import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isOTPSent: boolean = false;
  isOTPVerified: boolean = false;

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    otp: '',
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(console.log);
  }

  sendOTP() {
    this.userService.sendOTP(this.registerForm.value.phone).subscribe((res) => {
      console.log(res);
      if (res.status == 'pending') {
        this.isOTPSent = true;
      }
    });
  }

  verifyOTP() {
    this.userService
      .verifyOTP(this.registerForm.value.phone, this.registerForm.value.otp)
      .subscribe((res) => {
        console.log(res);
        if (res.status == 'approved' && res.valid == true) {
          this.isOTPVerified = true;
        }
      });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.controls);
      this.userService.register(this.registerForm.value).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log(this.registerForm.controls);
      console.error('Form is invalid');
    }
  }
}
