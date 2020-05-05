import { Component, OnInit } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Product } from '../../../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as $AB from 'jquery';
// import { RegExp } from 'core-js/library/web/timers';
declare var $: any


@Component({
  selector: 'app-admin-create-product',
  templateUrl: './admin-create-product.component.html',
  styleUrls: ['./admin-create-product.component.css']
})
export class AdminCreateProductComponent implements OnInit {

  products = [];
  searchProduct: any;
  p: any = this.productService.activeProduct;
  product = new Product();
  categories: any = [];
  currentCategory: any;
  uploadUrl = environment.serverAddress;
  filesToUpload: Array<File>;
  image: any = '';
  showMessage: boolean = false;
  response: any = {};
  submitted = false;
  sidebarVisible = true;

  constructor(private productService: ProductService, private http: HttpClient, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (products: any) => {
        this.products = products;
      })
    this.getCategory();
  }

  getCategory() {
    this.productService.getCategories()
      .subscribe(
        categories => {
          this.categories = categories;
          console.log(this.categories);
        },
        err => {
          console.log(err.toString());
        }
      );

  }



  public fileChangeEvent(fileInput: any) {// called each time file input changes
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload && this.filesToUpload[0].type === 'image/jpeg' || 'image/png' || 'image/jpg'
      && this.filesToUpload && this.filesToUpload[0].size < 200 * 200 || this.filesToUpload && this.filesToUpload[0].size < 2000000) {
      var reader = new FileReader();
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.product.image = event.target.result;
        this.image = '';
        $('#preview').attr('src', event.target.result);
        console.log(this.product.image)
      };
      reader.readAsDataURL(this.filesToUpload[0])
    }
    else {
      this.product.image = '';
      alert("Please upload a picture ")
    }
  }

  makeFileRequest(url: string, files: Array<File>, callback) {
    const imageFile = files[0];
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
      console.log("imageFile", imageFile);
      console.log("imageFile.name", imageFile.name);
      formData.append("file", imageFile, imageFile.name);
      this.http.post(url, formData)
        .subscribe(
          res => callback(this.response = res),
          err => callback(null, err)
        )
    });
  }

  // make sure all fields are filled
  onSubmit() {
    if (this.product.code && this.product.category && this.product.details && this.product.name && this.product.image && this.product.price) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
    }
  }

  sendForm() {
    if (this.filesToUpload.length) {
      this.makeFileRequest(this.uploadUrl + 'fileupload', this.filesToUpload, (image, errUploading) => {
        if (image) {
          console.log(image)
          this.product.image = image
          this.addProduct(this.product)
        }
      })
    }
  }
  // add new product to db
  addProduct(product: Product) {
    const newProduct = {
      ...this.product
    }
    this.productService.addProduct(newProduct)
      .subscribe(id => {
        console.log(id);
        this.router.navigateByUrl('/admin');
        this.showMessage = true;
      }
      )
  }

  toggleVisible() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
