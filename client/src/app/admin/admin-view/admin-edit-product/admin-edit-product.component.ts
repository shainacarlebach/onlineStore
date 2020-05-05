import { Component, OnInit, forwardRef,Inject } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpInterceptor , HttpEvent} from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import {AuthInterceptor} from '../../../services/auth-interceptor';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import {Product} from '../../../models/product';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms'
import * as $AB from 'jquery';
import { environment } from 'src/environments/environment';
declare var $: any


@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})


export class AdminEditProductComponent implements OnInit {

  p: any = this.productService.activeProduct;
  product =new Product();
  categories: any = [];
  submitted = false;
  response: any = {};
  uploadUrl = environment.serverAddress;
  filesToUpload: Array<File>;
  image: any = '';
  showMessage: boolean =false;

  constructor(public router: Router, private http: HttpClient,
    private route: ActivatedRoute, private productService: ProductService) {
    this.filesToUpload = [];
  }


  ngOnInit(): void {
     this.getCategory();

  };

// show product image that will be changed
     public fileChangeEvent(fileInput: any) {// called each time file input changes
     this.filesToUpload = <Array<File>>fileInput.target.files;
      if (this.filesToUpload && this.filesToUpload[0].type === 'image/jpeg' ||  'image/png' ||   'image/jpg'
      && this.filesToUpload && this.filesToUpload[0].size < 200 * 200 || this.filesToUpload && this.filesToUpload[0].size < 2000000 ){
          var reader = new FileReader();
        reader.onload = (event: any)=> { // called once readAsDataURL is completed
       this.product.image = event.target.result;
        this.image ='';
    $('#preview').attr('src', event.target.result);
    console.log(this.product.image)
        } ;
                         reader.readAsDataURL(this.filesToUpload[0])
        }
     else {
          this.product.image = '';
          alert("Please upload a picture ")
     }
     }

// get all categories from db
 getCategory() {
    this.productService.getCategories()
       .subscribe(
      categories => {
         this.categories = categories;
         console.log(this.categories);

       },
       err => {
         console.log(err)
       }
       );
   }

// update product
   updateProduct(product:Product) {
     const code = this.p.data.code
     const updatedProduct ={
       code, ...this.product
           }
        this.productService.updateProduct(updatedProduct)
       .subscribe(res => {
     this.response = res;
     console.log(this.response);
    this.router.navigateByUrl('/admin/admin-view');
    this.showMessage =true;

    }
        )
  }

// submit image to db and directory
 makeFileRequest(url: string, files: Array<File>, callback) {
   const imageFile = files[0];
   return new Promise((resolve, reject) => {
   var formData: any = new FormData();
  let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data'});
  console.log("imageFile", imageFile);
  console.log("imageFile.name", imageFile.name);
   formData.append("file", imageFile, imageFile.name);
  this.http.post(url, formData)
      .subscribe(
         res => callback(this.response =res),
         err => callback(null, err)
        )
    });
   }
// validate to make sure all fields filled in
   onSubmit() {
     if(this.product.code && this.product.category && this.product.details && this.product.name && this.product.image && this.product.price){
	  this.submitted = true;
   }
else{
  this.submitted =false;
}
   }
 //send form as object
  sendForm() {
     if (this.filesToUpload.length) {
       this.makeFileRequest(this.uploadUrl + 'fileupload', this.filesToUpload, (image, errUploading) => {
    if (image) {
          console.log(image)
           this.product.image =  image
           this.updateProduct(this.product)
         }
      })
     }
   }


 }
