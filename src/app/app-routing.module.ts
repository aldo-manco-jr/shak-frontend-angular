import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { CommentsComponent } from './components/Stream/comments/comments.component';
import { ChangePasswordComponent } from './components/ReservedArea/change-password/change-password.component';
import { NotificationsComponent } from './components/Users/notifications/notifications.component';
import { ImagesComponent } from './components/ReservedArea/images/images.component';
import { ViewUserComponent } from './components/Users/view-user/view-user.component';
import { ChatComponent } from './components/Conversations/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    //loadChildren: './components/auth-tabs/auth.module#AuthModule',
    loadChildren: () => import('./components/Authentication/auth-tabs/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./components/Stream/streams/streams.module').then(mod => mod.StreamsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./components/Users/people/people.module').then(mod => mod.PeopleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    loadChildren: () => import('./components/Users/following/following.module').then(mod => mod.FollowingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    loadChildren: () => import('./components/Users/followers/followers.module').then(mod => mod.FollowersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./components/Stream/comments/comments.module').then(mod => mod.CommentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/password',
    loadChildren: () => import('./components/ReservedArea/change-password/change-password.module').then(mod => mod.ChangePasswordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./components/Users/notifications/notifications.module').then(mod => mod.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    loadChildren: () => import('./components/ReservedArea/images/images.module').then(mod => mod.ImagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    loadChildren: () => import('./components/Users/view-user/view-user.module').then(mod => mod.ViewUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    loadChildren: () => import('./components/Conversations/chat/chat.module').then(mod => mod.ChatModule),
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
