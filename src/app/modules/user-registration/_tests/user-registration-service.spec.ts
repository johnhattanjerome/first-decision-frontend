import { UserRegistrationService } from '../user-registration.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { environment } from '../../../../environments/environment.development';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let httpClientSpy: { post: jest.Mock };
  let modalServiceSpy: { toggleModalStatus: jest.Mock };

  beforeEach(() => {
    httpClientSpy = {
      post: jest.fn(),
    };

    modalServiceSpy = {
      toggleModalStatus: jest.fn(),
    };

    service = new UserRegistrationService(
      httpClientSpy as unknown as HttpClient,
      modalServiceSpy as unknown as ModalService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert a user and handle errors', () => {
    const mockUser = {
      name: 'Joao',
      email: 'joao@g',
      password: '123456',
      confirmPassword: '123456',
    };
    const mockErrorResponse = { error: ['Erro de exemplo'] };

    httpClientSpy.post.mockReturnValue(throwError(mockErrorResponse));

    service.insertUser(mockUser).subscribe(
      () => {
        fail('A chamada HTTP deveria falhar');
      },
      (error) => {
        expect(error).toEqual(mockErrorResponse);
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          `${environment.apiUrl}/user`,
          mockUser
        );
        expect(modalServiceSpy.toggleModalStatus).toHaveBeenCalledWith(true);
      }
    );
  });

  it('should handle a successful user insertion', () => {
    const mockUser = {
      name: 'Joao',
      email: 'joao@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    };
    const mockSuccessResponse = { success: 'Registro inserido com sucesso!' };

    httpClientSpy.post.mockReturnValue(of(mockSuccessResponse));

    service.insertUser(mockUser).subscribe(
      (response) => {
        expect(response).toEqual(mockSuccessResponse);
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          `${environment.apiUrl}/user`,
          mockUser
        );
        expect(modalServiceSpy.toggleModalStatus).not.toHaveBeenCalled();
      },
      () => {
        fail('A chamada HTTP não deveria falhar');
      }
    );
  });
});
