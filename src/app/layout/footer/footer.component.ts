import { PostsService } from './../../core/services/posts/posts.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPost } from '../../shared/interfaces/ipost';
import { UsersService } from '../../core/services/users/users.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ TranslatePipe , FormsModule , CommonModule , RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit  {
  private readonly postsService = inject(PostsService);
  private readonly usersService = inject(UsersService)
   posList:IPost[]=[];
    content:string ='';
    savedFile!:File;
    isLoading:boolean= false;
    isModalOpen:boolean = false;
    // userData = this.usersService.userData; 

  ngOnInit(): void {


  }

  createPost():void{

    this.isLoading = true;

    const formData = new FormData ();
    if(this.content){
      formData.append('body' , this.content);

    }
    if(this.savedFile){
      formData.append('image',this.savedFile);

    }



    this.postsService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);

        // this.posList = res.posts || [];
        this.content = ''; // Reset the content
        this.isLoading = false;
        const modal = document.getElementById('static-modal');

        if(modal){
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        window.location.reload();


        }

      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    });


    }

  signOut():void {
    this.usersService.signOut();

  }

}
