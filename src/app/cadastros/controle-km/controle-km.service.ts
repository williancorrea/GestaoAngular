import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ControleKmFiltro} from './ControleKmFiltro';

@Injectable()
export class ControleKmService {

    apiUrl: string;

    constructor(private http: AuthHttp) {
        this.apiUrl = `${environment.apiUrl}/controle-km`;
        moment.locale('pt-br');
    }

    /**
     * Lista todos os registro de acordo com os filtros passados por parametros
     */
    findAll(grid: any, controleKmFiltro: ControleKmFiltro) {
        /*
           in a real application, make a remote request to load data using state metadata from event
           event.first = First row offset
           event.rows = Number of rows per page
           event.sortField = Field name to sort with
           event.sortOrder = Sort order as number, 1 for asc and -1 for dec
           filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        */

        const config = {
            params: {
                'size': grid.rows,
                'page': grid.first / grid.rows,
                'ordemClassificacao': 'DESC',
                'campoOrdenacao': 'dataHoraSaida'
            }
        };
        if (grid.globalFilter && grid.globalFilter.length > 0) {
            config.params['filtroGlobal'] = grid.globalFilter;
        }


        if (controleKmFiltro) {
            if (controleKmFiltro.kmSaida && controleKmFiltro.kmSaida.toString().trim().length > 0) {
                config.params['kmSaida'] = controleKmFiltro.kmSaida;
            }
            if (controleKmFiltro.kmChegada && controleKmFiltro.kmChegada.toString().trim().length > 0) {
                config.params['kmChegada'] = controleKmFiltro.kmChegada;
            }
            if (controleKmFiltro.dataSaida && moment(controleKmFiltro.dataSaida, 'DD/MM/YYYY').isValid()) {
                config.params['dataSaida'] = moment(controleKmFiltro.dataSaida + ' 00:00:00', 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString();
            }
            if (controleKmFiltro.dataChegada && moment(controleKmFiltro.dataChegada, 'DD/MM/YYYY').isValid()) {
                config.params['dataChegada'] = moment(controleKmFiltro.dataChegada + ' 23:59:59', 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss').toString();
            }
            if (controleKmFiltro.veiculoId && controleKmFiltro.veiculoId.toString().trim().length > 0) {
                config.params['veiculoId'] = controleKmFiltro.veiculoId;
            }
            if (controleKmFiltro.pessoaId && controleKmFiltro.pessoaId.toString().trim().length > 0) {
                config.params['pessoaId'] = controleKmFiltro.pessoaId;
            }
            if (controleKmFiltro.itinerarioId && controleKmFiltro.itinerarioId.toString().trim().length > 0) {
                config.params['itinerarioId'] = controleKmFiltro.itinerarioId;
            }
        }

        return this.http.get(`${this.apiUrl}`, config)
            .toPromise()
            .then(response => {
                const lista = response.json();
                for (let i = 0; i < lista.content.length; i++) {
                    if (lista.content[i]['dataHoraChegada']) {
                        lista.content[i]['dataHoraChegada'] = moment(lista.content[i]['dataHoraChegada'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
                        lista.content[i]['dataHoraChegadaDiaSemana'] = moment(lista.content[i]['dataHoraChegada'], 'YYYY-MM-DD HH:mm:ss').day(-3).format('dddd').toString();
                    }
                    if (lista.content[i]['dataHoraSaida']) {
                        lista.content[i]['dataHoraSaida'] = moment(lista.content[i]['dataHoraSaida'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
                        lista.content[i]['dataHoraSaidaDiaSemana'] = moment(lista.content[i]['dataHoraSaida'], 'YYYY-MM-DD HH:mm:ss').day(-3).format('dddd').toString();
                    }
                }
                return lista;
            });
    }

    /**
     * Efetua a pesquisa de acordo com o chave passada por paramentro
     */
    findOne(key) {
        return this.http.get(`${this.apiUrl}/${key}`)
            .toPromise()
            .then(response => {
                response = response.json();
                if (response['dataHoraChegada']) {
                    response['dataHoraChegada'] = moment(response['dataHoraChegada'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
                }
                if (response['dataHoraSaida']) {
                    response['dataHoraSaida'] = moment(response['dataHoraSaida'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
                }
                return response;
            });
    }

    buscarKmMinimoASerInformado(dataSaida: string, veiculoId: string) {
        const config = {
            params: {
                'veiculoId': veiculoId,
                'dataSaida': moment(dataSaida, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString()
            }
        };
        return this.http.get(`${this.apiUrl}/kmMinimoPeriodo`, config)
            .toPromise()
            .then(response => {
                response = response.json();
                return response;
            });
    }

    buscarKmMaximoASerInformado(dataChegada: string, veiculoId: string) {
        const config = {
            params: {
                'veiculoId': veiculoId,
                'dataChegada': moment(dataChegada, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString()
            }
        };
        return this.http.get(`${this.apiUrl}/kmMaximoPeriodo`, config)
            .toPromise()
            .then(response => {
                response = response.json();
                return response;
            });
    }


    /**
     * Exclui o registro de acordo com o chave passada por parametro
     */
    delete(key: String) {
        return this.http.delete(`${this.apiUrl}/${key}`)
            .toPromise()
            .then(() => null);
    }

    /**
     * Salva o registro
     */
    save(obj) {

        let clone = JSON.parse(JSON.stringify(obj));
        clone = this.formatarDados(clone);

        return this.http.post(this.apiUrl,
            JSON.stringify(clone))
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    /**
     * Atualiza o registro
     */
    update(obj) {
        const key = obj.key;

        let clone = JSON.parse(JSON.stringify(obj));
        clone = this.formatarDados(clone);

        return this.http.put(`${this.apiUrl}/${key}`,
            JSON.stringify(clone))
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    private formatarDados(obj) {
        delete obj['key'];
        delete obj['controle'];
        obj['dataHoraSaida'] = moment(obj['dataHoraSaida'], 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString();
        obj['dataHoraChegada'] = moment(obj['dataHoraChegada'], 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString();
        return obj;
    }

}
