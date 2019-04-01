import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {
    ButtonModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    MessageModule,
    PanelModule,
    ProgressBarModule,
    SharedModule,
    TooltipModule
} from 'primeng/primeng';
import {CoreModule} from '../../../core/core.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {VeiculoPesquisaComponent} from './veiculo-pesquisa/veiculo-pesquisa.component';
import {VeiculoNovoComponent} from './veiculo-novo/veiculo-novo.component';
import {ToastModule} from 'primeng/toast';

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
        InputMaskModule
    ],
    declarations: [
        VeiculoPesquisaComponent, VeiculoNovoComponent
    ],
    exports: [],
    providers: [
        TranslateService
    ]
})
export class VeiculoModule {
}
