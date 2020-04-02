import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';

@NgModule({
  declarations: [AuthTabsComponent],
  imports: [CommonModule],
  exports: [AuthTabsComponent],
})
export class AuthModule {}
