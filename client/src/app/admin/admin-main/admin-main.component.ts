import { Component, OnInit,Input } from '@angular/core';
import {AuthenticationService}from '../../services/authentication.service';
import { ProductService } from '../../services/product.service';
import * as $AB from 'jquery';
declare var $: any


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
 username = '';
 user: any = this.authenticationService.user;
 searchProduct:any;

  constructor(private authenticationService: AuthenticationService,private productService: ProductService) {}

 ngOnInit() {
     this.authenticationService.getUserName();
  }
  // admin logout
 logout() {
   this.authenticationService.logout()
   .subscribe(
     () => {
       setTimeout(() => {
         console.log('timeout');
         window.location.href ='/about'
                }, 400);
     }
   );
 }

}
