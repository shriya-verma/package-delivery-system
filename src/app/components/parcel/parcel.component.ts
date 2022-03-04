import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
})
export class ParcelComponent implements OnInit {
  paymentAmount: number = 0;
  discount: number = 0;
  isBooked: boolean = false;
  // finalAmount: number = 0;

  costReceived: boolean = false;

  parcelForm: FormGroup = this.fb.group({
    type: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    length: ['', [Validators.required]],
    breadth: ['', [Validators.required]],
    pickupAddress: ['', [Validators.required]],
    dropAddress: ['', [Validators.required]],
    additionalPhoneNumber: ['', [Validators.required]],
    coupon: '',
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.parcelForm.valueChanges.subscribe(console.log);
  }

  getCost() {
    let parcelData = {
      type: this.parcelForm.get('type')?.value, // optional chaining
      weight: this.parcelForm.get('weight')?.value,
      length: this.parcelForm.get('length')?.value,
      breadth: this.parcelForm.get('breadth')?.value,
    };

    this.userService.getCost(parcelData).subscribe((amount) => {
      console.log(amount);
      this.paymentAmount = amount;
      this.costReceived = true;
    });
  }

 
  verifyCoupon() {
    let coupon = this.parcelForm.get('coupon')?.value;
    this.userService.verifyCoupon(coupon).subscribe((discount) => {
      console.log(discount);
      this.discount = discount;
      this.paymentAmount -= discount;
    });
  }

  onSubmit() {
    if (this.parcelForm.valid) {
      console.log(this.parcelForm.controls);
      this.userService
        .verifyCost(this.paymentAmount, this.discount)
        .subscribe((isCostVerified) => {
          console.log(isCostVerified);
          if (isCostVerified) {
            this.userService
              .saveParcelData({
                type: this.parcelForm.get('type')?.value, // optional chaining
                weight: this.parcelForm.get('weight')?.value,
                length: this.parcelForm.get('length')?.value,
                breadth: this.parcelForm.get('breadth')?.value,
                pickupAddress: this.parcelForm.get('pickupAddress')?.value,
                dropAddress: this.parcelForm.get('dropAddress')?.value,
                additionalPhoneNumber: this.parcelForm.get(
                  'additionalPhoneNumber'
                )?.value,
                coupon: this.parcelForm.get('coupon')?.value,
                discount: this.discount,
                paymentAmount: this.paymentAmount,
              })
              .subscribe((data) => {
                console.log(data);
                alert('Cost Displayed Right');
              });
          } else {
            alert('Cost Displayed Wrong');
          }
        });
    } else {
      console.log(this.parcelForm.controls);
      console.error('Form is invalid');
    }
  }
}
