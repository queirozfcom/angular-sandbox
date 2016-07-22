import {Component } from '@angular/core';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';
import {Hero} from './hero';
import { Router } from '@angular/router';
import { HeroSearchComponent } from './hero-search.component';

@Component({
    selector: 'my-dashboard',
    directives: [HeroSearchComponent],
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    heroes: Hero[];
    
    constructor(private heroService: HeroService, private router: Router) {}

    ngOnInit(){
        this.heroService.getHeroes().then( heroes => this.heroes = heroes.slice(1,5) );
    }
    goToDetail(hero: Hero){
        let route = ['/detail',hero.id];
        this.router.navigate(route);
    }
}