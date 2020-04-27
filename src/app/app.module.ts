import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';
import { AuthInterceptor } from './services/auth-interceptor';

import { map } from 'rxjs/operators';

import { loginFormComponent } from './login/loginform/loginform.component';
import { RegisterComponent } from './login/register/register.component';
import { AboutComponent } from './login/about/about.component';
import { Register2Component } from './login/register2/register2.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';

import { ExistingIdValidatorDirective } from './login/register/existingidvalidator.directive';
import { ExistingNameValidatorDirective } from './login/register/existingnamevalidator.directive';
import { ShoppingComponent } from './customer/shopping/shopping.component';
import { CategoriesComponent } from './customer/shopping/categories/categories.component';
import { CartComponent } from './customer/shopping/cart/cart.component';
import { SingleProductComponent } from './customer/shopping/single-product/single-product.component';
import { CustomermainComponent } from './customer/customermain/customermain.component';
import { ProductListViewComponent } from './customer/shopping/product-list-view/product-list-view.component';
import { WelcomeComponent } from './customer/welcome/welcome.component';
import { ShippingComponent } from '../app/customer/shipping/shipping.component';
import { PaymentComponent } from '../app/customer/payment/payment.component';
import { MyorderComponent } from '../app/customer/myorder/myorder.component';
import { SearchTextPipe } from './search-text.pipe';
import { PrintReceiptComponent } from '../app/customer/print-receipt/print-receipt.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AdminEditProductComponent } from './admin/admin-view/admin-edit-product/admin-edit-product.component';
import { AdminCategoriesComponent } from './admin/admin-view/admin-categories/admin-categories.component';
import { AdminProductViewComponent } from './admin/admin-view/admin-product-view/admin-product-view.component';
import { AdminCreateProductComponent } from './admin/admin-view/admin-create-product/admin-create-product.component';
import { ExistingcodevalidatorDirective } from './admin/admin-view/admin-create-product/existingcodevalidator.directive';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    loginFormComponent,
    RegisterComponent,
    AboutComponent,
    Register2Component,
    DashboardComponent,
    ExistingIdValidatorDirective,
    ExistingNameValidatorDirective,
    ShoppingComponent,
    CategoriesComponent,
    CartComponent,
    SingleProductComponent,
    WelcomeComponent,
    CustomermainComponent,
    ProductListViewComponent,
    WelcomeComponent,
    ShippingComponent,
    PaymentComponent,
    MyorderComponent,
    SearchTextPipe,
    PrintReceiptComponent,
    AdminMainComponent,
    AdminViewComponent,
    AdminEditProductComponent,
    AdminCategoriesComponent,
    AdminProductViewComponent,
    AdminCreateProductComponent,
    ExistingcodevalidatorDirective,
    AdminWelcomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  providers: [ AuthenticationService, ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [SingleProductComponent]
})
export class AppModule { }
