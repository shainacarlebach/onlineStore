import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customermain',
  templateUrl: './customermain.component.html',
  styleUrls: ['./customermain.component.css']
})

export class CustomermainComponent implements OnInit {
  username = '';
  user: any = this.authenticationService.user;

  constructor(private authenticationService: AuthenticationService, private productService: ProductService,
    private router: Router,private route: ActivatedRoute) { }

  cart: any = this.productService.cart;

  //get username and inner join to cart table on login/sign in
  ngOnInit() {
    this.authenticationService.getUserName();
     this.productService.getCart();
     }

     //logout
  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        setTimeout(() => {
          console.log('timeout');
        window.location.href ='/about'
                 }, 400);
      }
    );
  }
}
