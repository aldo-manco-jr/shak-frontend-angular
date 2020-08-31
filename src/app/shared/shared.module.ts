import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../components/Shared/toolbar/toolbar.component';
import { SideComponent } from '../components/Shared/side/side.component';
import { PostFormComponent } from '../components/Stream/post-form/post-form.component';
import { PostsComponent } from '../components/Stream/posts/posts.component';
import { TopStreamsComponent } from '../components/Stream/top-streams/top-streams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { FileUploadModule } from 'ng2-file-upload';
import { TokenInterceptorService } from '../services/token-interceptor';


@NgModule({
  declarations: [
    ToolbarComponent,
    SideComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule
  ],
  exports: [
    ToolbarComponent,
    SideComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class SharedModule {
}
