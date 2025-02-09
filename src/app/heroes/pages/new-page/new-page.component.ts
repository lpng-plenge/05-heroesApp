import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';

//Implementaciones
import { Publisher } from '../../interfaces/hero.interface';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
  standalone: false,
})
export class NewPageComponent implements OnInit {
  //Formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });



  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    //SnackBard Mensajes de Angular Material
    private snackBard: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        if(!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      }
    )

  }

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  onSumit(): void {
    if(this.heroForm.invalid)return;
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe( hero => {
          //Mostrar Snackback Mensajes de Material
          this.showSnackBar(`${hero.superhero} Hero Updated`);
      });

      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe(
      hero => {
        // Mostrar Snackbar y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} Hero Created`);
      }
    );
  }

  onDeleteHero():void{
    if(!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap(()=> this.heroesService.deleteHeroById(this.currentHero.id)),
      filter((wasDeleted: boolean) => wasDeleted),
    )
    .subscribe(() => {
      this.router.navigate(['/heroes/list']);
    });

    /* dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.heroesService.deleteHeroById(this.currentHero.id).subscribe(
        wasDeleted => {
          if(wasDeleted){
            this.router.navigate(['/heroes/list']);
          }
        }
      )
    }); */

  }

  showSnackBar(message: string):void{
    this.snackBard.open(message, 'done', {
      duration: 2500,
    })
  }


}
