import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, BookmarksModule, DashboardModule],
})
export class HomeModule {}
