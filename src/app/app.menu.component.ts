import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {AppSideBarTabContentComponent} from './app.sidebartabcontent.component';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './security/auth.service';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    public model: any[];
    traduzir:any;

    constructor(public app: AppComponent,
                public translate: TranslateService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.translate.get('app').subscribe(m => {
            this.traduzir = m;
            this.model = [
                {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
                {
                    label: this.traduzir['menu']['cadastros'], icon: 'fa fa-fw fa-book',
                    items: [
                        {label:  m['banco']['titulo'], icon: 'fa fa-fw fa-building', routerLink: [this.traduzir['banco']['link-pagina']], visible: this.auth.hasPermission('ROLE_LISTAR_BANCO')},
                        // {label:  m['menu']['product-unit'], icon: 'fa fa-fw fa-pencil-square-o', routerLink: ['/product-units'], visible: this.auth.hasPermission('ROLE_LIST_PRODUCT-UNIT')},
                        // {label:  m['menu']['types-of-relationships'], icon: 'fa fa-fw fa-handshake-o', routerLink: ['/types-of-relationships'], visible: this.auth.hasPermission('ROLE_LIST_TYPE-RELATIONSHIP')},
                        // {label:  m['menu']['level-of-education'], icon: 'fa fa-fw fa-lightbulb-o', routerLink: ['/levels-of-education'], visible: this.auth.hasPermission('ROLE_LIST_LEVEL-OF-EDUCATION')},
                        // {label:  m['menu']['estado-civil'], icon: 'fa fa-fw fa-heart-o', routerLink: ['/estado-civil'], visible: this.auth.hasPermission('ROLE_LISTAR_ESTADO_CIVIL')},
                        {label:  m['veiculo']['titulo'], icon: 'fa fa-fw fa-car', routerLink: [this.traduzir['veiculo']['link-pagina']], visible: this.auth.hasPermission('ROLE_LISTAR_VEICULO')},
                        // {label:  m['menu']['persons'], icon: 'fa fa-fw fa-address-book-o', routerLink: ['/persons'], visible: this.auth.hasPermission('ROLE_LIST_PERSON')},
                        {label:  m['itinerario']['titulo'], icon: 'fa fa-fw fa-truck', routerLink: [this.traduzir['itinerario']['link-pagina']], visible: this.auth.hasPermission('ROLE_LISTAR_ITINERARIO')},
                        // {label:  m['classe-despesa']['menu'], icon: 'fa fa-fw fa-list', routerLink: [m['classe-despesa']['link-pagina']], visible: this.auth.hasPermission('ROLE_LISTAR_CLASSE-DESPESA')},
                        // {label:  m['menu']['centro-de-custo'], icon: 'fa fa-fw fa-list', routerLink: ['/centroDeCusto'], visible: this.auth.hasPermission('ROLE_LISTAR_CENTRO-DE-CUSTO')},
                        // {label:  m['menu']['tipo-pagamento'], icon: 'fa fa-fw fa-money', routerLink: ['/tipoPagamento'], visible: this.auth.hasPermission('ROLE_LISTAR_TIPO-PAGAMENTO')}
                    ]
                },
                {label:  m['controleKm']['titulo'], icon: 'fa fa-fw fa-map-signs', routerLink: [m['controleKm']['link-pagina']], visible: this.auth.hasPermission('ROLE_LISTAR_CONTROLE-KM')},
                {label:  m['permissoes-de-acesso']['titulo'], icon: 'fa fa-fw fa-map-signs', routerLink: [m['permissoes-de-acesso']['link-pagina']], visible: this.auth.hasPermission('ROLE_ALTERAR_PERMISSOES_ACESSO')},
                {
                    label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: '5',
                    items: [
                        {label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('blue'); }},
                        {label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('pink'); }},
                        {label: 'Steel', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('steel'); }},
                        {label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('orange'); }},
                        {label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('green'); }},
                        {label: 'Turquoise', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('turquoise'); }},
                        {label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('purple'); }},
                        {label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeTheme('cyan'); }},
                    ]
                },
                {
                    label: 'Layout Colors', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                        {label: 'Dark', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('dark'); }},
                        {label: 'Blue', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('blue'); }},
                        {label: 'Pink', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('pink'); }},
                        {label: 'Steel', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('steel'); }},
                        {label: 'Orange', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('orange'); }},
                        {label: 'Green', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('green'); }},
                        {label: 'Turquoise', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('turquoise'); }},
                        {label: 'Purple', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('purple'); }},
                        {label: 'Cyan', icon: 'fa fa-fw fa-paint-brush', command: (event) => {this.changeLayout('cyan'); }},
                    ]
                },
                {
                    label: 'Menu Modes', icon: 'fa fa-fw fa-bars',
                    items: [
                        {label: 'Static Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToStaticMenu()},
                        {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToOverlayMenu()},
                        {label: 'Light Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.darkMenu = false},
                        {label: 'Dark Menu', icon: 'fa fa-fw fa-bars', command: () => this.app.darkMenu = true}
                    ]
                },
                {
                    label: 'Components', icon: 'fa fa-fw fa-sitemap', badge: '2', badgeStyleClass: 'orange-badge',
                    items: [
                        {label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample']},
                        {label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms']},
                        {label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data']},
                        {label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels']},
                        {label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays']},
                        {label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus']},
                        {label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages']},
                        {label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts']},
                        {label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file']},
                        {label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc']}
                    ]
                },
                {label: 'Landing Page', icon: 'fa fa-fw fa-certificate', url: 'assets/pages/landing.html', target: '_blank'},
                {
                    label: 'Template Pages', icon: 'fa fa-fw fa-life-saver',
                    items: [
                        {label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty']},
                        {label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank'},
                        {label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank'},
                        {label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank'},
                        {label: 'Denied Page', icon: 'fa fa-fw fa-exclamation-triangle', url: 'assets/pages/access.html', target: '_blank'}
                    ]
                },
                {
                    label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                    items: [
                                        {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                    items: [
                                        {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                    items: [
                                        {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                    items: [
                                        {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                                        {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']}
            ];
        });
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
    }

    changeLayout(layout) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
    }
}

@Component({
    /* tslint:disable:component-selector */selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible!==false">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                   (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                   [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                   (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ?
                'visible' : 'hidden'" [visible]="isActive(i)" [parentActive]="isActive(i)"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    activeIndex: number;

    hover: boolean;

    _parentActive: boolean;

    constructor(public app: AppComponent, public router: Router, public location: Location,
                public appSideBarTab: AppSideBarTabContentComponent) {
    }

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.appSideBarTab.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items && (this.app.overlay || !this.app.isDesktop())) {
            this.app.sidebarActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
