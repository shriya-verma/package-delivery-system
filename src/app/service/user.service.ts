import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // register user
  register(userData: {
    email: string;
    password: string;
    phone: string;
  }): Observable<any> {
    return this.http.post('http://localhost:8000/users/register', {
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
    });
  }

  // verify login credentials
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:8000/users/register', {
      email: userData.email,
      password: userData.password,
    });
  }

  // send otp to the user
  sendOTP(phone: string): Observable<any> {
    return this.http.post('http://localhost:8000/users/getOTP', {
      phone: `+91${phone}`,
    });
  }

  // verify otp input by the user
  verifyOTP(phone: string, otp: string): Observable<any> {
    return this.http.post('http://localhost:8000/users/verifyOTP', {
      phone: `+91${phone}`,
      otp: otp,
    });
  }

  // cost estimation
  getCost(parcelData: any): Observable<any> {
    return this.http.post(
      'http://localhost:8000/parcel/cost-estimate',
      parcelData
    );
  }

  // verify coupon
  verifyCoupon(coupon: string): Observable<any> {
    return this.http.post('http://localhost:8000/parcel/verify-coupon', {
      coupon: coupon,
    });
  }

  saveParcelData(parcelData: any): Observable<any> {
    return this.http.post(
      'http://localhost:8000/parcel/save-parcel-data',
      parcelData
    );
  }
}
