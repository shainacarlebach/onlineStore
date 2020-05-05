import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: any = [];
  currentCategory = 1;
  product: any;
   search: any = this.productService.search;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  // get products by category param
  ngOnInit() {
         this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(categories);
      }
    );
         }
// call service to get product when customer enters search text
getProduct() {
  this.productService.getProductByCategory(this.currentCategory)
}



}
