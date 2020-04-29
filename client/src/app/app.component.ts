import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlineStore';
  productsCount: number;
  ordersCount: number;

  constructor(private productService: ProductService) { }

  // get amount od products and orders in shop
  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.productsCount = data.length
        if (this.productsCount === 0) {
          this.productsCount = 0
        }
      })

    this.productService.getAllOrders().subscribe(
      (data: any) => {
        this.ordersCount = data.count
      });
  }
}

