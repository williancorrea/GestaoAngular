import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ControleKmService} from '../controle-km.service';
import {VeiculoService} from '../../base/veiculo/veiculo.service';
import {ItinerarioService} from '../../base/itinerario/itinerario.service';
import {PersonService} from '../../base/person/person.service';
import {AuthService} from '../../../security/auth.service';
import {ErroManipuladorService} from '../../../core/erro-manipulador.service';

import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

import * as moment from 'moment';

@Component({
    selector: 'app-controle-km-novo',
    templateUrl: './controle-km-novo.component.html',
    styleUrls: ['./controle-km-novo.component.css']
})
export class ControleKmNovoComponent implements OnInit {

    loading: boolean;

    veiculoList: any;
    itinerarioList: any;
    pessoaList: any;

    kmSaidaMinimo: any;
    kmChegadaMaximo: any;

    // Variaveis modal edicao
    form: FormGroup;
    traduzir: any;
    msgs: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translate: TranslateService,
                private title: Title,
                private controleKmService: ControleKmService,
                private manipuladorErros: ErroManipuladorService,
                private veiculoService: VeiculoService,
                private itinerarioService: ItinerarioService,
                private pessoaService: PersonService,
                private toasty: MessageService,
                public auth: AuthService,
                private formBuild: FormBuilder) {
    }

    ngOnInit() {
        this.msgs = [];
        this.configForm();
        this.setMostrarTelaCarregando(true);
        this.translate.get('app').subscribe(s => {
            this.traduzir = s;

            this.configForm();

            this.carregarVeiculos();
            this.carregarItinerarios();
            this.carregarMotoristas();

            const isEditing = this.activatedRoute.snapshot.params['key'];
            if (isEditing) {
                this.title.setTitle(s['acoes']['editar']);

                this.controleKmService.findOne(isEditing)
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

    // SALVAR OU  EDITAR DADOS
    setMensagensErro(msg) {
        this.msgs = [{severity: 'error', summary: '', detail: msg}];
    }

    // SALVAR OU  EDITAR DADOS
    setMensagensAlerta(msg) {
        this.msgs = [{severity: 'warn', summary: '', detail: msg}];
    }

    setMensagensSucesso(msg) {
        this.msgs = [{severity: 'success', summary: '', detail: msg}];
    }

    /**
     * Apresenta ou esconde a tela de carregando
     */
    setMostrarTelaCarregando(carregando) {
        this.loading = carregando;
    }


    configForm() {
        this.form = this.formBuild.group({
            key: [null],
            pessoa: this.formBuild.group({
                key: [null, Validators.required]
            }),
            veiculo: this.formBuild.group({
                key: [null, Validators.required]
            }),
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


        // this.form = new FormGroup({
        //    key: new FormControl(null),
        //    pessoa: new FormGroup({
        //       key: new FormControl([null, Validators.required])
        //    }),
        //    veiculo: new FormGroup({
        //       key: new FormControl([null, Validators.required])
        //    }),
        //    itinerario: new FormGroup({
        //       key: new FormControl([null, Validators.required])
        //    }),
        //    dataHoraSaida: new FormControl([null, Validators.required]),
        //    dataHoraChegada: new FormControl([null, Validators.required]),
        //    origem: new FormControl([
        //       null, [
        //          Validators.required,
        //          Validators.minLength(3),
        //          Validators.maxLength(150)
        //       ], {updateOn: 'blur'}
        //    ]),
        //    destino: new FormControl([
        //       null, [
        //          Validators.required,
        //          Validators.minLength(3),
        //          Validators.maxLength(150)
        //       ]
        //    ]),
        //    obs: new FormControl([null, Validators.maxLength(512)]),
        //    kmSaida: new FormControl([
        //       null, [
        //          Validators.required,
        //          Validators.minLength(1),
        //          Validators.maxLength(30)
        //       ]
        //    ]),
        //    kmChegada: new FormControl([
        //       null, [
        //          Validators.required,
        //          Validators.minLength(1),
        //          Validators.maxLength(30)
        //       ]
        //    ])
        // }, {updateOn: 'blur'});
    }

    carregarKmSaidaMinimo() {
        this.kmSaidaMinimo = '';
        if (moment(this.form.get('dataHoraSaida').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
            this.controleKmService.buscarKmMinimoASerInformado(this.form.get('dataHoraSaida').value, this.form.get('veiculo').get('key').value)
                .then(response => {
                    this.kmSaidaMinimo = Number(response) > 0 ? response : '';
                })
                .catch(error => {
                    this.setMensagensErro(this.manipuladorErros.handle(error));
                });
        }
    }

    carregarKmChegadaMaximo() {
        this.kmChegadaMaximo = '';
        if (moment(this.form.get('dataHoraChegada').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
            this.controleKmService.buscarKmMaximoASerInformado(this.form.get('dataHoraChegada').value, this.form.get('veiculo').get('key').value)
                .then(response => {
                    this.kmChegadaMaximo = Number(response) > 0 ? response : '';
                })
                .catch(error => {
                    this.setMensagensErro(this.manipuladorErros.handle(error));
                });
        }
    }

    // TODO: VERIFICAR A PESQUISA POR PLACA E FROTA
    carregarVeiculos() {
        this.veiculoService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'frota'}, null)
            .then(veiculoList => {
                this.veiculoList = veiculoList.content.map(p => ({label: p.frota + ' - ' + p.placa, value: p.key}));
            })
            .catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
            });
    }

    // TODO: VERIFICAR A PESQUISA POR NOME
    carregarItinerarios() {
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
        this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
            .then(veiculoList => {
                this.pessoaList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
            })
            .catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
            });
    }

    save(formValidacao: FormGroupDirective) {
        if (this.form.invalid) {
            // this.toasty.add({severity: 'warn', detail: this.traduzir['validacao']['form_invalido']});
            this.setMensagensAlerta(this.traduzir['validacao']['form_invalido']);
            return;
        }

        this.setMostrarTelaCarregando(true);
        if (this.form.get('key').value) {
            this.controleKmService.update(this.form.value)
                .then(
                    response => {
                        // this.toasty.add({severity: 'success', detail: this.traduzir['controleKm']['acoes']['atualizar_sucesso']});
                        this.setMensagensSucesso(this.traduzir['controleKm']['acoes']['atualizar_sucesso']);
                        this.setMostrarTelaCarregando(false);

                        this.resetarFormulario(formValidacao);
                    }
                ).catch(error => {
                this.setMensagensErro(this.manipuladorErros.handle(error));
                this.setMostrarTelaCarregando(false);
            });
        } else {
            this.controleKmService.save(this.form.value)
                .then(
                    response => {
                        // this.toasty.add({severity: 'success', detail: this.traduzir['controleKm']['acoes']['adicionar_sucesso']});
                        this.setMensagensSucesso(this.traduzir['controleKm']['acoes']['adicionar_sucesso']);
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
        this.router.navigateByUrl(this.traduzir['controleKm']['link-pagina']);
    }

    resetarFormulario(formValidacao: FormGroupDirective) {
        this.kmChegadaMaximo = '';
        this.kmSaidaMinimo = '';
        // this.msgs = null;

        this.configForm();

        this.form.reset();
        formValidacao.resetForm();
    }
}
