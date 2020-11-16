import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Ticket } from "./../../interfaces/ticket.interface";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;
  assigneUserForm: FormGroup;
  loading = true;
  inError = false;
  errorMsg = "";

  constructor(
    private routerActive: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Get Ticket edited/consulted
    this.updateTicketFromBack();

    this.assigneUserForm = new FormGroup({
      assignedId: new FormControl("", Validators.required),
    });
  }

  updateTicketFromBack(): void {
    this.backendService
      .ticket(+this.routerActive.snapshot.params["id"])
      .subscribe((ticket: Ticket) => {
        console.log("Ticket find !!");
        this.loading = false;
        this.ticket = ticket;
      });
  }

  onCompletTicket(): void {
    this.backendService.complete(this.ticket.id, true).subscribe(
      () => {
        console.log("Ticket updated !!");
        this.updateTicketFromBack();
        this.inError = false;
      },
      (error: Error) => {
        this.inError = true;
        this.errorMsg = error.message;
      }
    );
  }

  onAssign(): void {
    this.backendService
      .assign(this.ticket.id, this.assigneUserForm.get("assignedId").value)
      .subscribe(
        () => {
          console.log("Ticket updated !!");
          this.updateTicketFromBack();
          this.inError = false;
        },
        (error: Error) => {
          this.inError = true;
          this.errorMsg = error.message;
        }
      );
  }
}
