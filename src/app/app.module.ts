import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, TicketDetailsComponent, TicketsListComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, CommonModule],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
