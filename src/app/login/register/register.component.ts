import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { TakenIdValidator } from './idvalidator';
import { TakenNameValidator } from './namevalidator';
import { AuthenticationService } from '../../services/authentication.service';
import { Register, Customer } from '../../models/customer';
import { Observable, throwError } from 'rxjs';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: any;
    register: Register;
    pattern = "^[0-9]{1,9}$";
    roles = ['customer', 'manager'];

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.register = this.authenticationService.getRegister();
        console.log(this.register);
    }
// validate confirm password field
    validatecnfpassValue() {
        return !this.register.cnfpass || this.register.password === this.register.cnfpass;
    }
// save register form as object
    save(form: any): boolean {
        if (!form.valid ) {
            return false;
        }
        this.authenticationService.setRegister(this.register);
        return true;
    }
    //send to second form if all details are correct
    goToNext(form: any) {

        if (this.save(form)) {
            console.log(this.register);
            this.router.navigateByUrl('/address');
        }
    }
}
