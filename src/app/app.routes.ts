import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { authGuard } from './core/guards/auth/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';


export const routes: Routes = [
  {path:'',redirectTo:'timeline',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent, canActivate:[loggedGuard] ,children:[
    {path:'signin',loadComponent:()=>import("./pages/signin/signin.component").then((c)=>c.SigninComponent) ,title:'signin'},
    {path:'signup',loadComponent:()=>import("./pages/signup/signup.component").then((c)=>c.SignupComponent) ,title:'signup'},
  //   {path:'forget',loadComponent:()=>import("./pages/forgetpassword/forgetpassword.component").then((c)=>c.ForgetpasswordComponent) ,title:'forget'},
  ]},
  {path:'',component:BlankLayoutComponent , canActivate:[authGuard] ,children:[
    {path:'timeline',loadComponent:()=>import('./pages/timeline/timeline.component').then((c)=>c.TimelineComponent)  ,title:'timeline'},
    {path:'profile',loadComponent:()=>import("./pages/profile/profile.component").then((c)=>c.ProfileComponent) ,title:'profile'},
    // {path:'products',loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent) ,title:'products'},
    // {path:'allorders',loadComponent:()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent) ,title:'products'},
    // {path:'allorders/:id',loadComponent:()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent) ,title:'products' },
    // {path:'brands',loadComponent:()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent) ,title:'brands'},
    // {path:'categories',loadComponent:()=>import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent) ,title:'categories'},
    // {path:'checkout/:id',loadComponent:()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent) ,title:'checkout'},
    // {path:'details/:id',loadComponent:()=>import("./pages//details/details.component").then((c)=>c.DetailsComponent) ,title:'details' },
    {path:'**',component:NotfoundComponent}
  ]},
];

