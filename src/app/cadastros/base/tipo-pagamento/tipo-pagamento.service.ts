import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../../../environments/environment';
import {TipoPagamentoFiltro} from './TipoPagamentoFiltro';

@Injectable()
export class TipoPagamentoService {

    apiUrl: string;

    constructor(private http: AuthHttp) {
        this.apiUrl = `${environment.apiUrl}/tipo_pagamentos`;
    }

    /**
     * List all records according to the filters passed by parameter
     */
    findAll(grid: any, tipoPagamentoFiltro: TipoPagamentoFiltro): Promise<any> {
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
                'ordemClassificacao': grid.sortOrder > 0 ? 'ASC' : 'DESC',
                'campoOrdenacao': grid.sortField
            }
        };
        if (grid.globalFilter && grid.globalFilter.length > 0) {
            config.params['filtroGlobal'] = grid.globalFilter;
        }


        if (tipoPagamentoFiltro && tipoPagamentoFiltro.descricao && tipoPagamentoFiltro.descricao.length > 0) {
            config.params['descricao'] = tipoPagamentoFiltro.descricao;
        }

        return this.http.get(`${this.apiUrl}`, config)
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    /**
     * Search for the record according to the key passed by parameter
     */
    findOne(key): Promise<any> {
        return this.http.get(`${this.apiUrl}/${key}`)
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    /**
     * Delete the record according to the key passed by parameter
     */
    delete(key: String): Promise<any> {
        return this.http.delete(`${this.apiUrl}/${key}`)
            .toPromise()
            .then(() => null);
    }

    /**
     * Save the record
     */
    save(tipoPagamento: any): Promise<any> {
        const clone = JSON.parse(JSON.stringify(tipoPagamento));
        delete clone['key'];
        delete clone['controle'];

        return this.http.post(this.apiUrl,
            JSON.stringify(clone))
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

    /**
     * Updates
     */
    update(tipoPagamento: any): Promise<any> {
        const key = tipoPagamento.key;

        const clone = JSON.parse(JSON.stringify(tipoPagamento));
        delete clone['key'];
        delete clone['controle'];

        return this.http.put(`${this.apiUrl}/${key}`,
            JSON.stringify(clone))
            .toPromise()
            .then(response => {
                return response.json();
            });
    }

}
