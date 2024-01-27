import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
    let authenticationService = inject(AuthenticationService);
    let router = inject(Router);
    if (!authenticationService.getToken()) {
        router.navigate(['/login'], { queryParams: { from: state.url } });
    }
    if (authenticationService.isInvalidAccessToken()) {
        return authenticationService.getNewAccessToken().then(() => {
            if (authenticationService.isInvalidAccessToken()) {
                router.navigate(['/login'], { queryParams: { from: state.url } });
                return false;
            }
            else {
                return verify(route, state, authenticationService, router);
            }
        });
    }
    else {
        return verify(route, state, authenticationService, router);
    }
};

function verify(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, authenticationService: AuthenticationService, router: Router): any {
    if (route.data['roles'] && !authenticationService.haveAnyPermission(route.data['roles'])) {
        router.navigate(['/404']);
        return false;
    }
    else {
        return true;
    }
}

