import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 cartVisible =true;
 updatedItem =null;
 updatedAmount :number;

  constructor( private productService:ProductService) {}

  cart: any =this.productService.cart;

  ngOnInit() {
  this.productService.getCart();
    }
    // see cart page
 toggleVisible(){
   this.cartVisible =!this.cartVisible;
 }
  cartTotal() {
    let total =0;
    this.cart.data.forEach(item=>{
      total+=item.total;
    });
    return total;
  }
cartCount(){
  let total = 0;
  this.cart.data.forEach(item=>{
    total+=item.amount;
  });
  return total;
}

// delete entire cart
deleteCart(){
  this.productService.deleteCart();
}
// update amount/s in cart
updateAmount(){
  this.productService.updateAmountInCart(this.updatedItem.code,this.updatedAmount)
    }
// delete item from cart
    deleteItem(item){
  this.productService.deleteCartItem(item.code);
}

}
