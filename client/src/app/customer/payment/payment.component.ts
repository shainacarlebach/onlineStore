
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment, Order } from '../../models/order';
import { ProductService } from '../../services/product.service';
import { Observable, throwError } from 'rxjs';
import * as $AB from 'jquery';
//import { RegExp } from 'core-js/library/web/timers';
declare var $: any


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() order: Order;
  payment: Payment;
  form: any;
  orderFailed = false;
  invalid =false;
  message:string;
  receipt:boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }


  ngOnInit() {
    this.payment =this.productService.getPayment();
    console.log(this.payment);
    this.order =this.productService.getOrder();
    console.log(this.order);
   this.getExpiryDate();
  }
// expiry date of credit card
   getExpiryDate(){
     $(document).ready(() => {
       $('#expirationdate').datepicker({
         minDate: 1,
         dateFormat: "yy-mm-dd"
       }
       );
     });
   }
//validate expiry date
  checkExpiryDate(){
    this.payment.expirationdate =  $('#expirationdate').val();
    let regexp = "^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$"

          regexp.match(this.payment.expirationdate);

         return this.payment.expirationdate;
  }
// save paymet form as object
  save(form: any) {
    this.checkExpiryDate();
    this.productService.setPayment(this.payment);
   return true;
 }
 //submit info from shipping form and payment form
  onSubmit(form:any){
    if(this.save(form)){
      const newOrder={
        ...this.order, customername:this.order.customername,
        city:this.order.city,
         street:this.order.street,
        deliverydate:this.order.deliverydate,
        orderdate:this.order.orderdate
             }
           console.log(newOrder);
            this.productService.placeOrder(
              newOrder
            ).subscribe(
              res=>{
                console.log(res);
                if(res.success ==true){
            this.message= "Your order has been placed successfully! "
                      this.router.navigate(['../print_receipt'],{relativeTo:this.route});
                } else{
                  this.orderFailed =true;
                  this.message ="There was an error placing your order! "
                }
                },
                err=>this.orderFailed=true
              );
            }
          }


          }
