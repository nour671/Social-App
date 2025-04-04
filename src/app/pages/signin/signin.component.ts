import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule ,TranslatePipe , RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  private readonly toastrService =inject(ToastrService);
  private readonly usersService =inject(UsersService);
  private readonly router =inject(Router);
  isLoading:boolean = false;
  msgError:string="";
  msgSuccess:string="";

  signin:FormGroup = new FormGroup({

    email:new FormControl(null , [ Validators.required , Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),


  } )

ngAfterViewInit() {
  initFlowbite();
}

  submitForm():void {
    if(this.signin.valid){
      this.isLoading = true;
      this.usersService.signIn(this.signin.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            setTimeout(() => {
              localStorage.setItem('socialToken',res.token)
              this.usersService.getLoggedUserData
              this.router.navigate(['/timeline'])

            }, 500);
            this.msgSuccess = res.message;
          }
          this.isLoading=false;

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.msgError = err.error.message
          this.isLoading=false;

        }
      })
    }


  }





}
