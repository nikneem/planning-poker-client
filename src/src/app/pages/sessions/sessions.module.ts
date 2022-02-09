import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionPageComponent } from './pages/session-page/session-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SessionPageComponent],
  imports: [CommonModule, SessionsRoutingModule, SharedModule],
})
export class SessionsModule {}
