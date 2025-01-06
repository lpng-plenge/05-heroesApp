import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
    selector: 'heroes-hero-page',
    templateUrl: './hero-page.component.html',
    styles: ``,
    standalone: false
})
export class HeroPageComponent implements OnInit{

  //Creando propiedad del componente hero de la base de datos
  public hero?:Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRout: ActivatedRoute,
    private router: Router

  ){}


  ngOnInit(): void {
    this.activatedRout.params
    .pipe(
      delay(300),
      switchMap(({id}) => this.heroesService.getHeroById(id)),
    )
    .subscribe(hero =>{
      //si no existe retorna a la salida de la lista de heroes
      if( !hero) return this.router.navigateByUrl('heroes/list');

      this.hero = hero;
      return;
    }
    )
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }

}
