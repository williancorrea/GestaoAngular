import {Http, RequestOptions} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

import {AuthGuard} from './auth.guard';
import {LogoutService} from './logout.service';
import {AuthService} from './auth.service';
import {TransportHttp} from './transport-http';
import {LoginFormComponent} from './login-form/login-form.component';
import {TransportSharedModule} from '../transport-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {MessageModule} from 'primeng/message';
import {CheckboxModule, InputSwitchModule, ProgressBarModule, TabViewModule} from 'primeng/primeng';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgxLoadingModule} from 'ngx-loading';
import {ToastModule} from 'primeng/toast';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
    const config = new AuthConfig({
        globalHeaders: [
            {'Content-Type': 'application/json'}
        ]
    });

    return new TransportHttp(auth, config, http, options);
}

@NgModule({
    imports: [
        CommonModule,

        FormsModule,
        TranslateModule,
        TransportSharedModule,
        CoreModule,

        NgxLoadingModule,
        MessageModule,
        InputTextModule,
        ButtonModule,
        ProgressBarModule,
        TabViewModule,
        InputSwitchModule,
        CheckboxModule,
        ToastModule
    ],
    declarations: [
        LoginFormComponent
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [AuthService, Http, RequestOptions]
        },
        AuthGuard,
        TranslateService,
        LogoutService
    ]
})
export class SecurityModule {
}
