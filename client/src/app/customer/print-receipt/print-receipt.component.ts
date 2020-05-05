
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Shipping, Order } from '../../models/order';
import { Customer } from '../../models/customer';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  order: Order;
  customerDetails: any = this.productService.customerDetails;
  lastOrder: any = this.productService.lastOrder;
  cart: any = this.productService.cart;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.productService.getLastOrderCustomer();
    this.productService.getLastOrderProducts();
  }

  //print reciept
  onPrintClick() {
    window.print();
  }



  cartTotal() {

    let total = 0;
    this.lastOrder.data.forEach(item => {
      total += item.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.lastOrder.data.forEach(item => {
      total += item.amount;
    });
    return total;
  }

  //delete contents in cart
  emptyCart() {
    this.productService.emptyCart()
    this.router.navigate(['../../about'], { relativeTo: this.route });
  }
}

