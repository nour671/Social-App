import { TranslatePipe } from '@ngx-translate/core';
import { AfterViewInit, ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UsersService } from '../../core/services/users/users.service';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink , RouterLinkActive , TranslatePipe , CommonModule] ,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly toastrService =inject(ToastrService);
  private readonly cdr = inject(ChangeDetectorRef)

  // private readonly myTranslateService = inject(MyTranslateService);
  // currentLang: 'en' | 'ar' = 'en';
  isDarkMode: boolean = false;
  savedImage!:File;
  // userData: any = null;
  userData = this.usersService.userData;


  isLogin = input<boolean>(true);
  ngOnInit(): void {


  }


  ngAfterViewInit() {
    initFlowbite();


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyTheme();
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
      this.applyTheme();
    }
  }

  // changeLanguage() {
    // this.myTranslateService.changeLangTranslate(lang)
  //   this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';


  //   this.myTranslateService.changeLangTranslate(this.currentLang);
  // }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }



  uploadProfilePhoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      this.usersService.uploadProfilePhoto(formData).subscribe({
        next: (res) => {
          console.log('Upload Photo Response:', res);
          this.toastrService.success('Profile photo updated successfully');


          this.loadUserData();

        },
        error: (err) => {
          console.error('Error uploading profile photo:', err);
          this.toastrService.error('Failed to upload profile photo');
        }
      });
    }
  }





  private loadUserData(): void {
    this.usersService.getLoggedUserData().subscribe({
      next: (res) => {
        this.userData = res.user;
        console.log('User Data:', this.userData);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.toastrService.error('Failed to load user data');
      }
    });
  }

  signOut(): void {
    this.usersService.signOut();
  }
}
