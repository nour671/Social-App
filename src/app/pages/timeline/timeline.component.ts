import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject, OnInit, input } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../shared/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/components/ui/comments/comments.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentsComponent , FormsModule , TranslatePipe],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  postList:IPost[]=[];
  content:string ='';
  savedFile!:File;
  isLoading:boolean= false;
  isModalOpen:boolean = false;

  ngOnInit(): void {
      this.postsService.getAllPosts().subscribe({
        next:(res)=>{
          console.log(res);
          console.log(res.posts);
          this.postList= res.posts;

        },
        error:(err)=>{
          console.log(err);

        }
      })
  }

  changeImage(e:Event){

    const input = e.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.savedFile = input.files[0];

    }


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



  }




