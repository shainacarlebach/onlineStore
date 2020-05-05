import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Shipping, Order } from '../../models/order';
import { Customer } from '../../models/customer';
import { Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import * as $AB from 'jquery';
// import { RegExp } from 'core-js/library/web/timers';
declare var $: any

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})

export class ShippingComponent implements OnInit {
  form: any;
  paymentForm: any;
  shipping: Shipping = new Shipping();
  customerDetails: any = { data: {} };
  unavailableDates: any = [];
  today = new Date();
  currentdate :any;
  invalid = false;
  message: string;
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,

  ) {
        this.currentdate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530')
  }

  // disable all previous days, weekends and 3 dates already booked from database on  jquery calendar
  disableNonWorkingDays(date) {
    if (date.getDay() >= 6) return [false, 'weekend'];
    const formattedDate = `${date.getFullYear()}-${t2d(date.getMonth() + 1)}-${t2d(date.getDate())}`;
    if (this.unavailableDates.includes(formattedDate)) return [false, 'taken'];
    return [true, ''];
  }


  ngOnInit() {
    this.shipping = this.productService.getShipping();
    console.log(this.shipping)
    this.productService.getCustomerDetails();
    this.getTakenDates();

  }
// get customer details from db
  getCustomerName() {
    this.productService.getCustomerDetails()
      .subscribe(
      customer => {
        this.customerDetails.data = customer[0].username;
        this.shipping.customername = this.customerDetails.data;
        return this.shipping.customername;
      }
      )
  }

  getCustomerStreet() {
    this.productService.getCustomerDetails()
      .subscribe(
      customer => {
        this.customerDetails.data = customer[0].streetaddress;
        this.shipping.street = this.customerDetails.data;
        return this.shipping.street;
      }

      )
  }


  getCustomerCity() {
    this.productService.getCustomerCity()
      .subscribe(
      city => {
        this.shipping.city = city[0].name;
        console.log(this.shipping.city);
      }
      )
  }

  // get unavailable dates

  getTakenDates() {
    this.productService.getUnavailableDates().
      subscribe(
      dates => {
        this.unavailableDates = dates.map(item => item.delivery_date);
        this.initDatePicker();
      })
  }
// disallow days that can't ship
  initDatePicker() {
    $(document).ready(() => {
      $('#deliverydate').datepicker({
        beforeShowDay: this.disableNonWorkingDays.bind(this),
        minDate: 1, maxDate: "+2M",
        dateFormat: "yy-mm-dd"
      }
      );
    });
  }
// get delivery date
  getDeliveryDate() {
   this.shipping.deliverydate = $('#deliverydate').val()

      let regexp ="/^\d{4}-\d{2}-\d{2}$/"
      regexp.match(this.shipping.deliverydate);

     return this.shipping.deliverydate;
  }
getCurrentDate(){
  this.shipping.orderdate = this.currentdate;
  return this.shipping.orderdate;
}
// save shipping form as object
  save(form: any) {
    this.getDeliveryDate();
    this.getCurrentDate();
    this.productService.setShipping(this.shipping);
    return true;
  }

  goToNext(form: any) {
    if (this.save(form)) {
      console.log(this.shipping);
      this.router.navigate(['../payment'],{relativeTo:this.route})
    }
  }
}
// month cannot exceed 10
function t2d(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
