import {Component, OnInit} from '@angular/core';
import {Genre, Score, Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  formSerie: FormGroup = this.formBuilder.group({
    id: [''],
    title: [''],
    images: [''],
    genres: [],
    num_episodes: [0],
    year_of_emision: [2022],
    synopsis: ['']
  });
  mynewGenre: FormGroup = this.formBuilder.group({
    name: [''],
    image: ['']
  });
  genres: Genre[] = [];
  editar = false;
  series: Serie[] = [];

  constructor(private serieService: SerieService, private formBuilder: FormBuilder) {
  }

  // Getters Form
  get title(): any {
    return this.formSerie.get('title')?.value;
  }

  get yearOfEmission(): any {
    return this.formSerie.get('year_of_emision');
  }

  get numEpisodes(): any {
    return this.formSerie.get('num_episodes');
  }

  get synopsis(): any {
    return this.formSerie.get('synopsis');
  }

  get genresF(): any {
    return this.formSerie.get('genres')?.value;
  }

  get imagesSerie(): any {
    return this.formSerie.get('images')?.value;

  }

  // Genres NewGenre
  get nameGenre(): any {
    return this.mynewGenre.get('name')?.value;
  }

  get imageGenre(): any {
    return this.mynewGenre.get('image')?.value;
  }

  ngOnInit(): void {
    this.listSeries();
  }

  listSeries(): void {
    this.serieService.getSerieList().subscribe(
      (data: any) => {
        this.series = data;
      }
    );
    this.serieService.getGenres().subscribe(
      data => {
        this.genres = data;
      }
    );
  }

  onSubmit() {
    // si estamos actualizando, llamamos a actualizar
    if (this.editar) {
      const id = this.formSerie.getRawValue()._id;
      this.serieService.updateSerie(id,
        this.formSerie.getRawValue()).subscribe(
        data => {
          this.listSeries();
        }
      );
    }
    // si no, es que vamos a añadir una película nueva
    else {
      this.serieService.newSerie(this.formSerie.getRawValue()).subscribe(
        data => {
          console.log(data);
          this.listSeries();
        }
      )
    }
  }

  removeSerie(serie: Serie) {
    if (confirm('Desea borrar ' + serie.title + '?')) {
      this.serieService.removeSerie(serie.id).subscribe(
        data => {
          console.log(data);
          this.listSeries();
        }
      );
    }
  }

  loadSerie(serie: Serie) {
    this.formSerie.setValue(serie);
    this.editar = true;
  }

  newSerie() {
    this.formSerie.reset();
    this.editar = false;
  }

  addNewGenre(nameGenre: string, imageGenre: string) {
    let newGenre = new class implements Genre {
      image = imageGenre;
      name = nameGenre;
    }
    let newGenres;
    if (!this.editar) this.genres.push(newGenre)
    else {
      // Guardo el array de géneros
      newGenres = this.formSerie.getRawValue().genres;
      // Añado el nuevo género al array
      newGenres.push(newGenre);
      this.genres.push(newGenre);
      // Actualizo el array de géneros en el formulario
      this.formSerie.setControl(
        'genres',
        new FormControl(newGenres)
      );
    }
    this.mynewGenre.reset();
  }

  getAvgScoreSerie(serie:Serie):number {
    let avgScore = 0
    let scores: Score[] = serie.scores
    console.log('Puntuaciones: ', serie)

    let totalScore = 0

    if (scores.length !== 0) {
      for (let i = 0; i < scores.length; i++) {
        console.log(scores[i].score)
        totalScore += scores[i].score
      }

      avgScore = totalScore / scores.length
    }

    return Math.round((avgScore + Number.EPSILON) * 100) / 100
  }
}
