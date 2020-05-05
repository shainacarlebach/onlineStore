import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {ProductService} from'../../services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private productService:ProductService) { }

  user: any = this.authenticationService.user;
  cart:any =this.productService.cart;
  customerDetails:any =this.productService.customerDetails;

  //get username and inner join to cart table on login/sign in
  ngOnInit() {
    this.authenticationService.getUserName();
    this.productService.getCart();
    this.productService.getLastOrderCustomer();
     }

   deleteCart(){
     this.productService.deleteCart();
   }

   cartTotal() {
let total = 0;
this.cart.data.forEach(item=>{
  total +=item.total;
});
return total;
   }

   cartCount(){
let total =0;
this.cart.data.forEach(item=>{
  total+=item.amount;
});
return total;
}

}
