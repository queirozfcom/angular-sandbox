import { Component } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';
import { ROUTER_DIRECTIVES } from '@angular/router';
import './rxjs-extensions';

@Component({
    selector: 'my-app',
    directives: [HeroesComponent, ROUTER_DIRECTIVES],
    styleUrls: ['app/app.component.css'],
    template: `
    <h1>{{title}}</h1>
    <nav>  
        <a [routerLink]="['/dashboard']">Dashboard</a>
        <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    providers: [HeroService]
})

export class AppComponent{
    title = 'Tour of Heroes';
}