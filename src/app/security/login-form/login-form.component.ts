import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {AuthService} from './../auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    email: string;
    password: string;

    public loading = false;

    constructor(private auth: AuthService,
                private errorHandler: ErroManipuladorService,
                private router: Router,
                private translate: TranslateService) {
    }

    ngOnInit() {
        this.loading = false;
    }

    login() {
        this.loading = true;
        this.auth.login(this.email, this.password)
            .then(() => {

                this.router.navigate(['/']); // Vai redirecionar para a pagina principal da aplicação (Dashboard)
                this.loading = false;
            })
            .catch(erro => {
                this.loading = false;
                this.errorHandler.handle(erro);
                this.password = '';
            });
    }

}
