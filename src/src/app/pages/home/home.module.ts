import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeCreateSessionDialogComponent } from './dialogs/home-create-session-dialog/home-create-session-dialog.component';
import { HomeJoinSessionDialogComponent } from './dialogs/home-join-session-dialog/home-join-session-dialog.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeCreateSessionDialogComponent,
    HomeJoinSessionDialogComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule, SharedModule],
})
export class HomeModule {}
