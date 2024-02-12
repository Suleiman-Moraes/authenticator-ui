import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResetPasswordDTO } from '../model/user/user-reset-password-dto.model';
import { UserResetPasswordTokenDTO } from '../model/user/user-reset-password-token-dto.model';

@Injectable({
    providedIn: 'root'
})
export class UserMeService {

    private apiPath: string = `${environment.apiURLBase}/api/v1/user/me`;

    constructor(
        private http: HttpClient
    ) { }

    resetPassword(resource: UserResetPasswordDTO): Observable<void> {
        return this.http.patch(`${this.apiPath}/password/reset`, resource).pipe(
            map((res: any) => res)
        )
    }

    resetPasswordToken(resource: UserResetPasswordTokenDTO): Observable<void> {
        return this.http.patch(`${this.apiPath}/password/reset/token`, resource).pipe(
            map((res: any) => res)
        )
    }
}
