import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Customer } from '../../models/customer';
import { Observable, throwError } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-loginform',
    templateUrl: './loginform.component.html',
    styleUrls: ['./loginform.component.css']
})
export class loginFormComponent implements OnInit {
    loginForm: FormGroup;
    username: FormControl;
    password: FormControl;
    customer: Customer;
    user: any = {};
    loginFailed = false;

    constructor(
        private formBuilder: FormBuilder,
        public router: Router,
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }
//validate username and password
    createFormControls() {
        this.username = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
        this.password = new FormControl('', [Validators.required,
        Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]);
    }

    createForm() {
        this.loginForm = new FormGroup({
            username: this.username,
            password: this.password
        });
    }
    //login user or admin
    onSubmit() {
        if (this.loginForm.valid) {
            this.user = this.authenticationService.login(this.username.value, this.password.value)
                .pipe(first())
                .subscribe(response => {
                    this.user = response;
                    console.log(this.user);
                    if (this.user.role === "customer") {
                        this.router.navigateByUrl('/customer');
                    } else if (this.user.role === "manager") {
                        this.router.navigateByUrl('/admin');
                    }
                },
                error => {
                    this.loginFailed = true;
                }
                );
        }
    }
//send to register if not logged in
    movetoregister() {
        this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
    }


}


