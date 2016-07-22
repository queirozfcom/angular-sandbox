import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: 'app/hero-search.component.html',
  styleUrls: ['app/sample.css'],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>;
    searchSubject = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) {}


    search(term: string){ this.searchSubject.next(term); }

    ngOnInit() {
        this.heroes = this.searchSubject
            .asObservable()
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.heroSearchService.search(term)
                : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([])
            });
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}