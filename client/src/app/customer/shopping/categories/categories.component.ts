import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  categories: any = [];
  product: any;
  currentCategory = 1;
  search: any = this.productService.search;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

// get products by category param
  ngOnInit() {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(categories);
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.currentCategory = params['category'];

           });
  }
  // call service to get product when customer enters search text
  getProduct() {
    this.productService.getProductByCategory(this.currentCategory)
  }



}
