import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from 'rxjs/operators';
import { Ticket } from "src/interfaces/ticket.interface";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.css"],
})
export class TicketsListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  addForm: FormGroup;
  subscribeForm: Subscription;
  listOfTickets: Ticket[];
  loadingTickets = true;

  constructor(private backendService: BackendService, private router: Router) {}

  updateTicketsList() {
    // Get stored tickets
    this.backendService.tickets().subscribe(
      (tickets: Ticket[]) => {
        this.listOfTickets = tickets;
        this.loadingTickets = false;
      },
      (error: Error) => {
        console.log(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.updateTicketsList();

    // create Add form
    this.addForm = new FormGroup({
      desc: new FormControl("", Validators.required),
    });

    // create filter form
    this.filterForm = new FormGroup({
      id: new FormControl(""),
      completed: new FormControl(""),
      assigneeId: new FormControl(""),
    });

    // After change on form filter apply this on list
    this.subscribeForm = this.filterForm.valueChanges.subscribe(() => {
      this.loadingTickets = true;
      this.backendService.tickets().subscribe(
        (tickets: Ticket[]) => {
          this.listOfTickets = tickets.filter((ticket: Ticket)=>{
            if(this.filterForm.get('completed').value == true){
              return ticket.completed;
            }
            if(this.filterForm.get('id').value !== ''){
              return ticket.id == this.filterForm.get('id').value;
            }
            if(this.filterForm.get('assigneeId').value !== ''){
              return ticket.assigneeId == this.filterForm.get('assigneeId').value;
            }
            else{
              return ticket;
            }
          });
          this.loadingTickets = false;
        },
        (error: Error) => {
          console.log(error.message);
        }
      );
      // debug
      console.log(this.filterForm);
    });
  }

  // for performance
  ngOnDestroy(): void {
    this.subscribeForm.unsubscribe();
  }

  onDetailsTicket(ticketId: number) {
    this.router.navigate(["ticket/", ticketId]);
  }

  onAdd() {
    this.loadingTickets = true;
    this.backendService
      .newTicket({
        description: this.addForm.get("desc").value,
      })
      .subscribe(
        () => {
          this.addForm.reset();
          console.log("New ticket in backend !");
          this.updateTicketsList();
        },
        (error: Error) => {
          console.log("error");
        }
      );
  }

  onSubmit() {}
}
