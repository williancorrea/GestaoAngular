import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './message/message.component';
import {WCLabelComponent} from './wcLabel/wc-label.component';
import {BaseFormComponent} from './base-form/base-form.component';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,

        TranslateModule
    ],
    declarations: [
        MessageComponent,
        WCLabelComponent,
        BaseFormComponent
    ],
    exports: [
        TranslateModule,
        MessageComponent,
        WCLabelComponent,
        BaseFormComponent,

        TranslatePipe
    ]
})
export class TransportSharedModule {
}
