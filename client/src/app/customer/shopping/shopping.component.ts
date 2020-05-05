import { Component, OnInit,Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductService } from '../../services/product.service';
import * as $AB from 'jquery';
declare var $: any

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

 constructor(private authenticationService: AuthenticationService,
  private productService: ProductService) {}

  // get cart in sidebar
 ngOnInit(){
      }
      sideBarToggle() {
        $('#sidebar').toggleClass('visible');
      }

}
