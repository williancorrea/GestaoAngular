import {FormControl} from '@angular/forms';
import {AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
    selector: 'app-message',
    template: `
        <div *ngIf="temErro()" class="ui-message ui-messages-error">
            <p *ngIf="control.hasError('required')">{{'app.validacao.requerido' | translate}}</p>
            <p *ngIf="control.hasError('minlength')">{{'app.validacao.minlength' | translate}}
                {{control.errors['minlength']['requiredLength']}} {{'app.validacao.character' | translate}}</p>
            <p *ngIf="control.hasError('maxlength')">{{'app.validacao.maxlength' | translate}}
                {{control.errors['maxlength']['requiredLength']}} {{'app.validacao.character' | translate}}</p>
            <p *ngIf="control.hasError('pattern')">{{'app.validacao.pattern' | translate}}</p>
        </div>
    `,
    styles: [`
        .ui-messages-error {
            margin: 0;
            font-weight: 400;
            font-size: 80%;
            color: #dc3545;
        }

        .ui-messages-error p {
            margin: 0px;
        }

        .ui-message {
            padding: 0px;
            border: none;
        }
    `]
})

export class MessageComponent implements AfterViewChecked, AfterContentChecked, AfterViewInit {

    @Input() control: FormControl;
    @Input() form: any;
    @Input() label: string;

    constructor(private cdr: ChangeDetectorRef) {
    }

    temErro(): boolean {
        // return this.control.errors !== null && this.control.enabled && (this.form.submitted || (this.control.updateOn !== 'blur') || this.control.dirty || this.control.touched);


        if ((this.control.invalid && this.control.enabled && (this.control.dirty || this.control.touched)) || this.form.submitted) {
            this.control.markAsDirty();
            this.control.markAsTouched();
        }

        // return this.control.invalid && this.control.enabled && (this.control.dirty || this.form.submitted);
        return this.control.invalid && this.control.enabled && (this.control.dirty || this.control.touched || this.form.submitted);
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    ngAfterViewChecked(): void {
        // this.cdr.detectChanges();
    }

    ngAfterContentChecked(): void {
        // this.cdr.detectChanges();
    }
}
