import {Component} from '@angular/core';

@Component({
    template: `
        <body class="exception-body">
            <div class="exception-panel">
                <img src="../../assets/layout/images/icon-error.png"/>

                <h1>{{'app.comum.pagina.erro' | translate}}</h1>
                <p>{{'app.comum.pagina.erro-descricao' | translate}}</p>
                <button type="button" pButton routerLink="/"
                        label="{{'app.comum.dashboard' | translate}}"
                        style="padding:5px;"
                        class="ui-button green-btn ui-widget ui-state-default ui-corner-all">
                </button>
            </div>
        </body>
    `,
    styles: [`
        .exception-body {
            background-color: #f1f3f6;
        }

        .exception-body .exception-panel {
            background-color: #f1f3f6;
            padding: 0px !important;
            padding-right: 50px !important;
        }
    `]
})
export class ErroComponent {

    constructor() {
    }

}
