import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {CheckboxModule, DataTableModule, InputSwitchModule, InputTextModule, ProgressBarModule, TabViewModule, TooltipModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {NgxLoadingModule} from 'ngx-loading';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {PermissoesDeAcessoComponent} from './permissoes-de-acesso/permissoes-de-acesso.component';
import {TransportSharedModule} from '../../transport-shared/transport-share.module';
import {CoreModule} from '../../core/core.module';

@NgModule({
    imports: [
        CommonModule,


        TransportSharedModule,
        CoreModule,

        SharedModule,

        FormsModule,
        ReactiveFormsModule,

        NgxLoadingModule,
        ToastModule,


        RouterModule,
        // BancoRoutingModule,

        TranslateModule,
        // TranslateModule.forChild(
        //     {
        //         loader: {
        //             provide: TranslateLoader,
        //             useFactory: (createTranslateLoader),
        //             deps: [HttpClient]
        //         },
        //         missingTranslationHandler: {
        //             provide: MissingTranslationHandler,
        //             useClass: AppTraducoesAusentes
        //         },
        //         useDefaultLang: false
        //     }
        // ),

        DataTableModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        ButtonModule,
        PanelModule,
        TooltipModule,
        ProgressBarModule,
        CheckboxModule,
        TabViewModule,
        InputSwitchModule,
        CheckboxModule
    ],
    declarations: [
        PermissoesDeAcessoComponent
    ],
    exports: []
})

export class ConfiguracoesModule {

}
