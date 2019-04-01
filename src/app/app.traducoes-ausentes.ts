import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class AppTraducoesAusentes implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return 'Tradução não disponível para: ' + params.key;
    }
}
