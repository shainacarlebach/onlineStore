
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as $AB from 'jquery';
declare var $: any

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  amount:number;
  product: any = this.productService.activeProduct;

  constructor(  public router: Router,
    private activatedRoute: ActivatedRoute,private productService: ProductService) {
         }

  ngOnInit() {
  }
// add item/s to cart
  addToCart() {
        this.productService.addToCart(this.product.data.code, this.amount );
  }


}
