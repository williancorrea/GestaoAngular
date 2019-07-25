import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ControleKmService} from '../../controle-km/controle-km.service';
import {ErroManipuladorService} from '../../../core/erro-manipulador.service';
import {VeiculoService} from '../../base/veiculo/veiculo.service';
import {ItinerarioService} from '../../base/itinerario/itinerario.service';
import {PersonService} from '../../base/person/person.service';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthService} from '../../../security/auth.service';
import {environment} from '../../../../environments/environment';

import * as moment from 'moment';

@Component({
    selector: 'app-fretamento-eventual-novo',
    templateUrl: './fretamento-eventual-novo.component.html',
    styleUrls: ['./fretamento-eventual-novo.component.css']
})
export class FretamentoEventualNovoComponent implements OnInit {
    env: any;
    loading: boolean;

    veiculoList: any[];
    itinerarioList: any;
    pessoaList: any;

    kmSaidaMinimo: any;
    kmChegadaMaximo: any;

    // Variaveis modal edicao
    form: FormGroup;
    traduzir: any;
    msgs: any;

    passosFretamento: MenuItem[];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translate: TranslateService,
                private title: Title,
                private fretamentoService: ControleKmService,
                private manipuladorErros: ErroManipuladorService,
                private veiculoService: VeiculoService,
                private itinerarioService: ItinerarioService,
                private pessoaService: PersonService,
                private toasty: MessageService,
                public auth: AuthService,
                private formBuild: FormBuilder) {
    }

    ngOnInit() {
        this.env = environment;
        this.msgs = [];
        this.configForm();
        this.setMostrarTelaCarregando(true);
        this.translate.get('app').subscribe(s => {
            this.traduzir = s;
            this.msgs = null;

            this.passosFretamento = [
                {label: 'Step 1'},
                {label: 'Step 2'},
                {label: 'Step 3'}
            ];

            this.configForm();

            this.carregarItinerarios();
            this.carregarMotoristas();

            const isEditing = this.activatedRoute.snapshot.params['key'];
            if (isEditing) {
                this.title.setTitle(s['acoes']['editar']);

                this.fretamentoService.findOne(isEditing)
                    .then(response => {
                        this.form.patchValue(response);
                        this.setMostrarTelaCarregando(false);
                    })
                    .catch(error => {
                        this.setMensagensErro(this.manipuladorErros.handle(error));
                        this.title.setTitle(s['acoes']['adicionar']);
                        this.setMostrarTelaCarregando(false);
                    });
            } else {
                this.title.setTitle(s['acoes']['adicionar']);
                this.setMostrarTelaCarregando(false);
            }
        });
    }

    setMensagensErro(msg) {
        this.msgs = [{severity: 'error', summary: '', detail: msg}];
    }

    setMensagensAlerta(msg) {
        this.msgs = [{severity: 'warn', summary: '', detail: msg}];
    }

    setMensagensSucesso(msg) {
        this.msgs = [{severity: 'success', summary: '', detail: msg}];
    }

    setMostrarTelaCarregando(carregando) {
        this.loading = carregando;
    }

    configForm() {
        this.form = this.formBuild.group({
            key: [null],
            pessoa: this.formBuild.group({
                key: [null, Validators.required]
            }),
            veiculo: [null, Validators.required],
            itinerario: this.formBuild.group({
                key: [null, Validators.required]
            }),
            dataHoraSaida: [null, Validators.required],
            dataHoraChegada: [null, Validators.required],
            origem: [
                null, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(150)
                ]
            ],
            destino: [
                null, [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(150)
                ]
            ],
            obs: [null, Validators.maxLength(512)],
            kmSaida: [
                null, [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(30)
                ]
            ],
            kmChegada: [
                null, [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(30)
                ]
            ]
        });
    }

    carregarKmSaidaMinimo() {
        this.msgs = null;
        this.kmSaidaMinimo = '';
        if (moment(this.form.get('dataHoraSaida').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').status === 'VALID') {
            this.fretamentoService.buscarKmMinimoASerInformado(this.form.get('dataHoraSaida').value, this.form.get('veiculo').value['key'])
                .then(response => {
                    this.kmSaidaMinimo = Number(response) > 0 ? response : '';
                })
                .catch(error => {
                    this.setMensagensErro(this.manipuladorErros.handle(error));
                });
        }
    }

    carregarKmChegadaMaximo() {
        this.msgs = null;
        this.kmChegadaMaximo = '';
        if (moment(this.form.get('dataHoraChegada').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').status === 'VALID') {
            this.fretamentoService.buscarKmMaximoASerInformado(this.form.get('dataHoraChegada').value, this.form.get('veiculo').value['key'])
                .then(response => {
                    this.kmChegadaMaximo = Number(response) > 0 ? response : '';
                })
                .catch(error => {
                    this.setMensagensErro(this.manipuladorErros.handle(error));
                });
        }
    }

    filtraVeiculo(event) {
        this.veiculoService.findAllCmb(event.query).then(lista => {
            this.veiculoList = lista.map(p => ({
                nome_placa: p.frota + ' - ' + p.placa,
                key: p.key
            }));
        }).catch(error => {
            this.setMensagensErro(this.manipuladorErros.handle(error));
        });
    }

    // TODO: VERIFICAR A PESQUISA POR NOME
    carregarItinerarios() {
        this.msgs = null;
        this.itinerarioService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
            .then(veiculoList => {
                this.itinerarioList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
            })
            .catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
            });
    }

    // TODO: BUSCAR SOMENTE OS MOTORISTAS E COLABORADORES
    carregarMotoristas() {
        this.msgs = null;
        this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
            .then(veiculoList => {
                this.pessoaList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
            })
            .catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
            });
    }

    save(formValidacao: FormGroupDirective) {
        this.msgs = null;

        if (this.form.invalid) {
            // this.toasty.add({severity: 'warn', detail: this.traduzir['validacao']['form_invalido']});
            this.setMensagensAlerta(this.traduzir['validacao']['form_invalido']);
            return;
        }

        this.setMostrarTelaCarregando(true);
        if (this.form.get('key').value) {
            this.fretamentoService.update(this.form.value)
                .then(
                    response => {
                        this.toasty.add({severity: 'success', detail: this.traduzir['fretamento']['acoes']['atualizar_sucesso']});
                        // this.setMensagensSucesso(this.traduzir['fretamento']['acoes']['atualizar_sucesso']);
                        this.setMostrarTelaCarregando(false);

                        this.resetarFormulario(formValidacao);
                    }
                ).catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
                this.setMostrarTelaCarregando(false);
            });
        } else {
            this.fretamentoService.save(this.form.value)
                .then(
                    response => {
                        this.toasty.add({severity: 'success', detail: this.traduzir['fretamento']['acoes']['adicionar_sucesso']});
                        // this.setMensagensSucesso(this.traduzir['fretamento']['acoes']['adicionar_sucesso']);
                        this.setMostrarTelaCarregando(false);

                        this.resetarFormulario(formValidacao);
                    }
                ).catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
                this.setMostrarTelaCarregando(false);
            });
        }
    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['fretamento']['link-pagina']);
    }

    resetarFormulario(formValidacao: FormGroupDirective) {
        this.kmChegadaMaximo = '';
        this.kmSaidaMinimo = '';

        this.configForm();

        this.form.reset();
        formValidacao.resetForm();

        setTimeout(() => {
            this.msgs = null;
            this.toasty.clear();
        }, 2500);
    }
}
