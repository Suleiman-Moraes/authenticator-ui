import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authenticationService = inject(AuthenticationService);
    if(containsUrlWithTokenBasic(req.url)){
        return next(setHeadersBasic(req));
    }
    else if (!containsUrlWithoutToken(req.url)) {
        if (authenticationService.isInvalidAccessToken()) {
            return from(authenticationService.getNewAccessToken())
                .pipe(
                    mergeMap(() => {
                        if (authenticationService.isInvalidAccessToken()) {
                            return next(req);
                        }
                        return next(setHeaders(req));
                    })
                );
        }
        else {
            return next(setHeaders(req));
        }
    }
    else {
        return next(req);
    }
};

function setHeaders(request: HttpRequest<unknown>, token?: string): any {
    token = token ? token : sessionStorage.getItem('token');
    const cloned = request.clone({
        setHeaders: {
            Authorization: 'Bearer ' + token,
        },
    });
    return cloned;
}

function setHeadersBasic(request: HttpRequest<unknown>, token?: string): any {
    token = token ? token : environment.basicToken;
    const cloned = request.clone({
        setHeaders: {
            Authorization: 'Basic ' + token,
        },
    });
    return cloned;
}

function containsUrlWithoutToken(url: string): boolean {
    return url.includes('/auth/signin') || url.includes('/auth/refresh') ||
        (sessionStorage.getItem('token') == null && this.urls.filter((u: string) => url.includes(u)).length > 0);
}

function containsUrlWithTokenBasic(url: string): boolean {
    return url.includes('/user/me');
}

