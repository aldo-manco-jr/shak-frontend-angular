import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postServices: PostService) { }

  ngOnInit(): void {
    this.postServices.getAllPosts().subscribe(data =>{
      console.log(data);
    })
  }

}
