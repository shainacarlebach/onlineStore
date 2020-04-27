export class Order {
  customername:string;
    city:any;
    street:string;
    deliverydate:any;
    orderdate:any;
    creditcard: any;
    cvv:string;
    expirationdate:any;

    clear(){
       this.customername='';
        this.city='';
        this.street='';
        this.deliverydate= '' ;
        this.orderdate='';
        this.creditcard ='';
        this.cvv='';
        this.expirationdate='';
    }
}

export class Shipping{
    customername:string='';
    city:any={};
    street:string='';
    deliverydate:any;
    orderdate:any;
}

export class Payment{
     creditcard:string ='';
    cvv:string='';
   expirationdate:any;
}
