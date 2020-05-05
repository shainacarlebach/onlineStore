
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {ProductService} from'../../services/product.service';


@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private productService:ProductService) { }

  user: any = this.authenticationService.user;
  ngOnInit() {
    this.authenticationService.getUserName();
  }

}
