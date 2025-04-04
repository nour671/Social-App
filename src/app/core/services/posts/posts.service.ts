import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private httpClient : HttpClient) { }

  createPost( data:any):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/posts` , data)

      }

  getAllPosts():Observable<any> {
        return this.httpClient.get(`${environment.baseUrl}/posts?limit=50`)
      }
  getMyPosts():Observable<any> {
        return this.httpClient.get(`${environment.baseUrl}/users/664bcf3e33da217c4af21f00/posts?limit=200`)
      }
  getSinglePosts( postId: string):Observable<any> {
        return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`)
      }
  updatePosts( postId: string ,data:object):Observable<any> {
        return this.httpClient.put(`${environment.baseUrl}/posts/${postId}` , data)
      }
  deletePosts( postId: string ,data:object):Observable<any> {
        return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}` , data)
      }
}
