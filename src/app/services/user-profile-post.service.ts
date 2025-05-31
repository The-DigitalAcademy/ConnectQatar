import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface Post{
  id:string;
  title:string;
  image:string;
  userId:string;
}

interface PostData{
  post : Post[];
}

@Injectable({
  providedIn: 'root'
})
export class UserProfilePostService {

  constructor(private http:HttpClient) { }

  getUserPosts(): Observable <Post[]>{
    const loginUser = localStorage.getItem('currentUser');
    let userId : string | null = null;

    if(loginUser){
      const user= JSON.parse(loginUser);
       userId = user.id;
    }

    return this.http.get<PostData>('http://localhost:3000/posts').pipe(
      map(data => data.post.filter(post => post.userId === userId))
    );
  }
}
