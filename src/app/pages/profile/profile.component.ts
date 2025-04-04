import { User } from './../../shared/interfaces/ipost';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from '../../shared/components/ui/comments/comments.component';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { initFlowbite } from 'flowbite';
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../shared/interfaces/ipost';
import { CommentsService } from '../../core/services/comments/comments.service';
import { IComment } from '../../shared/interfaces/icomment';

@Component({
  selector: 'app-profile',
  imports: [ TranslatePipe , DatePipe, CommentsComponent , FormsModule ,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {
  private readonly toastrService =inject(ToastrService);
  private readonly usersService =inject(UsersService);
  private readonly postsService =inject(PostsService);
  private readonly commentsService =inject(CommentsService);
  private readonly router =inject(Router);
  private readonly cdr = inject(ChangeDetectorRef)

  postList: IPost[] = [];
  commentList: IComment[] = [];
  userData: any = null;

  ngAfterViewInit() {
    initFlowbite();
  }
  ngOnInit(): void {
    this.loadUserData();
    this.loadPosts();

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

  private loadPosts(): void {
    this.postsService.getMyPosts().subscribe({
      next: (res) => {

        console.log('Posts Response:', res);
        this.postList = res.posts || [];
        console.log('3dd post:', this.postList.length);
        this.postList.forEach(post => {
          this.commentsService.getPostComments(post._id).subscribe({
            next: (res) => {


              console.log(`Comments for post ${post._id}:`, res);
              const comments = res.comments || [];
              console.log('3ddd comment' , this.commentList.length);
              const userComments = comments.filter((comment: IComment) => comment.commentCreator._id === this.userData._id);
              this.commentList = [...this.commentList, ...userComments];
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error(`Error fetching comments for post ${post._id}:`, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
        this.toastrService.error('Failed to load posts');
      }
    });
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


          this.loadPosts();
        },
        error: (err) => {
          console.error('Error uploading profile photo:', err);
          this.toastrService.error('Failed to upload profile photo');
        }
      });
    }
  }
}











