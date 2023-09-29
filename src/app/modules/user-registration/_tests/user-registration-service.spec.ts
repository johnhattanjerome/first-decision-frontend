import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRegistrationService } from '../user-registration.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { environment } from 'src/environments/environment.development';
import { throwError, of } from 'rxjs';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let httpTestingController: HttpTestingController;
  let modalService: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRegistrationService, ModalService],
    });
    service = TestBed.inject(UserRegistrationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    modalService = TestBed.inject(ModalService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert a user and handle errors', () => {
    const mockUser = { /* Seus dados de usuário mock aqui */ };
    const mockErrorResponse = { error: ['Erro de exemplo'] };

    // Espiona o BehaviorSubject
    const errorListSpy = spyOn(service['_errorList'], 'next');
    const modalServiceSpy = spyOn(modalService, 'toggleModalStatus');

    // Simula a chamada HTTP bem-sucedida
    service.insertUser(mockUser).subscribe(
      (response) => {
        // Verifica se a resposta é a esperada (pode ser ajustada conforme necessário)
        expect(response).toBeTruthy();
      },
      (error) => {
        fail('A chamada HTTP não deveria falhar');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });

    // Verifica se o BehaviorSubject foi chamado com o erro
    expect(errorListSpy).toHaveBeenCalledWith(mockErrorResponse.error);

    // Verifica se o modalService.toggleModalStatus(true) foi chamado
    expect(modalServiceSpy).toHaveBeenCalledWith(true);
  });

  it('should handle a successful user insertion', () => {
    const mockUser = { /* Seus dados de usuário mock aqui */ };
    const mockSuccessResponse = { /* Seu mock de resposta bem-sucedida aqui */ };

    // Simula a chamada HTTP bem-sucedida
    service.insertUser(mockUser).subscribe(
      (response) => {
        // Verifica se a resposta é a esperada (pode ser ajustada conforme necessário)
        expect(response).toEqual(mockSuccessResponse);
      },
      (error) => {
        fail('A chamada HTTP não deveria falhar');
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockSuccessResponse);

    // Verifica se o BehaviorSubject não foi chamado
    const errorListSpy = spyOn(service['_errorList'], 'next');
    expect(errorListSpy).not.toHaveBeenCalled();

    // Verifica se o modalService.toggleModalStatus não foi chamado
    const modalServiceSpy = spyOn(modalService, 'toggleModalStatus');
    expect(modalServiceSpy).not.toHaveBeenCalled();
  });
});
