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
  
  ]},
  {path:'',component:BlankLayoutComponent , canActivate:[authGuard] ,children:[
    {path:'timeline',loadComponent:()=>import('./pages/timeline/timeline.component').then((c)=>c.TimelineComponent)  ,title:'timeline'},
    {path:'profile',loadComponent:()=>import("./pages/profile/profile.component").then((c)=>c.ProfileComponent) ,title:'profile'},
    {path:'**',component:NotfoundComponent}
  ]},
];

