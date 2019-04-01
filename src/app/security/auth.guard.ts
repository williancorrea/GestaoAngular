import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';

import {Observable} from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.auth.isInvalidAccessToken()) {

            console.log('Navegação com access token inválido. Obtendo novo token...');

            return this.auth.getNewAccessToken()
                .then(() => {

                    if (this.auth.isInvalidAccessToken()) {
                        this.router.navigate(['/login']);
                        return false;
                    }

                    return true;
                });
        } else if (next.data.roles && !this.auth.haveAnyPermission(next.data.roles)) {
            this.router.navigate(['/acesso-negado']);
            return false;
        }

        return true;
    }

}
