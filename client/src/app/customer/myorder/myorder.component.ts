import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  updatedItem =null;
  updatedAmount :number;
  cart:any =this.productService.cart;
   searchProduct:any;
  constructor(private productService:ProductService) { }

  ngOnInit() {
     this.productService.getCart();
        }

//get total amount in cart
    cartTotal(){
     let total = 0;
     this.cart.data.forEach(item=>{
       total+=item.total;
     });
     return total;
    }
// get amount of each item in cart
    cartCount(){
      let total =0;
      this.cart.data.forEach(item=>{
      total+=item.amount;
      }
    );
    return total;
    }
  }
