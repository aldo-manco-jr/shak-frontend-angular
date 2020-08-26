import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from './streams.component';
import { SharedModule } from '../../shared/shared.module';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostsComponent } from '../posts/posts.component';
import { TopStreamsComponent } from '../top-streams/top-streams.component';


@NgModule({
  declarations: [
    StreamsComponent,
    PostFormComponent,
    PostsComponent,
    TopStreamsComponent
  ],
  imports: [
    CommonModule,
    StreamsRoutingModule,
    SharedModule
  ],
  exports: [
    PostFormComponent,
    PostsComponent,
    TopStreamsComponent,
  ]
})
export class StreamsModule { }
