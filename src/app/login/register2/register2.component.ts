import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register2, Customer } from '../../models/customer';
import { AuthenticationService } from '../../services/authentication.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})

export class Register2Component implements OnInit {
// bring in info from first form
  @Input() customer: Customer;
  register2: Register2;
  form: any;
  cities: any = [];
  message: any;
  registerFailed = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit(): void {
    this.getCity();
    this.register2 = this.authenticationService.getRegister2();
     console.log(this.register2);
    this.customer = this.authenticationService.getCustomer();
         console.log(this.customer);
  }
// get city from db
  getCity() {
    this.authenticationService.getCities()
      .subscribe(
      res => {
        this.cities = res;
        console.log(this.cities);
      },
      err => {
        this.message = err.toString();
      }
      );
  }
 //save register form as object
   save(form: any): boolean {
     if (!form.valid) {
      return false;
   }
    this.authenticationService.setRegister2(this.register2);
    return true;
  }

  //after getting all info submit register
  onSubmit(form:any) {

    if (this.save(form)) {
      const newCustomer ={
        ...this.customer, password:this.customer.password,
        city:this.register2.city.value,
        streetaddress:this.register2.streetaddress,
        name:this.register2.name,
        surname:this.register2.surname
      }

      console.log(newCustomer);

    this.authenticationService.register(
       newCustomer
                )
      .subscribe(
       res => {
         console.log(res);
         if (res.success == true) {
          this.router.navigateByUrl('/customer');
        } else {
          this.registerFailed = true;
         }
       },
       error => this.registerFailed = true
       );
  }
}
}
