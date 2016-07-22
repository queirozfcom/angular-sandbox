import { Component } from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HeroDetailComponent} from './hero-detail.component';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit{
    title = 'All Heroes';
    selectedHero: Hero;
    heroes: Hero[];
    addingHero = false;
    error: any;


    constructor(private heroService: HeroService, private router: Router) {}

    addHero(){
        this.addingHero = true;
        this.selectedHero = null;
    }
    close(savedHero: Hero){
        this.addingHero = false;
        if(savedHero){ this.getHeroes(); }
    }
    deleteHero(hero: Hero, event: any) {
      event.stopPropagation();
      this.heroService
          .delete(hero)
          .then(res => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          })
          .catch(error => this.error = error);
    }
    getHeroes() {
        this.heroService.getHeroes().then( heroes => this.heroes = heroes );
    }  
    onSelect(hero:Hero) {
        let route = ['/detail',hero.id];
        this.router.navigate(route);
    }
    ngOnInit(){
        this.getHeroes();
    }
}