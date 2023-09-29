import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalControl: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  get modalStatus$(): Observable<boolean> {
    return this._modalControl.asObservable();
  }

  toggleModalStatus(status:boolean){
    this._modalControl.next(status);
  }

}
