import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TanqueCombustivelPesquisaComponent} from './tanque-combustivel-pesquisa/tanque-combustivel-pesquisa.component';
import {TanqueCombustivelNovoComponent} from './tanque-combustivel-novo/tanque-combustivel-novo.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {CheckboxModule, DataTableModule, DropdownModule, InputTextModule, KeyFilterModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {NgxLoadingModule} from 'ngx-loading';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

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
        DropdownModule,
        KeyFilterModule

    ],
    declarations: [
        TanqueCombustivelPesquisaComponent,
        TanqueCombustivelNovoComponent
    ],
    exports: []
})

export class TanqueCombustivelModule {
}
