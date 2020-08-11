import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import * as moment from 'moment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {

  tabElement: any;
  postsTab = false;
  followingTab = false;
  followersTabs = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  name: any;

  constructor(private route: ActivatedRoute, private userService:UserService) {
  }

  ngOnInit(): void {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.tabElement = document.querySelector('.nav-content');

    this.route.params.subscribe(params =>{
      this.name = params.name;
      this.GetUserData(this.name);
    })
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }

  GetUserData(name){
    this.userService.GetUserByName(name).subscribe(data =>{
      this.user = data.userFoundByName;
      this.posts = data.userFoundByName.posts.reverse();
      this.followers = data.userFoundByName.followers;
      this.following = data.userFoundByName.following;
    },
        err => console.log(err)
    );
  }

  ChangeTab(name) {

    if (name === 'posts') {
      this.postsTab = true;
      this.followersTabs = false;
      this.followingTab = false;
    } else if (name === 'followers') {
      this.postsTab = false;
      this.followersTabs = true;
      this.followingTab = false;
    } else if (name === 'following') {
      this.postsTab = false;
      this.followersTabs = false;
      this.followingTab = true;
    }

  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }
}
