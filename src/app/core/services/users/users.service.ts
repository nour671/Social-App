import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private httpClient:HttpClient) { }
  userData:any = null;
  private readonly router =inject(Router);

  signUp( data:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/users/signup` , data)

  }
  signIn( data:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/users/signin` , data)

  }
  changePassword( data:string):Observable<any>{
    return this.httpClient.patch(`${environment.baseUrl}/users/change-password` , data)

  }
  uploadProfilePhoto( data:any):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo` , data)

  }
  getLoggedUserData( ):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/users/profile-data` )

  }


  signOut():void{
    localStorage.removeItem('socialToken');
    this.userData=null;

    this.router.navigate(['/signin']);

  }
}

















