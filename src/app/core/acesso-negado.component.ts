import {Component, OnInit} from '@angular/core';

@Component({
    template: `
        <div class="exception-body">
            <div class="exception-panel">
                <img src="../../assets/layout/images/icon-access.png"/>

                <h1>{{'app.comum.pagina.acesso-negado' | translate}}</h1>
                <p>{{'app.comum.pagina.acesso-negado-descricao' | translate}}</p>
                <button type="button" pButton routerLink="/"
                        label="{{'app.comum.dashboard' | translate}}"
                        style="padding:5px;"
                        class="ui-button green-btn ui-widget ui-state-default ui-corner-all error-page-btn">
                </button>
            </div>
        </div>
    `,
    styles: [`
        .exception-body {
            /*margin-right: 60px;*/
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
export class AcessoNegadoComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
