import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';

import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import {environment} from './../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    oauthTokenUrl: string;
    jwtPayload: any;

    constructor(private http: Http,
                private jwtHelper: JwtHelper,
                private router: Router) {
        this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
        this.loadToken();
    }

    login(usuario: string, senha: string): Promise<void> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = `username=${usuario}&password=${senha}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body,
            {headers, withCredentials: true})
            .toPromise()
            .then(response => {
                this.storeToken(response.json().access_token);
            })
            .catch(response => {
                if (response.status === 400) {
                    const responseJson = response.json();

                    if (responseJson.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou senha inválida!');
                    }
                } else if (response.status === 0) {
                    // Erro no back-end
                    this.router.navigate(['/erro']);
                }

                return Promise.reject(response);
            });
    }

    getNewAccessToken(): Promise<void> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = 'grant_type=refresh_token';

        return this.http.post(this.oauthTokenUrl, body,
            {headers, withCredentials: true})
            .toPromise()
            .then(response => {
                this.storeToken(response.json().access_token);

                console.log('Novo access token criado!');

                return Promise.resolve(null);
            })
            .catch(response => {
                console.error('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }

    /**
     * Removes the access token from the local Storage
     */
    clearAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }

    /**
     * Checks if the access token is invalid
     */
    isInvalidAccessToken() {
        const token = localStorage.getItem('token');
        return !token || this.jwtHelper.isTokenExpired(token);
    }

    /**
     * Checks whether the user has a specific permission
     */
    hasPermission(permission: string) {
        return (this.jwtPayload && this.jwtPayload.authorities && this.jwtPayload.authorities.includes(permission)) ? true : false;
    }

    /**
     * Verifies that the user has at least one permission
     */
    haveAnyPermission(roles) {
        for (const role of roles) {
            if (this.hasPermission(role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Stores the token in local storage
     */
    private storeToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    }

    /**
     * Loads the token stored in local storage
     */
    private loadToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.storeToken(token);
        }
    }

}
