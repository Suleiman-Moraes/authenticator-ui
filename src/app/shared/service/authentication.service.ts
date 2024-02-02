import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    oauthTokenUrl: string;
    oauthRefreshTokenUrl: string;
    jwtPayload: any;
    @BlockUI()
    blockUI!: NgBlockUI;
    private basicToken: string;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) {
        this.oauthTokenUrl = `${environment.apiURLBase}/auth/signin`;
        this.oauthRefreshTokenUrl = `${environment.apiURLBase}/auth/refresh`;
        this.basicToken = `${environment.basicToken}`;
    }

    login(username: string, password: string): Promise<void> {
        this.blockUI.start();
        const headers = new HttpHeaders()
            .append("Authorization", `Basic ${this.basicToken}`);

        const body = {
            username: username,
            password: password
        };

        return lastValueFrom(
            this.http.post(this.oauthTokenUrl, body, { headers }).pipe(
                map((response: any) => {
                    this.blockUI.stop();
                    this.storeToken(response["access_token"]);
                    sessionStorage.setItem("refresh_token", response["refresh_token"]);
                    Promise.resolve();
                }),
                catchError((response) => {
                    this.blockUI.stop();
                    if (response.status === 400) {
                        if (response.error.error === "invalid_grant") {
                            return Promise.reject("Usuário ou senha inválida!");
                        }
                    }
                    return Promise.reject(response);
                })
            )
        );
    }

    getNewAccessToken(): Promise<any> {
        if(!sessionStorage.getItem('refresh_token')){
            this.router.navigate(["/login"]);
            Promise.reject('Invalid refresh token.');
        }
        const headers = new HttpHeaders()
            .append("Authorization", `Bearer ${sessionStorage.getItem('refresh_token')}`);

        return lastValueFrom(
            this.http.put(this.oauthRefreshTokenUrl, null, { headers }).pipe(
                map((response: any) => {
                    this.blockUI.stop();
                    this.storeToken(response["access_token"]);
                    return Promise.resolve();
                }),
                catchError((response) => {
                    this.blockUI.stop();
                    console.error("Erro ao renovar token.", response);
                    this.router.navigate(["/login"]);
                    return Promise.reject(response);
                })
            )
        );
    }

    haveAnyPermission(roles: string[]) {
        for (const role of roles) {
            if (this.havePermission(role)) {
                return true;
            }
        }
        return false;
    }

    logout(): void {
        if (sessionStorage.getItem("token")) {
            sessionStorage.clear();
            this.cleanAccessToken();
        }
        // this.router.navigate(["/login"]);
    }

    cleanAccessToken() {
        sessionStorage.removeItem("token");
        this.jwtPayload = null;
    }

    havePermission(permissao: string) {
        return this.getJwtPayload()?.roles?.includes(permissao);
    }

    isInvalidAccessToken() {
        const token = this.getToken();
        return !token || this.jwtHelper.isTokenExpired(token);
    }

    getToken(): any {
        const token = sessionStorage.getItem("token");
        if (token) {
            return token;
        } else {
            return null;
        }
    }

    private storeToken(token: string) {
        sessionStorage.setItem("token", token);
        this.jwtPayload = this.jwtHelper.decodeToken(token);
    }

    private getJwtPayload(){
        if(!this.jwtPayload){
            this.jwtPayload = this.jwtHelper.decodeToken(sessionStorage.getItem('token'));
        }
        return this.jwtPayload;
    }
}
