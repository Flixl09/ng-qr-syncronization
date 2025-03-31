import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-message',
  imports: [NgbAlert, NgIf],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
  standalone: true,
  
})
export class ErrorMessageComponent {
  public errorMessage: string = '';
  public successMessage: string = '';

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }
}
