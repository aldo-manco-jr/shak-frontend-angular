import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people.component';
import { AuthGuard } from '../../services/auth.guard';
import { FollowingComponent } from '../following/following.component';


const routes: Routes = [
  {
    path: '',
    component: PeopleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
