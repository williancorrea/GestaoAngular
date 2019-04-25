import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BancoPesquisaComponent} from './banco-pesquisa/banco-pesquisa.component';
import {BancoNovoComponent} from './banco-novo/banco-novo.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {CheckboxModule, DataTableModule, DialogModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {NgxLoadingModule} from 'ngx-loading';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {ImageCropperModule} from 'ngx-image-cropper';

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

        ImageCropperModule,
        DialogModule,

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

    ],
    declarations: [
        BancoPesquisaComponent,
        BancoNovoComponent
    ],
    exports: []
})

export class BancoModule {
}
