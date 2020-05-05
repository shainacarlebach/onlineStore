import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Product } from '../../../models/product';
import { environment } from 'src/environments/environment';
import { AdminEditProductComponent } from '../admin-edit-product/admin-edit-product.component';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import * as $AB from 'jquery';
declare var $: any

@Component({
  selector: 'app-admin-product-view',
  templateUrl: './admin-product-view.component.html',
  styleUrls: ['./admin-product-view.component.css']
})
export class AdminProductViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private productService: ProductService,private http: HttpClient, public router: Router ) { }
  currentCategory :any;
  products :any=this.productService.products;
  categories: any = [];
  product = new Product();
  search: any = this.productService.search;

  ngOnInit() {
    this.route.params
    .subscribe(
    (params: Params) => {
      this.currentCategory = params['category'];
      this.productService.getProductByCategory(this.currentCategory);
    }
    )
}
//open popup box with dialog modal to update product
openModal(product){
  this.productService.activeProduct.data = product;
  $('#myModal').modal('show');
  $('input[type=text]').val('');
  $('#details').val('');
  $('#category').val('');
}

  }


