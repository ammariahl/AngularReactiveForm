import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css',
})
export class SearchMovieComponent implements OnInit {
  searchMovieForm!: FormGroup;
  type!: ['film', 'serie', 'episode'];
  fiche!: ['complete', 'courte'];
  soumission: boolean = false;
  anneeEnCours = new Date().getFullYear();

  constructor(protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchMovieForm = this.fb.group({
      partieObligatoire: this.fb.group({
        identifiant: [''],
        titre: [''],
      }),
      type: 'serie',
      anneeSortie: [
        [Validators.required, rangeDateValidator(1900, this.anneeEnCours)],
      ],
      fiche: '',
    });

    this.searchMovieForm
      .get('partieObligatoire')
      ?.setValidators(isRequiredValidator('identifiant', 'titre'));

    this.searchMovieForm.patchValue({
      fiche: 'courte',
    });
  }

  sendSearchMovieForm(): void {
    const value: Movie = this.searchMovieForm.value;
    // Form submitted
    console.log('Formulaire soumis avec succès : ');
    console.log(value);
  }

  onShow(): void {
    this.soumission = true;
  }
}

export function isRequiredValidator(
  control1: string,
  control2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueTitre = control.get(control1);
    const valueIdentifiant = control.get(control2);
    if (!valueTitre?.value && !valueIdentifiant?.value) {
      return { isRequired: true };
    } else {
      return null;
    }
  };
}

export function rangeDateValidator(
  anneeMin: number,
  anneeMax: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const annee = parseInt(control.value);
    if (anneeMin > annee || anneeMax < annee) {
      return { min: { min: anneeMin, max: anneeMax } };
    } else {
      return null;
    }
  };
}
