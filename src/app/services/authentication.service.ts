import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthInterceptor} from './auth-interceptor';
import { Customer, Register, Register2 } from '../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: any = { data: {} };
  customer: Customer = new Customer();
  private isRegisterFormValid: boolean = false;
  private isRegister2FormValid: boolean = false;
  isTakenId: false;

  constructor(private http: HttpClient,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  //login new user
  login(username: string, password: string) {
    return this.http.post(environment.serverAddress + 'login', { username: username, password: password })
    .pipe(map(response=>{
      if(response){
           localStorage.setItem('tokenid',JSON.stringify(response));
       console.log(response);
      }
      return response;

    }))  }
//get user name
  getUserName() {
    return this.http.get(environment.serverAddress + 'user')
      .subscribe(
      user => this.user.data = user,
      err => { this.router.navigateByUrl('/login'); }
      );
  }
//check customer id doesn't already exist
  checkCustomerIdNotTaken(id): Observable<any> {
    return this.http.post(environment.serverAddress + 'customer/id', { id: id });
  }
//check customer name doesn't already exist
  checkCustomerNameNotTaken(username: string): Observable<any> {
    return this.http.post(environment.serverAddress + 'customer/name', { username: username });
  }
// get all customers
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.serverAddress + 'customers');
  }

  // get cities
  getCities(): Observable<any> {
    return this.http.get(environment.serverAddress + 'cities');
  }

  // get register info
  getRegister(): Register {
    // Return the Register data
    var register: Register = {
      id: this.customer.id,
      username: this.customer.username,
      email: this.customer.email,
      password: this.customer.password,
      cnfpass: this.customer.cnfpass,
      role:this.customer.role
    };
    return register;
  }
// set register info
  setRegister(data: Register) {
    // Update the Personal data only when the Personal Form had been validated successfully
    this.isRegisterFormValid = true;
    this.customer.id = data.id;
    this.customer.username = data.username;
    this.customer.email = data.email;
    this.customer.password = data.password;
    this.customer.cnfpass = data.cnfpass;
    this.customer.role =data.role;
  }

  getRegister2(): Register2 {
    // Return the register2 data
    var register2: Register2 = {
      city: this.customer.city,
      streetaddress: this.customer.streetaddress,
      name: this.customer.name,
      surname: this.customer.surname
    };
    return register2;
  }

  setRegister2(data: Register2) {
    // Update the register2 data only when the register2 Form had been validated successfully
    this.customer.city = data.city;
    this.customer.streetaddress = data.streetaddress;
    this.customer.name = data.name;
    this.customer.surname = data.surname;
  }

  getCustomer(): Customer {
    // Return the entire Form Data
    return this.customer;
  }
//register new customer
  register(newcustomer: any): Observable<any> {
        return this.http.post(environment.serverAddress + 'register', newcustomer);
  }

//logout
  logout() {
    return this.http.get(environment.serverAddress + 'logout')

  }

}
