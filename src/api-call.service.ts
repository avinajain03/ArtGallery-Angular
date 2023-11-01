import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artwork } from './artwork';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {


 
  constructor(private http: HttpClient) { }

  getArtworks(pageIndex: number, pageSize: number): Observable<any[]> {
    const url = `https://api.artic.edu/api/v1/artworks?page=${pageIndex}&limit=${pageSize}`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.data)
      );
  }

  getArtists(pageIndex: number, pageSize: number): Observable<any[]> {
    const url = `https://api.artic.edu/api/v1/artists?page=${pageIndex}&limit=${pageSize}`;
    return this.http.get(url)
      .pipe(
        map((response: any) => response.data)
      );
  }

  getartData(id: string): Observable<any> {
    return this.http.get<any>('https://api.artic.edu/api/v1/artworks/' + id);
  }

  favorites: Artwork[] = [];
  addToFavorites(artwork: Artwork): void { 
    this.favorites.push(artwork);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  getFavorites(): Artwork[] { 
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString !== null) {
      this.favorites = JSON.parse(favoritesString);
    }
    return this.favorites;
  }

  

  


}