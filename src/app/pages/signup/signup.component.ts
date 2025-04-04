import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { UsersService } from './../../core/services/users/users.service';
import { DatepickerOptions } from './../../../../node_modules/flowbite-datepicker/node_modules/flowbite/lib/cjs/components/datepicker/types.d';
import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule ,TranslatePipe , RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements AfterViewInit {
  private readonly router =inject(Router);
  private readonly usersService = inject (UsersService);
  // private readonly flowbiteService = inject(FlowbiteService)

  ngAfterViewInit() {
    initFlowbite();
  }

  isLoading:boolean = false;
  msgError:string="";
  msgSuccess:string="";

  signUpForm:FormGroup = new FormGroup({
    name:new FormControl(null ,[ Validators.required ,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null , [ Validators.required , Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl(null ,[Validators.required]),
    dateOfBirth:new FormControl(null ,[Validators.required ,]),
    gender:new FormControl(null ,[Validators.required ,]),
  },{ validators:this.confirmPassword ,})

  confirmPassword(group:AbstractControl){

    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : {'mismatch':true};

  }





  submitForm():void {
    if(this.signUpForm.valid){
      this.isLoading = true;
      this.usersService.signUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          console.log("hhhh");
          if(res.message === 'success'){
            setTimeout(() => {
              this.router.navigate(['/signin'])

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
    }else{
      this.signUpForm.markAllAsTouched();
    }


  }


}



