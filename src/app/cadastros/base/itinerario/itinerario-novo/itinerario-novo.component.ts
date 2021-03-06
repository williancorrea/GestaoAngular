import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ItinerarioService} from '../itinerario.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-bank-new',
    templateUrl: './itinerario-novo.component.html',
    styleUrls: ['./itinerario-novo.component.css']
})
export class ItinerarioNovoComponent extends BaseFormComponent implements OnInit {

    traduzir: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private translateService: TranslateService,
                private titulo: Title,
                private bankService: ItinerarioService,
                private toasty: MessageService,
                public auth: AuthService,
                private errorHandler: ErroManipuladorService,
                private formBuild: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.configurarForm();
        this.mostrarModalCarregando(true);
        this.translateService.get('app').subscribe(s => {
            this.traduzir = s;

            const editando = this.activatedRoute.snapshot.params['key'];

            if (editando) {
                this.titulo.setTitle(this.traduzir['itinerario']['acoes']['editar']);

                this.bankService.findOne(editando).then(response => {
                    // this.bank = response;
                    this.form.patchValue(response);
                    this.mostrarModalCarregando(false);
                }).catch(error => {
                    this.errorHandler.handle(error);
                    this.titulo.setTitle(this.traduzir['itinerario']['acoes']['adicionar']);
                    this.mostrarModalCarregando(false);
                });
            } else {
                this.titulo.setTitle(this.traduzir['itinerario']['acoes']['adicionar']);
                this.mostrarModalCarregando(false);
            }
        });
    }

    configurarForm() {
        this.form = this.formBuild.group({
            key: [null],
            codigo: [
                null, [
                    Validators.maxLength(15)
                ]
            ],
            nome: [
                null, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(150)
                ]
            ],
            descricao: [null, Validators.maxLength(512)],
            validoAte: [null, Validators.required],
            inativo: [false]
        });
    }

    save() {
        if (this.form.invalid) {
            this.toasty.add({severity: 'warn', detail: this.traduzir['validacao']['form_invalido']});
            return;
        }

        this.mostrarModalCarregando(true);
        if (this.form.get('key').value) {
            this.bankService.update(this.form.value).then(response => {
                this.toasty.add({severity: 'success', detail: this.traduzir['itinerario']['acoes']['atualizar']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['itinerario']['link-pagina']);
            }).catch(error => {
                this.errorHandler.handle(error);
                this.mostrarModalCarregando(false);
            });
        } else {
            this.bankService.save(this.form.value).then(response => {

                this.toasty.add({severity: 'success', detail: this.traduzir['itinerario']['acoes']['adicionado']});
                this.mostrarModalCarregando(false);
                this.router.navigateByUrl(this.traduzir['itinerario']['link-pagina']);
            }).catch(erro => {
                this.errorHandler.handle(erro);
                this.mostrarModalCarregando(false);
            });
        }
    }

    cancel() {
        this.router.navigateByUrl(this.traduzir['itinerario']['link-pagina']);
    }
}
