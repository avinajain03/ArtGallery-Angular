import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from 'src/api-call.service';
import { Artwork } from 'src/artwork';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  artworkData: Artwork[] = [];
  favorites: any[] = [];

  constructor(private apiService: ApiCallService) { }

  ngOnInit() {
    this.getArtworks();
    this.getFavorites();
  }

  // Get all artworks
  getArtworks() {
    this.apiService.getArtworks(1, 100).subscribe((response: any) => {
      this.artworkData = response.data as Artwork[];
    });
  }

  // Get user's favorite artworks
  getFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log(this.favorites)
  }

  // Get image URL for a given artwork
  getImageUrl(imageId: string): string {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  }

  // Filter artworks based on favorites
  filterByFavorites() {
    const favoriteArtworks = this.artworkData.filter((artwork: any) =>
      this.favorites.includes(artwork.id.toString())
    );
    return favoriteArtworks || [];
  }

  addToFavorites(artwork: Artwork) {
    const index = this.favorites.findIndex((fav) => fav.id === artwork.id);
    if (index === -1) { // Artwork is not already in favorites
      this.favorites.push(artwork); // Add artwork to favorites
    } else { // Artwork is already in favorites
      this.favorites.splice(index, 1); // Remove artwork from favorites
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Update local storage
  }



}
