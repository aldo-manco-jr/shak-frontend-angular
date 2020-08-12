import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { CommentsComponent } from './components/comments/comments.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ImagesComponent } from './components/images/images.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    //loadChildren: './components/auth-tabs/auth.module#AuthModule',
    loadChildren: () => import('./components/auth-tabs/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./components/streams/streams.module').then(mod => mod.StreamsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    loadChildren: () => import('./components/people/people.module').then(mod => mod.PeopleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    loadChildren: () => import('./components/following/following.module').then(mod => mod.FollowingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    loadChildren: () => import('./components/followers/followers.module').then(mod => mod.FollowersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./components/comments/comments.module').then(mod => mod.CommentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account/password',
    loadChildren: () => import('./components/change-password/change-password.module').then(mod => mod.ChangePasswordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./components/notifications/notifications.module').then(mod => mod.NotificationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:name',
    loadChildren: () => import('./components/images/images.module').then(mod => mod.ImagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    loadChildren: () => import('./components/view-user/view-user.module').then(mod => mod.ViewUserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    loadChildren: () => import('./components/chat/chat.module').then(mod => mod.ChatModule),
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
