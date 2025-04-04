import { Comment } from './../../../interfaces/ipost';
import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { log } from 'util';
import { IComment } from '../../../interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DatePipe , ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService)

  postId:InputSignal<any> = input.required();
  commentList :IComment []=[];
  commentForm !:FormGroup ;
  isLoading: boolean = false;



  ngOnInit(): void {
    this.commentsService.getPostComments(this.postId()).subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.comments);
        this.commentList = res.comments;

      },
      error:(err)=>{
        console.log(err);

      }
    })

    this.commentForm = new FormGroup({
      content: new FormControl(null ,[Validators.required]),
      post:new FormControl(this.postId())


    });

  }

  addComment ():void{
    this.isLoading =true;
    this.commentsService.createComment(this.commentForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        this.commentList = res.comments;
        this.commentForm.reset({ post: this.postId() });
        this.isLoading = false;

      },
      error:(err)=>{
        console.log(err);
        this.isLoading=false;

      }
    })
  }

}
