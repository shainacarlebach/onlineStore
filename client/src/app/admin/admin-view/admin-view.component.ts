import { Component, OnInit,Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductService } from '../../services/product.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import * as $AB from 'jquery';
 declare var $: any;

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
   navbarOpen =false;
  constructor(private authenticationService: AuthenticationService,
    private productService: ProductService){}

     ngOnInit() { }

 toggleNavbar() {
   this.navbarOpen = !this.navbarOpen;
  }
  //toggle to get create product form
 sidebarToggle(){
 $(document).ready(function () {
   $('#sidebarCollapse').on('click', function () {
   $('#sidebar').toggleClass('active');
   $(this).toggleClass('active');
 });
 });
 }
}
