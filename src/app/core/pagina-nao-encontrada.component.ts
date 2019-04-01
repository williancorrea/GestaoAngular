import {Component} from '@angular/core';

@Component({
    template: `
        <div class="exception-body">
            <div class="exception-panel">
                <img class="logo" src="../../assets/layout/images/logo.png"/>

                <img src="../../assets/layout/images/icon-404.png"/>

                <h1>{{'app.comum.pagina.nao-encontrada' | translate}}</h1>
                <p>{{'app.comum.pagina.nao-encontrada-descricao' | translate}}</p>
                <a type="button" routerLink="/"
                   class="ui-button green-btn ui-widget ui-state-default ui-corner-all error-page-btn">
                    <span class="ui-button-text ui-c" style="padding:5px;">{{'app.comum.dashboard' | translate}}</span>
                </a>
            </div>
        </div>
    `,
    styles: [`
        .exception-body {
            padding-right: 60px;
            margin: 20px;
        }

        .exception-body {
            background-color: #f1f3f6;
            padding-top: 0px
        }

        .exception-body .exception-panel {
            background-color: #f1f3f6;
            border: 1px solid #ccc;
        }

        .exception-body .exception-panel h1 {
            font-size: 19px;
        }

        .exception-body .exception-panel h2 {
            font-size: 12px;
        }

        .exception-body .exception-panel .logo {
            width: 240px;
            height: 65px;
            margin-bottom: 50px;
        }

    `]
})
export class PaginaNaoEncontradaComponent {

}
