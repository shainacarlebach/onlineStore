import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import * as $AB from 'jquery';
declare var $: any

@Component({
  selector: 'app-product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.css']
})
export class ProductListViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private productService: ProductService ) { }
  currentCategory = "";
  products: any=this.productService.products;

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.currentCategory = params['category'];
        this.productService.getProductByCategory(this.currentCategory);
      }
      )
 }


// open popup box with dialog modal for product
openModal(product){
this.productService.activeProduct.data = product;
$('#myModal').modal('show');

}
  }
