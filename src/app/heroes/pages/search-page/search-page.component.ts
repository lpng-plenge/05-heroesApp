import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'heroes-search-page',
    templateUrl: './search-page.component.html',
    styles: ``,
    standalone: false
})
export class SearchPageComponent {

  //al utilizar formularios hay que agregar en el archivo de modulos ReactiveFormModule
  public searchInput = new FormControl('');
  public heroes: Hero[]=[];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService ){

  }

  searchHero(){
    const value = this.searchInput.value || '' ;

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void{
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }






}
