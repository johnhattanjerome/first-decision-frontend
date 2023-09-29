import { ModalService } from './modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  modalStatus$: Observable<boolean> = new Observable<boolean>();
  @Input() errorList?: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalStatus$ = this.modalService.modalStatus$;
  }

  closeModal() {
    this.modalService.toggleModalStatus(false);
  }
}
