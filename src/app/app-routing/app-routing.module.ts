import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { TicketsListComponent } from '../tickets-list/tickets-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'tickets-list', pathMatch: 'full' },
  {
    path: 'ticket/:id', component: TicketDetailsComponent
  },
  { path: 'tickets-list', component: TicketsListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
