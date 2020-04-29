import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthInterceptor } from './auth-interceptor';
import { Customer } from '../models/customer';
import { Order, Shipping, Payment } from '../models/order';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart: any = { data: [] };
  username: string;
  customerDetails: any = { data: [] };
  lastOrder: any = { data: [] };
  reciept: any = { data: {} }
  products: any = { data: [] };
  search: any = { text: '' };
  url: any;
  activeProduct: any = { data: {} }
  result: boolean;
  private order: Order = new Order();
  customer: Customer;
  private isShippingFormValid: boolean = false;
  private isPaymentFormValid: boolean = false;
  product: any = {};
  response: any;
  messages: string[] = [];


  constructor(private http: HttpClient,
    public router: Router,
    private activatedRoute: ActivatedRoute) { }


  //get all products
  getAllProducts() {
    return this.http.get(environment.serverAddress + 'allProducts');
  }

  //check customer id doesn't already exist
  checkCodeNotTaken(code): Observable<any> {
    return this.http.post(environment.serverAddress + 'products/code', { code: code });
  }

  //get product by category when clicking on category/ input search box in customer/admin page
  getProductByCategory(category) {
    let url = environment.serverAddress + 'products/category/' + category;
    if (this.search.text) {
      url = environment.serverAddress + 'products/search/' + this.search.text;
    }
    this.http.get(url).subscribe(
      data => {
        this.products.data = data
      }
    )
  }
  //get product by search text input
  getProductBySearch(product) {
    if (this.search.text) {
      this.url = environment.serverAddress + 'products/search/' + this.search.text;
    }
    this.http.get(this.url).subscribe(
      data => {
        this.products.data = data
      }
    )

  }
  //get all categories
  getCategories(): Observable<any> {
    return this.http.get(environment.serverAddress + 'getCategory')
  }

  // add item to cart
  addToCart(code, amount) {
    this.http.post(environment.serverAddress + 'addToCart', { code, amount })
      .subscribe(
      cart =>
        this.cart.data = cart
      );
  }

  // get products in cart
  getCart() {
    this.http.get(environment.serverAddress + 'getCart')
      .subscribe(
      cart => this.cart.data = cart
      );
  }

  //delete one item from list
  deleteCartItem(code) {
    this.http.delete(environment.serverAddress + 'deleteCartItem/' + code)
      .subscribe(
      cart => this.cart.data = cart
      );
  }
  // delete entire cart and then call get cart to show client empty list
  deleteCart() {
    this.http.delete(environment.serverAddress + 'deleteCart')
      .subscribe(
      cart => this.cart.data = cart
      );
  }

  //update amount of an item in cart
  updateAmountInCart(code, amount) {
    this.http.put(environment.serverAddress + 'updateCart', { code, amount })
      .subscribe(
      cart => this.cart.data = cart
      );
  }

  //get customer details
  getCustomerDetails() {
    return this.http.get(environment.serverAddress + 'customer/:username')
  }
  //get customer city
  getCustomerCity() {
    return this.http.get(environment.serverAddress + 'customercity/:username')
  }
  //get dates that are unavailable
  getUnavailableDates(): Observable<any> {
    return this.http.get(environment.serverAddress + 'getUnavailableDates')
  }

  //get order info
  getShipping(): Shipping {
    var shipping: Shipping = {
      customername: this.order.customername,
      city: this.order.city,
      street: this.order.street,
      deliverydate: this.order.deliverydate,
      orderdate: this.order.orderdate
    };
    return shipping;
  }

  // set shipping info
  setShipping(data: Shipping) {
    this.isShippingFormValid = true;
    this.order.customername = data.customername;
    this.order.city = data.city;
    this.order.street = data.street;
    this.order.deliverydate = data.deliverydate;
    this.order.orderdate = data.orderdate;
  }

  //get payment info as object
  getPayment(): Payment {
    var payment: Payment = {
      creditcard: this.order.creditcard,
      cvv: this.order.cvv,
      expirationdate: this.order.expirationdate
    };
    return payment;
  }

  // set payment info
  setPayment(data: Payment) {
    this.order.creditcard = data.creditcard;
    this.order.cvv = data.cvv,
      this.order.expirationdate = data.expirationdate
  }

  //get cities
  getCities(): Observable<any> {
    return this.http.get(environment.serverAddress + 'cities');
  }

  //get order
  getOrder(): Order {
    return this.order;
  }
  //insert new order
  placeOrder(neworder: any): Observable<any> {
    return this.http.post(environment.serverAddress + 'placeOrder', neworder)
  }

  //get customer details for receipt
  getLastOrderCustomer() {
    this.http.get(environment.serverAddress + 'lastOrderCustomer')
      .subscribe(
      customerDetails => this.customerDetails.data = customerDetails
      )
  }
  //get products for receipt
  getLastOrderProducts() {
    this.http.get(environment.serverAddress + 'lastOrderProducts')
      .subscribe(
      lastOrder => this.lastOrder.data = lastOrder

      )
  }
  //empty cart after sent receipt
  emptyCart() {
    this.http.delete(environment.serverAddress + 'deleteCartafterReciept')
      .subscribe(
      cart => this.cart.data = cart
      )
  }

  //show all orders on home page
  getAllOrders() {
    return this.http.get(environment.serverAddress + 'allOrders')
  }

// get all details of product to see if code exists already
  getProductDetails(code) {
    return this.http.get(environment.serverAddress + 'product/:code' + code)
  }

  // update product
  updateProduct(newproduct): Observable<any> {
    return this.http.put(environment.serverAddress + 'updateProduct/:code', newproduct)
  }

  // add product
  addProduct(newproduct): Observable<any> {
    return this.http.post(environment.serverAddress + 'addProduct', newproduct)
  }

 }
