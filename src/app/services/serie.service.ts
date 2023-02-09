import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Genre, Serie} from "../common/serie";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  //baseURL = 'https://apiseries.onrender.com/api/series';
  baseURL = 'http://localhost:3000/api/series';
  constructor(private http: HttpClient) {
  }
  getSerieList(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseURL);
  }
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseURL);
  }

  removeSerie(id: string): Observable<any> {
    return this.http.delete(this.baseURL+'/'+id);
  }

  updateSerie(id: any, serie: Serie): Observable<any> {
    return this.http.put<Serie>(this.baseURL+'/'+id, serie)
  }

  newSerie(serie : Serie): Observable<any> {
    return this.http.post<Serie>(this.baseURL,serie)
  }
}
