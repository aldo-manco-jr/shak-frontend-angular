import {TokenService} from "../services/token.service";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import {ToolbarComponent} from "../components/toolbar/toolbar.component";
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import {PostService} from "../services/post.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CommentsComponent } from '../components/comments/comments.component';
import {RouterModule} from "@angular/router";
import { PeopleComponent } from '../components/people/people.component';
import { UserService } from '../services/user.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';


@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent, PostsComponent, CommentsComponent, PeopleComponent, FollowingComponent, FollowersComponent, NotificationsComponent, TopStreamsComponent, ChatComponent, MessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService, UserService, MessageService]
})
export class StreamsModule { }
