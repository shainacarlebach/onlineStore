import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loginFormComponent } from './login/loginform/loginform.component';
import { RegisterComponent } from './login/register/register.component';
import { AboutComponent } from './login/about/about.component';
import { Register2Component } from './login/register2/register2.component';
import { DashboardComponent } from './login/dashboard/dashboard.component';

import { CustomermainComponent } from './customer/customermain/customermain.component';
import {WelcomeComponent} from'./customer/welcome/welcome.component';
import { ShoppingComponent } from './customer/shopping/shopping.component';
import { CartComponent } from 'src/app/customer/shopping/cart/cart.component';
import{ ShippingComponent} from '../app/customer/shipping/shipping.component';
import {PaymentComponent} from '../app/customer/payment/payment.component';
import {MyorderComponent} from '../app/customer/myorder/myorder.component';
import {PrintReceiptComponent} from '../app/customer/print-receipt/print-receipt.component';

import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import {AdminViewComponent} from './admin/admin-view/admin-view.component' ;
import { AdminEditProductComponent} from'./admin/admin-view/admin-edit-product/admin-edit-product.component';
import { AdminProductViewComponent} from'./admin/admin-view/admin-product-view/admin-product-view.component';
import { AdminCreateProductComponent} from'./admin/admin-view/admin-create-product/admin-create-product.component';
import {AdminWelcomeComponent} from './admin/admin-welcome/admin-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: loginFormComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'address',
        component: Register2Component,
      },
      {
        path: 'logout',
        component: loginFormComponent
      }
    ]
  },

  {
    path: 'customer',
    component: CustomermainComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
        {
          path: 'shopping/:category',
          component: ShoppingComponent,
        },
       {  path: 'shopping',
        redirectTo: 'shopping/1',
        pathMatch: 'full'
        },
             {
        path: 'myorder',
        component: MyorderComponent,
             },

           {
              path: 'payment',
               component: PaymentComponent
             },
            {
              path: 'shipping',
              component: ShippingComponent
            },
         {
              path: 'print_receipt',
              component: PrintReceiptComponent
            }
          ],
        },

  {
    path: 'admin',
    component: AdminMainComponent,
     children: [
      {
        path: '',
        component: AdminWelcomeComponent,
      },
              {
         path: 'admin-view/:category',
      component: AdminViewComponent
      },
      { path: 'admin-view',
        redirectTo: 'admin-view/1',
        pathMatch: 'full'
        },
           {
    path:'newProduct',
    component:AdminCreateProductComponent
  },
{
  path:'products',
  component:AdminProductViewComponent
}
       ]
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{relativeLinkResolution: 'corrected'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
