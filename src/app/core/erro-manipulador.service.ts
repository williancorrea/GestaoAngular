import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {NotAuthenticatedError} from '../security/transport-http';


@Injectable()
export class ErroManipuladorService {
    labels: any;

    constructor(private toasty: MessageService,
                private router: Router,
                private translate: TranslateService) {

        this.translate.get('app').subscribe(s => {
            this.labels = s;
        });
    }

    handle(errorResponse: any): any {
        let mensagemErro: string;

        console.log('DEU ZICA', errorResponse);

        if (typeof errorResponse === 'string') {
            mensagemErro = errorResponse;
        } else if (errorResponse instanceof NotAuthenticatedError) {
            mensagemErro = this.labels['erros']['sessao-expirada'];
            this.router.navigate(['/login']);
        } else if (errorResponse instanceof Response
            && errorResponse.status >= 400 && errorResponse.status <= 499) {
            let errors;
            mensagemErro = this.labels['erros']['processando-requisicao'];

            if (errorResponse.status === 403) {
                mensagemErro = this.labels['erros']['acesso-negado'];
                this.router.navigate(['/acesso-negado']);
            }

            try {
                errors = errorResponse.json();
                mensagemErro = errors[0].userMessage;
            } catch (e) {
            }

            console.error('Ocorreu um erro', errorResponse);
        } else {
            mensagemErro = this.labels['erros']['erro-no-servico'];
            console.error('Ocorreu um erro no back-end', errorResponse);

            // Erro no back-end
            this.router.navigate(['/erro']);
        }

        this.toasty.add({severity: 'error', detail: mensagemErro});
        return mensagemErro;
    }

}
