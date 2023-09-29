import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ModalService } from '../../shared/components/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  apiUrl = environment.apiUrl;
  private _errorList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor(private http: HttpClient, private modalService: ModalService) {}

  get getErrors$(): Observable<string[]> {
    return this._errorList.asObservable();
  }

  insertUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user).pipe(
      catchError((error) => {
        if (Array.isArray(error.error) && error.error.length) {
          this._errorList.next(error.error || null);
          this.modalService.toggleModalStatus(true);
        }
        return throwError(error);
      })
    );
  }
}
