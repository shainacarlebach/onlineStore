export class Customer {
  id: any;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  cnfpass: string;
  city: string;
  streetaddress: string;
  role: string;



clear() {
 this.id= '';
  this.name='';
  this.surname ='';
  this.username='';
  this.email='';
  this.password='';
  this.cnfpass ='';
  this.city='';
  this.streetaddress='';
  this.role='';
  }
}


export class Register {
  id: any ='';
  username: string='';
  email: string='';
  password: string='';
  cnfpass: string ='';
  role: string= '';
}

export class Register2 {
  city: any ={} ;
  streetaddress: string='';
  name: string='';
  surname: string='';
}



